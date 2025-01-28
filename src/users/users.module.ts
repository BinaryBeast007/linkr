import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './providers/users.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';

@Module({
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, CreateUserProvider, FindOneByEmailProvider],
})
export class UsersModule {}
