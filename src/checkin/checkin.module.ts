import { Module } from '@nestjs/common';
import { CheckinController } from 'src/checkin/checkin.controller';
import { CheckinServiceImpl } from 'src/checkin/checkin.service.impl';
import { CHECKIN_SERVICE } from 'src/checkin/checkin.constants';

const checkinServiceProvider = {
  provide: CHECKIN_SERVICE,
  useValue: new CheckinServiceImpl(),
};

@Module({
  imports: [],
  controllers: [CheckinController],
  providers: [checkinServiceProvider],
})
export class CheckinModule {}
