import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('restaurants')
  restaurants() {
    return [
      { id: 'r1', name: 'Green Bowl', eta: 22, fee: 2.9, rating: 4.8 },
      { id: 'r2', name: 'Tokyo Bento', eta: 28, fee: 1.9, rating: 4.6 },
    ];
  }

  @Post('checkout')
  checkout(@Body() body: any) {
    return {
      orderId: `ord_${Date.now()}`,
      status: 'pending_payment',
      dispatchStatus: 'queueing',
      payload: body,
    };
  }
}
