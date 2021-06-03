import { Module } from '@nestjs/common';
import { USER_SERVICE } from 'src/user/user.constants';
import { UserController } from 'src/user/user.controller';
import { UserServiceImpl } from 'src/user/user.service.impl';

const userProvider = {
  provide: USER_SERVICE,
  useValue: new UserServiceImpl(),
};

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userProvider],
  exports: [userProvider],
})
export class UserModule {}
