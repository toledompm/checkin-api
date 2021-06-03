import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/user/domain/dtos/user.dto';
import {
  UserAuthToken,
  UserAuthTokenAtributes,
} from 'src/user/domain/tokens/userAuthToken';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';
import { USER_SERVICE } from 'src/user/user.constants';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(@Inject(USER_SERVICE) private userService: UserService) {}

  async googleLogin(userDto: UserDto): Promise<UserAuthToken> {
    if (!userDto) throw new Error('No user from google');
    const user = await this.getUser(userDto);
    return new UserAuthToken(user);
  }

  async getUserFromTokenAttributes({
    sub,
  }: UserAuthTokenAtributes): Promise<User | undefined> {
    return this.getUser({ id: sub });
  }

  private async getUser(userAttrs: Partial<User>): Promise<User> {
    const filter = new UserFilter(userAttrs);
    const [user] = await this.userService.findUser(filter);
    if (!user) throw new Error('User not found');
    return user;
  }
}
