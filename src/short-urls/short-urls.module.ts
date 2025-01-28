import { Module } from '@nestjs/common';
import { ShortUrlsController } from './short-urls.controller';

@Module({
  controllers: [ShortUrlsController]
})
export class ShortUrlsModule {}
