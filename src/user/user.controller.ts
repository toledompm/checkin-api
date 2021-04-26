import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/constants';
import { USER_SERVICE } from 'src/user/constants';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
  getHello(): string {
    return this.userService.getHello();
  }
}
