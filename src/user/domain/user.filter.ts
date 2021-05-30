export class UserFilter {
  public id?: number;
  public email?: string;

  constructor(attrs: Partial<UserFilter>) {
    Object.assign(this, attrs);
  }
}
