import { Token } from 'src/auth/domain/token';
import { User, UserRole } from 'src/user/domain/user.entity';

export type UserRefreshCheckinTokenAtributes = {
  uuid: string;
  role: UserRole;
};

export class UserRefreshCheckinToken extends Token<User> {
  constructor(user: User) {
    super(user);
  }

  signToken(user: User): string {
    return JSON.stringify({ uuid: user.uuid, role: user.role });
  }
}
