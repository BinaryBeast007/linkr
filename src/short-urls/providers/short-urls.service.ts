import { Injectable } from '@nestjs/common';
import { CreateShortUrl } from '../dtos/create-short-url.dto';
import { ShortUrl } from '../short-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShortUrlProvider } from './create-short-url.provider';

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
}
