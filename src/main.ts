import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configuration/swagger-steup';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.use(helmet());
  await app.listen(AppModule.port);
}
bootstrap();
