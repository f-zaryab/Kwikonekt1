import { Controller, Get } from '@nestjs/common';
import { KwikonektappService } from './kwikonektapp.service';

@Controller()
export class KwikonektappController {
  constructor(private readonly kwikonektappService: KwikonektappService) {}

  @Get()
  getHello(): string {
    return this.kwikonektappService.getHello();
  }
}
