import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ShortUrlCodeDto } from './dtos/short-url-code.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ClickMetadataService } from './providers/click-metadata.service';

@Controller('click-metadata')
export class ClickMetadataController {
  constructor(private readonly clickMetadataService: ClickMetadataService) {}

  @Get(':shortUrlCode')
  async getUrlMetadata(
    @Param() params: ShortUrlCodeDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const { shortUrlCode } = params;

    const urlMetadata =
      await this.clickMetadataService.findClickMetadataByShortUrlCode(
        shortUrlCode,
      );

    if (!urlMetadata) {
      throw new NotFoundException(
        `No metadata found for short URL: ${shortUrlCode}`,
      );
    }

    return urlMetadata;
  }
}
