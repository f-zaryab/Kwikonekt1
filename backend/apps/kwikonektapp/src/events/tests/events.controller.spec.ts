import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventsController } from '../api/events.controller';
import { EventsService } from '../application/events.service';

describe('EventsController', () => {
  let controller: EventsController;

  const mockEventsService = {
    getAllEvents: vi.fn(),
    getEventById: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all events', async () => {
    mockEventsService.getAllEvents.mockResolvedValue([]);

    const result = await controller.getAllEventsController();

    expect(result).toEqual({
      success: true,
      message: 'Events fetched successfully',
      data: [],
    });

    expect(mockEventsService.getAllEvents).toHaveBeenCalledOnce();
  });
});
