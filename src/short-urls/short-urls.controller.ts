import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Redirect } from '@nestjs/common';
import { CreateShortUrl } from './dtos/create-short-url.dto';
import { ShortUrlsService } from './providers/short-urls.service';
import { ShortUrlCodeDto } from './dtos/short-url-code.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Auth(AuthType.None)
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

  @Get(':shortUrlCode')
  @Redirect()
  async redirect(@Param() params: ShortUrlCodeDto) {
    const { shortUrlCode } = params;

    const shortUrl =
      await this.shortUrlsService.findByShortUrlCode(shortUrlCode);
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found');
    }

    await this.shortUrlsService.incrementClickCount(shortUrlCode);

    return { url: shortUrl.originalUrl };
  }
}
