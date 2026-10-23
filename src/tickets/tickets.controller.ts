import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('search')
  search(
    @Query('ticketId') ticketId?: string,
    @Query('name') name?: string,
    @Query('movie') movie?: string,
    @Query('seat') seat?: string,
  ) {
    return this.ticketsService.search(ticketId, name, movie, seat);
  }
}