import { Token } from 'src/auth/domain/token';
import { User } from 'src/user/domain/user.entity';

export type UserCheckinTokenAtributes = {
  uuid: string;
};

export class UserCheckinToken extends Token<User> {
  constructor(user: User) {
    super(user);
  }

  signToken(user: User): string {
    return JSON.stringify({ uuid: user.uuid });
  }
}
