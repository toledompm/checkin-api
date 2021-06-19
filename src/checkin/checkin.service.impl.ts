import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckinService } from 'src/checkin/checkin.service';
import { CheckIn } from 'src/checkin/domain/checkin.entity';
import { assert } from 'src/common/assertions';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { USER_SERVICE } from 'src/user/user.constants';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CheckinServiceImpl implements CheckinService {
  constructor(
    @InjectRepository(CheckIn)
    private readonly checkinRepository: Repository<CheckIn>,
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  public async checkinUser({
    uuid,
    refreshToken,
  }: UserCheckinDto): Promise<void> {
    const user = await this.userService.findUser({ uuid });
    const expectedRefreshToken = await this.userService.generateCheckinToken(
      user,
    );

    assert(
      expectedRefreshToken.token === refreshToken.token,
      'Invalid Refresh Token!',
    );

    await this.userService.refreshCheckinToken(user);
    await this.checkinRepository.save({ user });
  }
}
