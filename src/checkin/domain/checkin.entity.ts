import { User } from 'src/user/domain/user.entity';

export class CheckIn {
  readonly user: User;
  readonly timestamp: Date;
}
