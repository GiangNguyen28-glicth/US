import { MongooseModule } from '@nestjs/mongoose';
import moongose from 'mongoose';
moongose.set('debug', process.env.NODE_ENV === 'prod' ? false : true);
export const moongoseConfig = MongooseModule.forRoot(process.env.MONGO_URI, {
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
  connectionFactory: connection => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    connection.plugin(require('mongoose-autopopulate'));
    return connection;
  },
});
