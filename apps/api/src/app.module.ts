import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { MapsController } from './maps/maps.controller';
import { OrdersController } from './orders/orders.controller';
import { DispatchGateway } from './dispatch/dispatch.gateway';
import { StripeController } from './stripe/stripe.controller';
import { CoreService } from './common/core.service';
import { HealthController } from './common/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, RestaurantsModule, CartModule],
  controllers: [HealthController, AuthController, MapsController, OrdersController, StripeController],
  providers: [CoreService, DispatchGateway],
})
export class AppModule {}