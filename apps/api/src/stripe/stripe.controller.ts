import { Body, Controller, Post } from '@nestjs/common';

@Controller('stripe')
export class StripeController {
  @Post('payment-intent')
  paymentIntent(@Body() body: { amount: number; currency: string }) {
    return {
      mode: 'manual_capture',
      paymentIntentId: `pi_${Date.now()}`,
      clientSecret: 'pi_secret_demo',
      ...body,
    };
  }

  @Post('capture')
  capture(@Body() body: { paymentIntentId: string }) {
    return {
      status: 'captured',
      capturedAtDelivery: true,
      ...body,
    };
  }
}
