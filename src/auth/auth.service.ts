import { UserDto } from 'src/user/domain/dtos/user.dto';
import { UserAuthTokenAtributes } from 'src/user/domain/tokens/userAuthToken';
import { User } from 'src/user/domain/user.entity';

export interface AuthService {
  googleLogin(user: UserDto): Record<string, any>;
  getUserFromTokenAttributes(attributes: UserAuthTokenAtributes): Promise<User>;
}
