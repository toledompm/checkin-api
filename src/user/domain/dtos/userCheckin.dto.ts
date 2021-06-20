import { User, UserRole } from 'src/user/domain/user.entity';

export type UserRefreshCheckinTokenAtributes = {
  uuid: string;
  role: UserRole;
};

export class UserCheckinDto {
  public refreshToken: string;

  constructor(partial: Partial<UserCheckinDto>) {
    Object.assign(this, partial);
  }

  static extractUserTokenAttributes(
    user: User,
  ): UserRefreshCheckinTokenAtributes {
    const { uuid, role } = user;
    return { uuid, role };
  }
}
