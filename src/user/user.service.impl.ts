import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/domain/user.dto';
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

  public getHello(): string {
    return 'Hello User!';
  }

  public async saveUser(userDto: UserDto): Promise<User> {
    this.users.push(new User({ id: this.idSequence, ...userDto }));
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
}
