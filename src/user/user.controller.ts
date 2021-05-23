import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/authConstants';
import { Token } from 'src/auth/domain/token.entity';
import { assert } from 'src/common/assertions';
import { User } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/user.service';
import { USER_SERVICE } from 'src/user/userConstants';

@Controller('user')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  async checkinToken(@Req() { user }: { user: User }): Promise<Token> {
    assert(user, 'User not found');
    return await this.userService.generateCheckinToken(user);
  }
}
