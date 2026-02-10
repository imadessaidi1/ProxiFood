import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class DispatchGateway {
  @SubscribeMessage('courier:location')
  handleLocation(@MessageBody() payload: { courierId: string; lat: number; lng: number }) {
    return {
      event: 'courier:location:ack',
      payload,
      updatedEverySeconds: '5-10',
    };
  }

  @SubscribeMessage('dispatch:offer')
  offer(@MessageBody() payload: { orderId: string; courierId: string }) {
    return {
      event: 'dispatch:offer',
      expiresInSeconds: 12,
      lock: 'SETNX',
      ...payload,
    };
  }
}
