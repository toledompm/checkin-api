import { User, UserRole } from 'src/user/domain/user.entity';

export type UserRefreshCheckinTokenAtributes = {
  uuid: string;
  role: UserRole;
};

export class UserRefreshCheckinToken {
  public token: string;
  constructor(user: User) {
    this.token = this.signToken(user);
  }

  private signToken(user: User): string {
    return JSON.stringify({ uuid: user.uuid, role: user.role });
  }
}
