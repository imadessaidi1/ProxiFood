import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('maps')
export class MapsController {
  @Get('autocomplete')
  autocomplete(@Query('input') input: string) {
    return {
      provider: 'google-places',
      input,
      predictions: [
        { description: '10 Rue de Rivoli, Paris', placeId: 'place_1' },
        { description: '5 Avenue des Champs-Élysées, Paris', placeId: 'place_2' },
      ],
    };
  }

  @Post('route')
  route(@Body() body: { origin: string; destination: string }) {
    return {
      distanceKm: 4.8,
      durationMin: 16,
      polyline: 'encoded_polyline_here',
      ...body,
    };
  }
}
