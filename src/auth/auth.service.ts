import { UserDto } from 'src/user/domain/dtos/user.dto';
import {
  UserAuthToken,
  UserAuthTokenAtributes,
} from 'src/user/domain/tokens/userAuthToken';
import { User } from 'src/user/domain/user.entity';

export interface AuthService {
  googleLogin(user: UserDto): Promise<UserAuthToken>;
  signUserToken(attributes: UserAuthTokenAtributes): UserAuthToken;
  getUserFromTokenAttributes(attributes: UserAuthTokenAtributes): Promise<User>;
}
