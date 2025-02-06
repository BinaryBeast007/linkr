import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateShortUrl } from '../dtos/create-short-url.dto';
import { ShortUrl } from '../short-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShortUrlProvider } from './create-short-url.provider';
import { ClickMetadata } from 'src/click-metadata/click-metadata.entity';
import { CacheService } from 'src/cache/providers/cache.service';

@Injectable()
export class ShortUrlsService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepository: Repository<ShortUrl>,
    private readonly createShortUrlProvider: CreateShortUrlProvider,
    private readonly cacheService: CacheService,
  ) {}

  public async createShortUrl(
    createShortUrl: CreateShortUrl,
  ): Promise<ShortUrl> {
    const shortUrl =
      await this.createShortUrlProvider.createShortUrl(createShortUrl);
    await this.cacheService.set(shortUrl.shortenedUrl, shortUrl);
    return shortUrl;
  }

  public async findByShortUrlCode(
    shortUrlCode: string,
  ): Promise<ShortUrl | null> {
    const cachedShortUrl = await this.cacheService.get<ShortUrl>(shortUrlCode);
    if (cachedShortUrl) {
      return cachedShortUrl;
    }

    const shortUrl = await this.shortUrlRepository.findOneBy({
      shortenedUrl: shortUrlCode,
    });
    if (!shortUrl) {
      return null;
    }

    await this.cacheService.set(shortUrlCode, shortUrl);
    return shortUrl;
  }

  public async incrementClickCount(shortUrlCode: string): Promise<void> {
    await this.shortUrlRepository.increment(
      { shortenedUrl: shortUrlCode },
      'clickCount',
      1,
    );
    await this.cacheService.delete(shortUrlCode);
  }

  public async findClickMetadataByShortUrlCode(
    shortUrlCode: string,
  ): Promise<ClickMetadata[]> | null {
    let shortUrl = undefined;
    try {
      shortUrl = await this.shortUrlRepository.findOne({
        where: { shortenedUrl: shortUrlCode },
        relations: ['clickMetadata'],
      });
    } catch (error) {
      throw new RequestTimeoutException();
    }

    await this.cacheService.set(
      `${shortUrlCode}-metadata`,
      shortUrl.clickMetadata,
    );

    return shortUrl;
  }
}
