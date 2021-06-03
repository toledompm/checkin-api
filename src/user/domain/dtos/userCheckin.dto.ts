import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';

export class UserCheckinDto {
  public uuid: string;
  public refreshToken: UserRefreshCheckinToken;
  public timestamp?: Date;

  constructor(partial: Partial<UserCheckinDto>) {
    Object.assign(this, partial, { timestamp: Date.now() });
  }
}
