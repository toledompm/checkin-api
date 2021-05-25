import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';

export interface CheckinService {
  checkinUser(checkinDto: UserCheckinDto): void;
}
