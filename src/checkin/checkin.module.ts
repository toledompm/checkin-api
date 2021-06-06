import { Module } from '@nestjs/common';
import { CheckinController } from 'src/checkin/checkin.controller';
import { CheckinServiceImpl } from 'src/checkin/checkin.service.impl';
import { CHECKIN_SERVICE } from 'src/checkin/checkin.constants';
import { UserModule } from 'src/user/user.module';

const checkinServiceProvider = {
  provide: CHECKIN_SERVICE,
  useClass: CheckinServiceImpl,
};

@Module({
  imports: [UserModule],
  providers: [checkinServiceProvider],
  controllers: [CheckinController],
})
export class CheckinModule {}
