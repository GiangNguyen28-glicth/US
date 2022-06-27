import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLExceptionFilter } from './common/exception/HttpExceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new GraphQLExceptionFilter());
  await app.listen(process.env.SV_PORT || process.env.PORT, () =>
    console.log('🏃 App running on port: ' + process.env.SV_PORT),
  );
}
bootstrap();
