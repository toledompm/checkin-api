import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserFilter } from 'src/user/domain/user.filter';
import { User } from 'src/user/domain/user.entity';
import { UserAuthToken } from 'src/user/domain/tokens/userAuthToken';

export interface UserService {
  saveUser(userDto: UserDto): Promise<User>;
  getUser(id: number): Promise<User>;
  findUser(filter: UserFilter): Promise<User | undefined>;
  generateCheckinToken(user: User): Promise<UserAuthToken>;
}
