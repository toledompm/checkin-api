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
import { assert } from 'src/common/assertions';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(@Inject(USER_SERVICE) private userService: UserService) {}

  public async googleLogin(userDto: UserDto): Promise<UserAuthToken> {
    if (!userDto) throw new Error('No user from google');
    const foundUser = await this.getUser(userDto);

    const user = foundUser || (await this.createUser(userDto));
    return this.userService.generateAuthToken(user);
  }

  public async getUserFromTokenAttributes({
    sub,
  }: UserAuthTokenAtributes): Promise<User | undefined> {
    return this.getUser({ id: sub });
  }

  private async getUser(userAttrs: Partial<User>): Promise<User | undefined> {
    const filter = new UserFilter(userAttrs);
    const user = await this.userService.findUser(filter);
    return user;
  }

  private async createUser(userDto: UserDto): Promise<User> {
    const userIsValid = await this.validateUserDto(userDto);
    assert(userIsValid, 'User not allowed');
    return this.userService.saveUser(userDto);
  }

  private async validateUserDto(_userDto: UserDto): Promise<boolean> {
    /** check new user attrs against a whitelist */
    return true;
  }
}
