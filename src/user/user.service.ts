import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserRefreshCheckinToken } from 'src/user/domain/tokens/userRefreshCheckinToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserAuthToken } from './domain/tokens/userAuthToken';

export interface UserService {
  saveUser(userDto: UserDto): Promise<User>;
  getUser(id: number): Promise<User>;
  findUser(filter: UserFilter): Promise<User | undefined>;
  generateAuthToken(user: User): Promise<UserAuthToken>;
  generateCheckinToken(user: User): Promise<UserRefreshCheckinToken>;
  refreshCheckinToken(user: User): Promise<void>;
}
