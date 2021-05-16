import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthServiceImpl } from 'src/auth/auth.service.impl';
import {
  AUTH_SERVICE,
  GOOGLE_AUTH_STRATEGY,
  JWT_AUTH_STRATEGY,
} from 'src/auth/authConstants';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Environment } from 'src/common/environtment';
import { UserModule } from 'src/user/user.module';

const jwtConfig = Environment.config.auth.jwt;

const authProviders = [
  {
    provide: GOOGLE_AUTH_STRATEGY,
    useClass: GoogleStrategy,
  },
  {
    provide: JWT_AUTH_STRATEGY,
    useClass: JwtStrategy,
  },
];

const serviceProviders = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthServiceImpl,
  },
];

const jwtModule = JwtModule.register({
  secret: jwtConfig.secret,
  signOptions: jwtConfig.signOptions,
});

@Module({
  imports: [jwtModule, UserModule],
  providers: [...authProviders, ...serviceProviders],
  controllers: [AuthController],
})
export class AuthModule {}
