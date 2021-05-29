import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';
import { UserCheckinToken } from 'src/user/domain/tokens/userCheckinToken';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserServiceImpl implements UserService {
  private users: User[];
  private idSequence: number;

  constructor() {
    this.users = [];
    this.idSequence = 1;
  }

  public async saveUser(userDto: UserDto): Promise<User> {
    const user = this.instantiateUser(userDto);
    const checkinToken = new UserCheckinToken(user);
    user.token = checkinToken;
    this.users.push(user);

    this.idSequence = this.idSequence + 1;
    return this.users.slice(-1)[0];
  }

  public async getUser(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  public async findUser(filters: UserFilter): Promise<User | undefined> {
    return this.users.find((user) => {
      let flag = true;
      Object.entries(filters).map(([key, value]) => {
        if (user[key] === value) flag = false;
      });
      return flag;
    });
  }

  public async generateCheckinTokens(user: User): Promise<UserCheckinDto> {
    const { token } = user;
    const refreshToken = new UserRefreshCheckinToken(user);
    return {
      token,
      refreshToken,
    };
  }

  private instantiateUser(userDto: UserDto): User {
    return new User({
      id: this.idSequence,
      ...userDto,
    });
  }
}
