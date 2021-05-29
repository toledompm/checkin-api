import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserFilter } from 'src/user/domain/user.filter';
import { User } from 'src/user/domain/user.entity';
import { UserCheckinDto } from 'src/user/domain/dtos/userCheckin.dto';

export interface UserService {
  saveUser(userDto: UserDto): Promise<User>;
  getUser(id: number): Promise<User>;
  findUser(filter: UserFilter): Promise<User | undefined>;
  generateCheckinTokens(user: User): Promise<UserCheckinDto>;
}
