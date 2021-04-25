import { User } from 'src/user/domain/user.entity';
import { UserDto } from 'src/user/user.service.impl';

export interface UserService {
  getHello(): string;
  saveUser(userDto: UserDto): Promise<void>;
  getUser(id: number): Promise<User>;
}
