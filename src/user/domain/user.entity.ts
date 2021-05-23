import { ok } from 'assert';

const defaults = {
  firstName: 'anon',
};

export class User {
  readonly id: number;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(partial: Partial<User>) {
    ok(partial?.id);
    Object.assign(this, defaults, partial);
  }
}
