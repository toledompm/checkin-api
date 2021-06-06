import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { CheckIn } from './domain/checkin.entity';

export interface CheckinService {
  checkinUser(checkinDto: UserCheckinDto): Promise<CheckIn>;
}
