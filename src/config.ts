import { JwtSignOptions } from '@nestjs/jwt';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

interface GoogleConfig {
  readonly clientID: string;
  readonly clientSecret: string;

  /**
   * callbackURL is the particular endpoint in our app which google will return control to after authenticating.
   * This is should match the url set in the developer dashboard.
   */
  readonly callbackURL: string;

  /**
   * scope refers to the set of user information that we require from google, needed in our app.
   */
  readonly scope: string[];
}

interface JwtConfig {
  readonly secret: string;
  readonly ignoreExpiration: boolean;
  readonly jwtFromRequest: JwtFromRequestFunction;
  readonly signOptions?: JwtSignOptions;
}

interface AuthConfigs {
  readonly google: GoogleConfig;
  readonly jwt: JwtConfig;
}

interface DatabaseConfigs {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

export interface Config {
  readonly auth: AuthConfigs;
  readonly db: DatabaseConfigs;
}

export const configValues: Config = {
  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        process.env.CALLBACK_URL ||
        'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: false,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
