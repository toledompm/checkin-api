import { UserCheckinDto } from 'src/checkin/domain/userCheckin.dto';

export interface CheckinService {
  checkinUser(checkinDto: UserCheckinDto): void;
}
