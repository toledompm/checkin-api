import { UserDto } from 'src/user/domain/user.dto';
import { User } from 'src/user/domain/user.entity';

export type TokenAtributes = {
  sub: number;
  email: string;
};

export interface AuthService {
  googleLogin(user: UserDto): Record<string, any>;
  getUserFromTokenAttributes(attributes: TokenAtributes): Promise<User>;
}
