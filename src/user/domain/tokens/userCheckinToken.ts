import { Token } from 'src/auth/domain/token';
import { User, UserRole } from 'src/user/domain/user.entity';

export type UserCheckinTokenAtributes = {
  uuid: string;
  role: UserRole;
};

export class UserCheckinToken extends Token<User> {
  constructor(user: User) {
    super(user);
  }

  // TODO: think up strategies to salt one use checkin tokens
  signToken(_entity: User): string {
    throw new Error('Method not implemented.');
  }
}
