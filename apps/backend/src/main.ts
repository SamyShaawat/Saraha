import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { TransformInterceptor, AllExceptionsFilter } from '@saraha/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  // Global response envelope
  app.useGlobalInterceptors(new TransformInterceptor());
  // Global error handling
  app.useGlobalFilters(new AllExceptionsFilter());
  // Input validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));

  const port = process.env['PORT'] ?? 3008;
  await app.listen(port);

  Logger.log(`🚀 Backend running on: http://localhost:${port}/api`, 'Bootstrap');
}

bootstrap();
