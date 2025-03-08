import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthenticatedRequest } from './interfaces/authenticate-request.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(AuthType.None)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('profile')
  @Auth(AuthType.Bearer)
  public getProfile(@Req() request: AuthenticatedRequest) {
    const userId = request.user.sub;
    return this.usersService.findOneById(userId);
  }

  @Put('profile')
  @Auth(AuthType.Bearer)
  public updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.sub;
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
