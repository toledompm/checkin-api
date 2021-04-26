import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Environment } from 'src/common/environtment';
import { JWT_AUTH_STRATEGY } from 'src/auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_AUTH_STRATEGY) {
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
    return payload;
  }
}
