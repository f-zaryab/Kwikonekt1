import { Injectable } from '@nestjs/common';

@Injectable()
export class KwikonektappService {
  getHello(): string {
    return 'Hello World!';
  }
}
