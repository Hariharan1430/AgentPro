import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { AgentproModule } from './agentpro/agentpro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TicketsModule,
    AgentproModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}