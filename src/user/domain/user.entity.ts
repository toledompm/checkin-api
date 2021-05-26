export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const defaults = {
  role: UserRole.MEMBER,
};

export class User {
  readonly id: number;
  readonly uuid: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, defaults, partial);
  }
}
