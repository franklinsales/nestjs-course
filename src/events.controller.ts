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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findaAll() {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const event = await this.repository.findOne({
      where: { id: parseInt(id) },
    });
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
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne({
      where: { id: parseInt(id) },
    });
    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne({
      where: { id: parseInt(id) },
    });
    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.remove(event);
  }
}
