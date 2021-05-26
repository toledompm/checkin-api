import { UserCheckinDto } from 'src/checkin/domain/dtos/userCheckin.dto';

export interface CheckinService {
  checkinUser(checkinDto: UserCheckinDto): void;
}
