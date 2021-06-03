import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH_STRATEGY } from 'src/auth/auth.constants';
import { CheckinService } from 'src/checkin/checkin.service';
import { CHECKIN_SERVICE } from 'src/checkin/checkin.constants';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { Roles } from 'src/auth/strategies/role.strategy';
import { UserRole } from 'src/user/domain/user.entity';

@Controller('checkin')
@UseGuards(AuthGuard(JWT_AUTH_STRATEGY))
export class CheckinController {
  constructor(
    @Inject(CHECKIN_SERVICE) private readonly checkinService: CheckinService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  checkin(@Body() userCheckinDto: UserCheckinDto): Promise<void> {
    return this.checkinService.checkinUser(userCheckinDto);
  }
}
