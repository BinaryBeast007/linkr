import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }
}
