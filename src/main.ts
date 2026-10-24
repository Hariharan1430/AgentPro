import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  console.log(process.env.AGENTPRO_IDENTITY_SECRET);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: "http://localhost:5173",
  credentials: true,
});

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Allow AgentPro visitor endpoint without Bearer token
    if (req.path.startsWith('/agentpro')) {
      return next();
    }

    // Protect only ticket APIs
    if (req.path.startsWith('/tickets')) {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'Authorization header missing',
        });
      }

      const token = authHeader.replace('Bearer ', '');

      if (token !== 'AgentPro#Ticket@123') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
    }

    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();