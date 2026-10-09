import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { KwikonektappController } from './kwikonektapp.controller';
import { KwikonektappService } from './kwikonektapp.service';

describe('KwikonektappController', () => {
  let kwikonektappController: KwikonektappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KwikonektappController],
      providers: [KwikonektappService],
    }).compile();

    kwikonektappController = app.get<KwikonektappController>(
      KwikonektappController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(kwikonektappController.getHello()).toBe('Hello World!');
    });
  });
});
