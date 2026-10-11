import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventsService } from '../application/events.service';
import { EventsRepository } from '../domain/repositories/events.repository';

describe('EventsService', () => {
  let service: EventsService;

  const mockEventsRepository = {
    findAll: vi.fn(),
    findEventById: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventsRepository,
          useValue: mockEventsRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all events', async () => {
    mockEventsRepository.findAll.mockResolvedValue([]);

    const result = await service.getAllEvents();

    expect(result).toEqual([]);
    expect(mockEventsRepository.findAll).toHaveBeenCalledOnce();
  });
});
