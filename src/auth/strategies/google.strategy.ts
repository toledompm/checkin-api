import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { Environment } from 'src/common/environtment';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_AUTH_STRATEGY,
) {
  constructor() {
    super(Environment.config.auth.google);
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): void {
    const { name, emails } = profile;

    const userDto = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    done(null, userDto);
  }
}
