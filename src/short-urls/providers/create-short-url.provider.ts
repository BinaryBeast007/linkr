import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShortUrl } from '../dtos/create-short-url.dto';
import { ShortUrl } from '../short-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class CreateShortUrlProvider {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepository: Repository<ShortUrl>,
  ) {}

  public async createShortUrl(
    createShortUrl: CreateShortUrl,
  ): Promise<ShortUrl> {
    const { customAlias, originalUrl, password, expirationDate } =
      createShortUrl;

    if (customAlias && !(await this.isShortUrlAvailable(customAlias))) {
      throw new BadRequestException('Custom alias is already taken');
    }

    const shortUrlCode = customAlias || (await this.generateUniqueCode());

    const shortUrl = this.shortUrlRepository.create({
      originalUrl,
      shortenedUrl: shortUrlCode,
      customAlias,
      password,
      expirationDate,
      clickCount: 0,
    });

    return this.shortUrlRepository.save(shortUrl);
  }

  private async isShortUrlAvailable(shortUrlCode: string): Promise<boolean> {
    const shortUrl = await this.shortUrlRepository.findOneBy({
      shortenedUrl: shortUrlCode,
    });
    return !shortUrl;
  }

  private async generateUniqueCode(): Promise<string> {
    let shortUrlCode: string;
    let isAvailable: boolean;

    do {
      shortUrlCode = nanoid(8);
      isAvailable = await this.isShortUrlAvailable(shortUrlCode);
    } while (!isAvailable);

    return shortUrlCode;
  }
}
