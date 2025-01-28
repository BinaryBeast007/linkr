import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';

@Injectable()
export class UsersService {
  constructor(private readonly createUserProvider: CreateUserProvider) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }
}
