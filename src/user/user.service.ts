import { UserResponseDto } from 'src/user/domain/userResponse.dto';
import { UserDto } from 'src/user/domain/user.dto';

export interface UserService {
  getHello(): string;
  saveUser(userDto: UserDto): Promise<void>;
  getUser(id: number): Promise<UserResponseDto>;
  findUserByEmail(email: string): Promise<UserResponseDto>;
}
