import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cacheable } from 'cacheable';

@Injectable()
export class CacheService {
  constructor(
    @Inject('CACHE_INSTANCE') private readonly cache: Cacheable,
    private readonly configService: ConfigService,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.cache.get<T>(key);
    return cached || null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.cache.set(
      key,
      value,
      this.configService.get<string>('REDIS_TTL'),
    );
  }

  async delete(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async reset(): Promise<void> {
    await this.cache.clear();
  }
}
