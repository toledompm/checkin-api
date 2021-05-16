import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Environment } from 'src/common/environtment';
import { AUTH_SERVICE, JWT_AUTH_STRATEGY } from 'src/auth/authConstants';
import { AuthService } from 'src/auth/auth.service';

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

  async validate(payload: any) {
    return this.authService.getUserFromTokenAttributes({
      sub: payload.sub,
      email: payload.email,
    });
  }
}
