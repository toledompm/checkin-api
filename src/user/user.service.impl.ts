import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/user.service';

export type UserDto = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

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

  public async saveUser(userDto: UserDto): Promise<void> {
    this.users.push(new User({ id: this.idSequence, ...userDto }));
    this.idSequence = this.idSequence + 1;
  }

  public async getUser(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
