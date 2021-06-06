import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { assert } from 'src/common/assertions';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User, UserRole } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/user.service';
import { USER_SERVICE } from 'src/user/user.constants';
import { Roles } from 'src/auth/strategies/role.strategy';
import { UserDto } from './domain/dtos/user.dto';

@Controller('user')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  public async checkinToken(
    @Req() { user }: { user: User },
  ): Promise<UserRefreshCheckinToken> {
    assert(user, 'User not found');
    return this.userService.generateCheckinToken(user);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  public async createUser(@Body() newUserDto: UserDto): Promise<User> {
    return this.userService.saveUser(newUserDto);
  }
}
