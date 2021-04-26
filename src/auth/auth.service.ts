import { UserDto } from 'src/user/domain/user.dto';

export interface AuthService {
  googleLogin(user: UserDto): Record<string, any>;
}
