import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  await app.listen(3004);
}
bootstrap();
