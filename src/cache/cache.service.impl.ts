import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheRecord, CacheService } from 'src/cache/cache.service';

@Injectable()
export class CacheServiceImpl implements CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async store({ key, value }: CacheRecord): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async find(key: string): Promise<CacheRecord> {
    const value = await this.cacheManager.get(key);
    return { key, value };
  }
}
