import { Module } from '@nestjs/common';
import { USER_SERVICE } from 'src/user/constants';
import { UserController } from 'src/user/user.controller';
import { UserServiceImpl } from 'src/user/user.service.impl';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserServiceImpl,
    },
  ],
})
export class UserModule {}
