import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateShortUrl } from './dtos/create-short-url.dto';
import { ShortUrlsService } from './providers/short-urls.service';

@Controller('short-urls')
export class ShortUrlsController {
  constructor(private readonly shortUrlsService: ShortUrlsService) {}

  @Post()
  public async createShortUrl(@Body() createShortUrl: CreateShortUrl) {
    try {
      const shortUrl =
        await this.shortUrlsService.createShortUrl(createShortUrl);
      return { success: true, data: shortUrl };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Failed to create shortened URL');
    }
  }
}
