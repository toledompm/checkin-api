export class UserFilter {
  public readonly id?: number;
  public readonly email?: string;

  constructor(attrs: Partial<UserFilter>) {
    Object.assign(this, attrs);
  }
}
