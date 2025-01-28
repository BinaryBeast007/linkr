import { Module } from '@nestjs/common';
import { ShortUrlsController } from './short-urls.controller';
import { ShortUrlsService } from './providers/short-urls.service';
import { CreateShortUrlProvider } from './providers/create-short-url.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './short-url.entity';

@Module({
  controllers: [ShortUrlsController],
  providers: [ShortUrlsService, CreateShortUrlProvider],
  imports: [TypeOrmModule.forFeature([ShortUrl])],
})
export class ShortUrlsModule {}
