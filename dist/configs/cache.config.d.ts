import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common';
export declare class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions;
}
