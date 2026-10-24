import { Module } from '@nestjs/common';
import { AgentproController } from './agentpro.controller';
import { AgentproService } from './agentpro.service';

@Module({
  controllers: [AgentproController],
  providers: [AgentproService],
})
export class AgentproModule {}