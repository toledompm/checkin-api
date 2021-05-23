import { Body, Inject, Post } from '@nestjs/common';
import { CHECKIN_SERVICE } from 'src/checkin/checkinConstants';
import { CheckinService } from 'src/checkin/checkin.service';
import { UserCheckinDto } from 'src/checkin/domain/userCheckin.dto';

export class CheckinController {
  constructor(
    @Inject(CHECKIN_SERVICE) private readonly checkinService: CheckinService,
  ) {}

  @Post()
  checkin(@Body() userCheckinDto: UserCheckinDto): void {
    return this.checkinService.checkinUser(userCheckinDto);
  }
}
