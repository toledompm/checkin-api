import { Controller, Get, Inject } from '@nestjs/common';
import { USER_SERVICE } from 'src/user/constants';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
