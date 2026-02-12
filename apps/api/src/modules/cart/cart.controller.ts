import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartService } from './cart.service';

const CART_COOKIE_NAME = 'proxifood_cart_id';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() body: AddToCartDto) {
    const cartId = req.cookies?.[CART_COOKIE_NAME] as string | undefined;
    const cart = await this.cartService.addToCart(cartId, body);

    res.cookie(CART_COOKIE_NAME, cart.id, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return cart;
  }

  @Get()
  async getCart(@Req() req: Request) {
    const cartId = req.cookies?.[CART_COOKIE_NAME] as string | undefined;

    if (!cartId) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartService.getCartById(cartId);
  }

  @Patch('item/:id')
  async updateCartItem(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateCartItemDto) {
    const cartId = req.cookies?.[CART_COOKIE_NAME] as string | undefined;

    if (!cartId) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartService.updateCartItem(cartId, id, body);
  }

  @Delete('item/:id')
  async removeCartItem(@Req() req: Request, @Param('id') id: string) {
    const cartId = req.cookies?.[CART_COOKIE_NAME] as string | undefined;

    if (!cartId) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartService.removeCartItem(cartId, id);
  }
}
