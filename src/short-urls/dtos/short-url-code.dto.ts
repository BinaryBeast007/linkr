import { IsString, Matches } from 'class-validator';

export class ShortUrlCodeDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{8,}$/, {
    message: 'Invalid short URL code',
  })
  shortUrlCode: string;
}
