import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookingsService } from '../application/bookings.service';
import { BookingsRepository } from '../domain/repositories/booking.repository';
import { EventLookupPort } from '../application/ports/event-lookup.port';

describe('BookingsService', () => {
  let service: BookingsService;

  const mockBookingRepository = {
    findAll: vi.fn(),
    findBookingById: vi.fn(),
    createBooking: vi.fn(),
  };

  const mockEventLookup = {
    findBookableEvent: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingsRepository,
          useValue: mockBookingRepository,
        },
        {
          provide: EventLookupPort,
          useValue: mockEventLookup,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
