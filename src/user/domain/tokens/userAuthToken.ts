import { UserRole } from 'src/user/domain/user.entity';

export type UserAuthTokenAtributes = {
  sub: number;
  role: UserRole;
};

export class UserAuthToken {
  public token: string;
  constructor(token: string) {
    this.token = token;
  }
}
