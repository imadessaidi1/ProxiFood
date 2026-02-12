import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponse } from './cart.types';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(cartId: string | undefined, dto: AddToCartDto): Promise<CartResponse> {
    const quantity = dto.quantity ?? 1;

    const dish = await this.prisma.dish.findUnique({
      where: { id: dto.dishId },
      select: { id: true, restaurantId: true },
    });

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    let cart = cartId
      ? await this.prisma.cart.findUnique({
          where: { id: cartId },
          select: { id: true, restaurantId: true },
        })
      : null;

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { restaurantId: dish.restaurantId },
        select: { id: true, restaurantId: true },
      });
    }

    if (cart.restaurantId !== dish.restaurantId) {
      throw new ConflictException('Cart already contains items from another restaurant');
    }

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_dishId: {
          cartId: cart.id,
          dishId: dish.id,
        },
      },
      select: { id: true, quantity: true },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          dishId: dish.id,
          quantity,
        },
      });
    }

    return this.getCartById(cart.id);
  }

  async getCartById(cartId: string): Promise<CartResponse> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      select: {
        id: true,
        restaurantId: true,
        items: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            dishId: true,
            quantity: true,
            dish: {
              select: {
                id: true,
                restaurantId: true,
                name: true,
                description: true,
                priceCents: true,
                isAvailable: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: cart.restaurantId },
      select: { id: true, name: true },
    });

    const totalCents = cart.items.reduce((total, item) => total + item.quantity * item.dish.priceCents, 0);

    return {
      id: cart.id,
      restaurantId: cart.restaurantId,
      restaurant,
      items: cart.items,
      totalCents,
    };
  }

  async updateCartItem(cartId: string, cartItemId: string, dto: UpdateCartItemDto): Promise<CartResponse> {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      select: { id: true, cartId: true },
    });

    if (!item || item.cartId !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: dto.quantity },
    });

    return this.getCartById(cartId);
  }

  async removeCartItem(cartId: string, cartItemId: string): Promise<CartResponse> {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      select: { id: true, cartId: true },
    });

    if (!item || item.cartId !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });

    return this.getCartById(cartId);
  }
}
