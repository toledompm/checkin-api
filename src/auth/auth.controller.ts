import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AUTH_SERVICE, GOOGLE_AUTH_STRATEGY } from 'src/auth/constants';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
  ) {}

  @Get('google/login')
  @UseGuards(AuthGuard(GOOGLE_AUTH_STRATEGY))
  googleLogin() {
    console.log('Redirecting to google login');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard(GOOGLE_AUTH_STRATEGY))
  googleAuthRedirect(@Req() req: Request) {
    const { user } = req;
    return this.authService.googleLogin(user);
  }
}
