import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from 'src/app/app.service';
import { JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';

@Controller()
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthcheck(): Record<string, any> {
    return this.appService.healthcheck();
  }
}
