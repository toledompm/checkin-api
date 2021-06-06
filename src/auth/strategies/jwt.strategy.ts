import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Environment } from 'src/common/environtment';
import { AUTH_SERVICE, JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { AuthService } from 'src/auth/auth.service';
import { UserAuthTokenAtributes } from 'src/user/domain/tokens/userAuthToken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_AUTH_STRATEGY) {
  @Inject(AUTH_SERVICE)
  private readonly authService: AuthService;

  constructor() {
    const {
      jwtFromRequest,
      ignoreExpiration,
      secret,
    } = Environment.config.auth.jwt;

    super({
      jwtFromRequest,
      ignoreExpiration,
      secretOrKey: secret,
    });
  }

  public async validate(payload: UserAuthTokenAtributes) {
    return this.authService.getUserFromTokenAttributes(payload);
  }
}
