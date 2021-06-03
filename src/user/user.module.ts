import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/domain/user.entity';
import { USER_SERVICE } from 'src/user/user.constants';
import { UserController } from 'src/user/user.controller';
import { UserServiceImpl } from 'src/user/user.service.impl';

const userProvider = {
  provide: USER_SERVICE,
  useClass: UserServiceImpl,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [userProvider],
  exports: [userProvider],
})
export class UserModule {}
