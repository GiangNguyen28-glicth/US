import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import os from 'os';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Constants } from './constants/constants';
import helmet from 'helmet';
import { outputStartupInformation } from './utils/ip.utils';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(helmet());
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  process.env.UV_THREADPOOL_SIZE = os.cpus().length.toString();
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ limit: '1mb', extended: true }));
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:2050'],
  });
  // app.useGlobalFilters(new GraphQLExceptionFilter());
  app.use(
    graphqlUploadExpress({
      maxFiles: 100,
      maxFileSize: 10000000, // 10 MB,
    }),
  );
  Constants.generateStatisticOrder();
  Constants.generateSortOrder();
  await app.listen(process.env.PORT || 3000, () => {});
}
bootstrap();
