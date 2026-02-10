import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
  health() {
    return {
      status: 'ok',
      product: 'ProxiFood',
      orderUnder60sGoal: true,
      features: ['dispatch', 'maps', 'stripe', 'i18n', 'social-auth'],
    };
  }
}
