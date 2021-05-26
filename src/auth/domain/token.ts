export abstract class Token<T> {
  public accessToken: string;
  constructor(entity: T) {
    this.accessToken = this.signToken(entity);
  }
  abstract signToken(entity: T): string;
}
