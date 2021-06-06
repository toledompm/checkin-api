import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';

export class UserCheckinDto {
  public uuid: string;
  public refreshToken: UserRefreshCheckinToken;

  constructor(partial: Partial<UserCheckinDto>) {
    Object.assign(this, partial);
  }
}
