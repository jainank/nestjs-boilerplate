import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const hostDomain = AppModule.isDev
    ? `${AppModule.host}:${AppModule.port}`
    : AppModule.host;
  const config = new DocumentBuilder()
    .setTitle('Tensco')
    .setDescription('Tensco API description')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, swaggerDoc, {
    swaggerUrl: `${hostDomain}/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
};
