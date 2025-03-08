import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    @Inject(forwardRef(() => HashingProvider))
    private hashingProvider: HashingProvider,
  ) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }

  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('The user id does not exsit');
    }
    return user;
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOneById(id);
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email) {
      const existingUser = await this.findOneByEmailProvider.findOneByEmail(
        updateUserDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email is already in use');
      }
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.password = await this.hashingProvider.hashPassword(
        updateUserDto.password,
      );
    }
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try again later',
        {
          description: 'Error updating the user',
        },
      );
    }
  }
}
