import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('health')
export class HealthController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  health() {
    return this.coreService.health();
  }
}
