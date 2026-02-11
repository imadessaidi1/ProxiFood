import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RestaurantsQueryDto } from './dto/restaurants-query.dto';
import { DishDto, RestaurantCard, RestaurantDetails, RestaurantsListResponse } from './restaurants.types';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async listRestaurants(query: RestaurantsQueryDto): Promise<RestaurantsListResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where: Prisma.RestaurantWhereInput = {
      isActive: true,
      ...(query.q
        ? {
            OR: [
              { name: { contains: query.q, mode: 'insensitive' } },
              { description: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(query.city ? { city: { equals: query.city, mode: 'insensitive' } } : {}),
      ...(query.cuisineType ? { cuisineType: { equals: query.cuisineType, mode: 'insensitive' } } : {}),
    };

    const [total, restaurants] = await this.prisma.$transaction([
      this.prisma.restaurant.count({ where }),
      this.prisma.restaurant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          name: true,
          cuisineType: true,
          rating: true,
          priceLevel: true,
          city: true,
          address: true,
        },
      }),
    ]);

    return {
      data: restaurants satisfies RestaurantCard[],
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async getRestaurantById(id: string): Promise<RestaurantDetails> {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id, isActive: true },
      select: {
        id: true,
        name: true,
        cuisineType: true,
        rating: true,
        priceLevel: true,
        city: true,
        address: true,
        description: true,
        lat: true,
        lng: true,
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async getRestaurantDishes(id: string): Promise<DishDto[]> {
    const restaurant = await this.prisma.restaurant.findFirst({ where: { id, isActive: true }, select: { id: true } });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.prisma.dish.findMany({
      where: { restaurantId: id },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        priceCents: true,
        isAvailable: true,
        imageUrl: true,
      },
    });
  }
}
