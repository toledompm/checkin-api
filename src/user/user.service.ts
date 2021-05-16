import { UserDto } from 'src/user/domain/user.dto';
import { UserFilter } from 'src/user/domain/user.filter';
import { User } from 'src/user/domain/user.entity';

export interface UserService {
  getHello(): string;
  saveUser(userDto: UserDto): Promise<User>;
  getUser(id: number): Promise<User>;
  findUser(filter: UserFilter): Promise<User | undefined>;
}
