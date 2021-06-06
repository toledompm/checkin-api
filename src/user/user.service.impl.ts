import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compactObject } from 'src/common/objects';
import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  public async generateCheckinToken(
    user: User,
  ): Promise<UserRefreshCheckinToken> {
    return new UserRefreshCheckinToken(user);
  }

  public async refreshCheckinToken(_user: User): Promise<void> {
    /** do nothing, yet */
  }
}
