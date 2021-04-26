import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/domain/user.dto';
import { User } from 'src/user/domain/user.entity';
import { UserResponseDto } from 'src/user/domain/userResponse.dto';
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

  public async saveUser(userDto: UserDto): Promise<void> {
    this.users.push(new User({ id: this.idSequence, ...userDto }));
    this.idSequence = this.idSequence + 1;
  }

  public async getUser(id: number): Promise<UserResponseDto> {
    return this.users.find((user) => user.id === id);
  }

  public async findUserByEmail(email: string): Promise<UserResponseDto> {
    return this.users.find((user) => user.email === email);
  }
}
