import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { SwaggerDocumentBuilderModule } from './swagger';
dotenv.config({
  path: './.env',
});
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerDocumentBuilderModule.setup(app);
  await app.listen(3009);
}
bootstrap();
