import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { assert } from 'src/common/assertions';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/user.service';
import { USER_SERVICE } from 'src/user/user.constants';

@Controller('user')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  async checkinToken(
    @Req() { user }: { user: User },
  ): Promise<UserRefreshCheckinToken> {
    assert(user, 'User not found');
    return this.userService.generateCheckinToken(user);
  }
}
