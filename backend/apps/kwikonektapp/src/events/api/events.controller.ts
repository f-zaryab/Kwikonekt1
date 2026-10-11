import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from '../application/events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
// external
import { apiResponse } from '@lib/common/utils/api-response.utils';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/')
  async getAllEventsController() {
    const events = await this.eventService.getAllEvents();

    return apiResponse('Events fetched successfully', events);
  }

  @Get('/:id')
  async getEventByIdController(@Param('id') id: string) {
    const event = await this.eventService.getEventById(id);

    return apiResponse('Event fetched successfully', event);
  }

  @Post('/')
  async createEventController(@Body() data: CreateEventDto) {
    const userID = '0a5e0b0d-0f5b-4da1-8dba-b1730890bad3';

    const event = await this.eventService.createEvent({
      ...data,
      userId: userID,
    });

    return apiResponse('Event created successfully', event);
  }

  @Patch('/:id')
  async updateEventController(
    @Param('id') id: string,
    @Body() data: UpdateEventDto,
  ) {
    const userId = '0a5e0b0d-0f5b-4da1-8dba-b1730890bad3';

    const event = await this.eventService.updateEvent(id, userId, data);

    return apiResponse('Event updated successfully', event);
  }

  @Delete('/:id')
  async deleteEventController(@Param('id') id: string) {
    const userId = '0a5e0b0d-0f5b-4da1-8dba-b1730890bad3';

    await this.eventService.deleteEvent(id, userId);

    return apiResponse('Event deleted successfully', null);
  }
}
