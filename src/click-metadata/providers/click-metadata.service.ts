import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { ClickMetadata } from '../click-metadata.entity';
import { RequestMetadataProvider } from './request-metadata.provider';
import { ShortUrlsService } from 'src/short-urls/providers/short-urls.service';

@Injectable()
export class ClickMetadataService {
  constructor(
    @InjectRepository(ClickMetadata)
    private readonly clickMetadataRepository: Repository<ClickMetadata>,
    private readonly requestMetadataProvider: RequestMetadataProvider,
    @Inject(forwardRef(() => ShortUrlsService))
    private readonly shortUrlsService: ShortUrlsService,
  ) {}

  async logClickMetadata(
    shortUrlCode: string,
    request: Request,
  ): Promise<void> {
    const shortUrl =
      await this.shortUrlsService.findByShortUrlCode(shortUrlCode);

    if (!shortUrl) {
      throw new Error('Short URL not found');
    }

    const ipAddress = this.requestMetadataProvider.getIpAddress(request);
    const userAgent = request.headers['user-agent'] || 'Unknown';
    const geolocation =
      await this.requestMetadataProvider.getGeolocation(ipAddress);
    const { deviceType, browserName, operatingSystem } =
      this.requestMetadataProvider.getDeviceInfo(userAgent);

    const clickMetadata = this.clickMetadataRepository.create({
      ipAddress,
      geolocation,
      deviceType,
      browserName,
      operatingSystem,
      shortUrl,
    });

    await this.clickMetadataRepository.save(clickMetadata);
  }

  public async findClickMetadataByShortUrlCode(
    shortUrlCode: string,
  ): Promise<ClickMetadata[]> | null {
    return await this.shortUrlsService.findClickMetadataByShortUrlCode(
      shortUrlCode,
    );
  }
}
