import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 96)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 96)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 96)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 120)
  password?: string;
}
