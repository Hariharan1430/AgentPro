import { Controller, Get, Query } from '@nestjs/common';
import { AgentproService } from './agentpro.service';

@Controller('agentpro')
export class AgentproController {
  constructor(private readonly agentproService: AgentproService) {}

  @Get('visitor')
  async getVisitor(@Query('studentId') studentId: string) {
    return this.agentproService.getVisitor(studentId);
  }
}