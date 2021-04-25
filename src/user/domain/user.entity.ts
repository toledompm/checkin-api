import { ok } from 'assert';

export class User {
  readonly id: number;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor({ id, email, firstName, lastName }: Partial<User>) {
    ok(id);
    this.id = id;
    this.email = email || '';
    this.firstName = firstName || 'anon';
    this.lastName = lastName || '';
  }
}
