import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService, TokenAtributes } from 'src/auth/auth.service';
import { Token } from 'src/auth/domain/token.entity';
import { UserDto } from 'src/user/domain/user.dto';
import { User } from 'src/user/domain/user.entity';
import { UserFilter } from 'src/user/domain/user.filter';
import { UserService } from 'src/user/user.service';
import { USER_SERVICE } from 'src/user/userConstants';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_SERVICE) private userService: UserService,
  ) {}

  async googleLogin(userDto: UserDto): Promise<Token> {
    if (!userDto) throw new Error('No user from google');
    const user = await this.getUser(userDto);
    const token = this.signToken(user);
    return token;
  }

  async getUserFromTokenAttributes({
    sub,
  }: TokenAtributes): Promise<User | undefined> {
    return this.getUser({ id: sub });
  }

  private async signToken(user: User): Promise<Token> {
    const tokenAtributes = this.extractTokenAtributes(user);
    const accessToken = this.jwtService.sign(tokenAtributes);
    return {
      accessToken: accessToken,
    };
  }

  private getUser(userAttrs: Partial<User>): Promise<User> {
    const filter = new UserFilter(userAttrs);
    const user = this.userService.findUser(filter);
    if (!user) throw new Error('User not found');
    return user;
  }

  private extractTokenAtributes(user: User): TokenAtributes {
    return {
      sub: user.id,
      email: user.email,
    };
  }
}
