import { Controller, Get } from '@nestjs/common';
import { CoreService } from './common/core.service';

@Controller()
export class AppController {
  constructor(private readonly core: CoreService) {}

  @Get('health')
  health() {
    return this.core.health();
  }
}
