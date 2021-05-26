import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/auth/domain/token';
import { User, UserRole } from 'src/user/domain/user.entity';

export type UserAuthTokenAtributes = {
  sub: number;
  uuid: string;
  role: UserRole;
};

export class UserAuthToken extends Token<User> {
  private jwtService: JwtService;
  constructor(user: User) {
    super(user);
  }

  signToken(user: User): string {
    const tokenAtributes = this.extractTokenAtributes(user);
    return this.jwtService.sign(tokenAtributes);
  }

  private extractTokenAtributes(user: User): UserAuthTokenAtributes {
    return {
      sub: user.id,
      role: user.role,
      uuid: user.uuid,
    };
  }
}
