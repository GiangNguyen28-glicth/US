import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import moongose from 'mongoose';
moongose.set('debug', process.env.NODE_ENV === 'prod' ? false : true);
@Injectable()
export class MoongoseConfigService implements MongooseOptionsFactory {
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: process.env.MONGO_URI_LOCALHOST_W,
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
      connectionFactory: connection => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    };
  }
}
