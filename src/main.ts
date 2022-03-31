import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configuration/swagger-steup';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(AppModule.port);
}
bootstrap();
