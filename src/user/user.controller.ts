import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/authConstants';
import { USER_SERVICE } from 'src/user/userConstants';
import { UserService } from 'src/user/user.service';

@Controller('user')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
