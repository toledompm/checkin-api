import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';

export interface UserService {
  saveUser(userDto: UserDto): Promise<User>;
  getUser(id: number): Promise<User>;
  findUser(filter: UserFilter): Promise<User[] | undefined>;
  generateCheckinToken(user: User): Promise<UserRefreshCheckinToken>;
}
