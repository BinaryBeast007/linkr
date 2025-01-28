import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinDate,
} from 'class-validator';

export class CreateShortUrl {
  @IsUrl({ allow_fragments: true, require_protocol: false })
  @IsNotEmpty()
  @MaxLength(2048)
  originalUrl: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Custom Alias must only contain letters, numbers, underscores, or hyphens',
  })
  customAlias?: string;

  @IsString()
  @IsOptional()
  @MaxLength(128)
  password?: string;

  @IsISO8601()
  @IsOptional()
  @Type(() => Date)
  @MinDate(new Date())
  expirationDate?: Date;
}
