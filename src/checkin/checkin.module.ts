import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CHECKIN_SERVICE } from 'src/checkin/checkin.constants';
import { CheckinController } from 'src/checkin/checkin.controller';
import { CheckinServiceImpl } from 'src/checkin/checkin.service.impl';
import { CheckIn } from 'src/checkin/domain/checkin.entity';
import { UserModule } from 'src/user/user.module';

const checkinServiceProvider = {
  provide: CHECKIN_SERVICE,
  useClass: CheckinServiceImpl,
};

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([CheckIn])],
  providers: [checkinServiceProvider],
  controllers: [CheckinController],
})
export class CheckinModule {}
