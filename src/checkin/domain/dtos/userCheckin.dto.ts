import { UserCheckinToken } from 'src/user/domain/tokens/userCheckinToken';

export class UserCheckinDto {
  public userToken: UserCheckinToken;
  public timestamp: Date;

  constructor(partial: Partial<UserCheckinDto>) {
    Object.assign(this, partial, { timestamp: Date.now() });
  }
}
