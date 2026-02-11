import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsQueryDto } from './dto/restaurants-query.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  listRestaurants(@Query() query: RestaurantsQueryDto) {
    return this.restaurantsService.listRestaurants(query);
  }

  @Get(':id')
  getRestaurantById(@Param('id') id: string) {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Get(':id/dishes')
  getRestaurantDishes(@Param('id') id: string) {
    return this.restaurantsService.getRestaurantDishes(id);
  }
}
