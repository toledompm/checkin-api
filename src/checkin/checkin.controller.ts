import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { CheckinService } from 'src/checkin/checkin.service';
import { CHECKIN_SERVICE } from 'src/checkin/checkin.constants';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';

@Controller('checkin')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class CheckinController {
  constructor(
    @Inject(CHECKIN_SERVICE) private readonly checkinService: CheckinService,
  ) {}

  @Post()
  checkin(@Body() userCheckinDto: UserCheckinDto): Promise<void> {
    return this.checkinService.checkinUser(userCheckinDto);
  }
}
