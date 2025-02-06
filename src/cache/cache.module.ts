import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { CacheService } from './providers/cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: (configService: ConfigService) => {
        // const secondary = createKeyv('redis://localhost:6379');
        const secondary = createKeyv(configService.get<string>('REDIS_URL'));

        return new Cacheable({ secondary, ttl: configService.get<string>('REDIS_TTL') });
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE', CacheService],
})
export class CacheModule {}
