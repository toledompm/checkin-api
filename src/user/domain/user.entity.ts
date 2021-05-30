import { UserCheckinToken } from 'src/user/domain/tokens/userCheckinToken';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const defaults = {
  role: UserRole.MEMBER,
};

export class User {
  public id: number;
  public uuid: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: UserRole;

  token: UserCheckinToken;

  constructor(partial: Partial<User>) {
    Object.assign(this, defaults, partial);
  }
}
