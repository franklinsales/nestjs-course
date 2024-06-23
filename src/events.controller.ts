// import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findaAll() {
    return this.events;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === +id);
    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      id: this.events.length + 1,
      when: new Date(input.when),
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === +id);
    const event = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    this.events[index] = event;

    return event;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {
    const eventsFiltered = this.events.filter((event) => event.id !== +id);
    this.events = eventsFiltered;
  }
}
