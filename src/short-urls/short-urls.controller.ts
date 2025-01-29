import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { CreateShortUrl } from './dtos/create-short-url.dto';
import { ShortUrlsService } from './providers/short-urls.service';
import { ShortUrlCodeDto } from './dtos/short-url-code.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ClickMetadataService } from 'src/click-metadata/providers/click-metadata.service';
import { Request } from 'express';

@Auth(AuthType.None)
@Controller('short-urls')
export class ShortUrlsController {
  constructor(
    private readonly shortUrlsService: ShortUrlsService,
    @Inject(forwardRef(() => ClickMetadataService))
    private readonly clickMetadataService: ClickMetadataService,
  ) {}

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
  async redirect(@Param() params: ShortUrlCodeDto, @Req() request: Request) {
    const { shortUrlCode } = params;

    const shortUrl =
      await this.shortUrlsService.findByShortUrlCode(shortUrlCode);
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found');
    }

    await this.shortUrlsService.incrementClickCount(shortUrlCode);

    await this.clickMetadataService.logClickMetadata(shortUrlCode, request);

    return { url: shortUrl.originalUrl };
  }
}
