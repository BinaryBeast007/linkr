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

@Injectable()
export class ShortUrlsService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepository: Repository<ShortUrl>,
    private readonly createShortUrlProvider: CreateShortUrlProvider,
  ) {}

  public async createShortUrl(
    createShortUrl: CreateShortUrl,
  ): Promise<ShortUrl> {
    return await this.createShortUrlProvider.createShortUrl(createShortUrl);
  }

  public async findByShortUrlCode(
    shortUrlCode: string,
  ): Promise<ShortUrl | null> {
    return this.shortUrlRepository.findOneBy({ shortenedUrl: shortUrlCode });
  }

  public async incrementClickCount(shortUrlCode: string): Promise<void> {
    await this.shortUrlRepository.increment(
      { shortenedUrl: shortUrlCode },
      'clickCount',
      1,
    );
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

    return shortUrl;
  }
}
