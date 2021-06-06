import { CheckIn } from 'src/checkin/domain/checkin.entity';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';

export interface CheckinService {
  checkinUser(checkinDto: UserCheckinDto): Promise<CheckIn>;
}
