import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UserAuthToken } from './domain/tokens/userAuthToken';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async saveUser(userDto: UserDto): Promise<User> {
    const user = new User(userDto);
    return await this.usersRepository.save(user);
  }

  public async getUser(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  public async findUser(filters: UserFilter): Promise<User | undefined> {
    return await this.usersRepository.findOne(filters);
  }

  public async generateAuthToken(user: User): Promise<UserAuthToken> {
    return new UserAuthToken(user);
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
