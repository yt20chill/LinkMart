import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:5173' });
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.path);
    next();
  });
  await app.listen(3000);
}
bootstrap();
