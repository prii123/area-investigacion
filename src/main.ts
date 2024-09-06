import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: '60mb' }));


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Area Investigacion')
    .setDescription('Esta es la Api de Area Investigaciones')
    .setVersion('1.0')
    // .addTag('tributaria')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    app.useGlobalPipes(new ValidationPipe());


  await app.listen(4000);
}
bootstrap();
