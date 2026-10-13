import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventsController } from '../api/events.controller';
import { EventsService } from '../application/events.service';
import { NotFoundException } from '@nestjs/common';

describe('EventsController', () => {
  let controller: EventsController;

  const mockEventsService = {
    getAllEvents: vi.fn(),
    getEventById: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  };

  const eventId = 'event-123';
  const hostId = '0a5e0b0d-0f5b-4da1-8dba-b1730890bad3';

  const eventDto = {
    slug: 'technical-interview',
    title: 'Technical Interview',
    durationMinutes: 45,
  };

  const mockEvent = {
    ...eventDto,
    id: eventId,
    userId: hostId,
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

  // GET ALL EVENTS endpoint
  describe('GET /events', () => {
    it('it should return all events', async () => {
      mockEventsService.getAllEvents.mockResolvedValue([mockEvent]);

      const result = await controller.getAllEventsController();

      expect(mockEventsService.getAllEvents).toHaveBeenCalledOnce();

      expect(result).toEqual({
        success: true,
        message: 'Events fetched successfully',
        data: [mockEvent],
      });
    });

    it('it should return empty array when no events exists', async () => {
      mockEventsService.getAllEvents.mockResolvedValue([]);

      const result = await controller.getAllEventsController();

      expect(mockEventsService.getAllEvents).toHaveBeenCalledOnce();

      expect(result.data).toEqual([]);
    });
  });

  // GET EVENT BY ID endpoint
  describe('GET /events/:id', () => {
    it('it should return an event by ID', async () => {
      mockEventsService.getEventById.mockResolvedValue(mockEvent);

      const result = await controller.getEventByIdController(eventId);

      expect(mockEventsService.getEventById).toHaveBeenCalledExactlyOnceWith(
        eventId,
      );

      expect(result).toEqual({
        success: true,
        message: 'Event fetched successfully',
        data: mockEvent,
      });
    });

    it('it should propogate NotFoundException', async () => {
      const invalidId = 'invalid-id';

      mockEventsService.getEventById.mockRejectedValue(
        new NotFoundException('Event not found'),
      );

      const result = controller.getEventByIdController(invalidId);

      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  // CREATE EVENT endpoint
  describe('POST /event', () => {
    it('it should create an event', async () => {
      mockEventsService.createEvent.mockResolvedValue(mockEvent);

      const result = await controller.createEventController(eventDto);

      expect(mockEventsService.createEvent).toHaveBeenCalledExactlyOnceWith({
        ...eventDto,
        userId: hostId,
      });

      expect(result).toEqual({
        success: true,
        message: 'Event created successfully',
        data: mockEvent,
      });
    });
  });

  // PATCH EVENT endpoint
  describe('PATCH /event/:id', () => {
    it('it should update an existing event', async () => {
      const updateDto = {
        title: 'Updated Interview',
      };

      const updatedEvent = {
        ...mockEvent,
        ...updateDto,
      };

      mockEventsService.updateEvent.mockResolvedValue(updatedEvent);

      const result = await controller.updateEventController(eventId, updateDto);

      expect(mockEventsService.updateEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        hostId,
        updateDto,
      );

      expect(result).toEqual({
        success: true,
        message: 'Event updated successfully',
        data: updatedEvent,
      });
    });

    it('it should propogate NotFoundException', async () => {
      const updateDto = {
        title: 'Updated Interview',
      };

      mockEventsService.updateEvent.mockRejectedValue(
        new NotFoundException('Event not found'),
      );

      await expect(
        controller.updateEventController(eventId, updateDto),
      ).rejects.toThrow(NotFoundException);

      expect(mockEventsService.updateEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        hostId,
        updateDto,
      );
    });
  });

  // DELETE EVENT endpoint
  describe('DELETE /event/:id', () => {
    it('it should delete event', async () => {
      mockEventsService.deleteEvent.mockResolvedValue(mockEvent);

      const result = await controller.deleteEventController(eventId);

      expect(mockEventsService.deleteEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        hostId,
      );

      expect(result).toEqual({
        success: true,
        message: 'Event deleted successfully',
        data: null,
      });
    });

    it('should propagate NotFoundException when deleting a missing event', async () => {
      mockEventsService.deleteEvent.mockRejectedValue(
        new NotFoundException('Event not found'),
      );

      await expect(controller.deleteEventController(eventId)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockEventsService.deleteEvent).toHaveBeenCalledExactlyOnceWith(
        eventId,
        hostId,
      );
    });
  });
});
