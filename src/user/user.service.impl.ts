import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_SERVICE } from 'src/cache/cache.constants';
import { CacheService } from 'src/cache/cache.service';
import { compactObject } from 'src/common/objects';
import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_SERVICE) private readonly cacheService: CacheService,
  ) {}

  public async saveUser(userDto: UserDto): Promise<User> {
    const user = new User(userDto);
    return await this.userRepository.save(user);
  }

  public async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async findUser(filter: UserFilter): Promise<User | undefined> {
    const compactedFilter = compactObject(filter);
    return await this.userRepository.findOne(compactedFilter);
  }

  public async generateCheckinToken(user: User): Promise<UserCheckinDto> {
    const key = uuidv4();
    const attributes = UserCheckinDto.extractUserTokenAttributes(user);
    await this.cacheService.store({ key, value: attributes });

    return new UserCheckinDto({ refreshToken: key });
  }

  public async refreshCheckinToken({
    refreshToken,
  }: UserCheckinDto): Promise<void> {
    await this.cacheService.delete(refreshToken);
  }
}
