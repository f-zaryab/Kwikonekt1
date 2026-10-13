import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventsService } from '../application/events.service';
import { EventsRepository } from '../domain/repositories/events.repository';
import { NotFoundException } from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;

  const mockEventsRepository = {
    findAll: vi.fn(),
    findEventById: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  };

  const userId = 'user-1';
  const eventId = 'event-1';

  const mockEvent = {
    id: eventId,
    userId,
    slug: 'consultation',
    title: 'Consultation',
    description: null,
    durationMinutes: 30,
    isActive: true,
    createdAt: new Date('2026-10-01'),
    updatedAt: new Date('2026-10-01'),
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

  describe('Get All Events', () => {
    it('it should return all events', async () => {
      mockEventsRepository.findAll.mockResolvedValue([mockEvent]);

      const result = await service.getAllEvents();

      // Result: The service returns the expected events - Verifies the expected output
      expect(result).toEqual([mockEvent]);

      // Interaction: The repository's findAll() method was called exactly once - Verifies the repository was called exactly once
      expect(mockEventsRepository.findAll).toHaveBeenCalledOnce();
    });

    it('it should return an empty list array', async () => {
      mockEventsRepository.findAll.mockResolvedValue([]);

      const result = await service.getAllEvents();

      expect(result).toEqual([]);

      expect(mockEventsRepository.findAll).toHaveBeenCalledOnce();
    });
  });

  describe('Get Events by ID', () => {
    it('it should return an event', async () => {
      mockEventsRepository.findEventById.mockResolvedValue(mockEvent);

      const result = await service.getEventById(eventId);

      expect(result).toEqual(mockEvent);

      expect(
        mockEventsRepository.findEventById,
      ).toHaveBeenCalledExactlyOnceWith(eventId);
    });

    it('should throw NotFoundException', async () => {
      mockEventsRepository.findEventById.mockResolvedValue(null);

      const result = service.getEventById(eventId);

      await expect(result).rejects.toThrow(NotFoundException);

      expect(
        mockEventsRepository.findEventById,
      ).toHaveBeenCalledExactlyOnceWith(eventId);
    });
  });

  describe('Create Event', () => {
    it('it should create event with provided values', async () => {
      const input = {
        slug: 'consultation',
        title: 'Consultation',
        description: '30-minute meeting',
        durationMinutes: 60,
        isActive: false,
        userId,
      };

      const createdEvent = {
        ...mockEvent,
        ...input,
      };

      mockEventsRepository.createEvent.mockResolvedValue(createdEvent);

      const result = await service.createEvent(input);

      expect(result).toEqual(createdEvent);

      expect(mockEventsRepository.createEvent).toHaveBeenCalledExactlyOnceWith(
        input,
      );
    });

    it('it should apply defaults when optional fields are ommited', async () => {
      const input = {
        slug: 'consultation',
        title: 'Consultation',
        userId,
      };

      mockEventsRepository.createEvent.mockResolvedValue(mockEvent);

      await service.createEvent(input);

      expect(mockEventsRepository.createEvent).toHaveBeenCalledExactlyOnceWith({
        ...input,
        description: null,
        durationMinutes: 30,
        isActive: true,
      });
    });
  });

  describe('Update Event', () => {
    it('it should update event and return updated event', async () => {
      const input = {
        title: 'Updated Consultation',
      };

      const updatedEvent = {
        ...mockEvent,
        ...input,
      };

      mockEventsRepository.updateEvent.mockResolvedValue(updatedEvent);

      const result = await service.updateEvent(eventId, userId, input);

      expect(result).toBe(updatedEvent);

      expect(mockEventsRepository.updateEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        userId,
        input,
      );
    });

    it('it should throw NotFoundException when update returns null', async () => {
      mockEventsRepository.updateEvent.mockResolvedValue(null);

      const result = service.updateEvent(eventId, userId, { title: 'Updated' });

      await expect(result).rejects.toThrow(NotFoundException);
    });

    it('should pass the authenticated user ID to repository', async () => {
      const input = { isActive: false };

      mockEventsRepository.updateEvent.mockResolvedValue(mockEvent);

      await service.updateEvent(eventId, userId, input);

      expect(mockEventsRepository.updateEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        userId,
        input,
      );
    });
  });

  describe('Delete Event', () => {
    it('it should delete event when user is the owner', async () => {
      // This simulates the database finding an existing event.
      mockEventsRepository.findEventById.mockResolvedValue(mockEvent);

      // This simulates the database successfully deleting the event and returning the deleted record.
      mockEventsRepository.deleteEvent.mockResolvedValue(mockEvent);

      const result = service.deleteEvent(eventId, userId);

      // expect the promise to resolve successfully and expect the resolved value to be undefined as data is deleted
      await expect(result).resolves.toBeUndefined();

      // Confirms the service looked up the event before deleting it.
      expect(
        mockEventsRepository.findEventById,
      ).toHaveBeenCalledExactlyOnceWith(eventId);

      // Confirms that deletion was requested with the correct event and user IDs, exactly once.
      expect(mockEventsRepository.deleteEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        userId,
      );
    });

    it('it should throw NotFoundException when event does not exist', async () => {
      mockEventsRepository.deleteEvent.mockResolvedValue(null);

      const result = service.deleteEvent(eventId, userId);

      await expect(result).rejects.toThrow(NotFoundException);

      expect(mockEventsRepository.deleteEvent).not.toHaveBeenCalled();
    });

    it('it should throw NotFoundException when user is not the owner', async () => {
      mockEventsRepository.findEventById.mockResolvedValue({
        ...mockEvent,
        userId: 'another-user',
      });

      const result = service.deleteEvent(eventId, userId);

      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
