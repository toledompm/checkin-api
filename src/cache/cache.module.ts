import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CACHE_SERVICE } from 'src/cache/cache.constants';
import { CacheServiceImpl } from 'src/cache/cache.service.impl';
import { Environment } from 'src/common/environtment';

const cacheConfig = Environment.config.cache;
const cacheModule = CacheModule.register({
  store: redisStore as any,
  ...cacheConfig,
});

const serviceProvider = {
  provide: CACHE_SERVICE,
  useClass: CacheServiceImpl,
};

@Module({
  imports: [cacheModule],
  providers: [serviceProvider],
  exports: [serviceProvider],
})
export class CacheProviderModule {}
