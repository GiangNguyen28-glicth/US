import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class MoongoseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
