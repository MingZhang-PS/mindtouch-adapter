import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004);
}
bootstrap();
