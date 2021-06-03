import { Injectable } from '@nestjs/common';
import { CheckinService } from 'src/checkin/checkin.service';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';

@Injectable()
export class CheckinServiceImpl implements CheckinService {
  checkinUser(_checkinDto: UserCheckinDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
