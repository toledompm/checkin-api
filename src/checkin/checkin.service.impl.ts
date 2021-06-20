import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_SERVICE } from 'src/cache/cache.constants';
import { CacheService } from 'src/cache/cache.service';
import { CheckinService } from 'src/checkin/checkin.service';
import { CheckIn } from 'src/checkin/domain/checkin.entity';
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
    @Inject(CACHE_SERVICE)
    private readonly cacheService: CacheService,
  ) {}

  public async checkinUser(checkinDto: UserCheckinDto): Promise<void> {
    const {
      value: { uuid },
    } = await this.cacheService.find(checkinDto.refreshToken);

    const user = await this.userService.findUser({ uuid });

    await this.userService.refreshCheckinToken(checkinDto);
    await this.checkinRepository.save({ user });
  }
}
