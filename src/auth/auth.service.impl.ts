import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { USER_SERVICE } from 'src/user/constants';
import { UserDto } from 'src/user/domain/user.dto';
import { UserResponseDto } from 'src/user/domain/userResponse.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_SERVICE) private userService: UserService,
  ) {}

  async googleLogin(userDto: UserDto): Promise<Record<string, any>> {
    if (!userDto) {
      return { err: 'No user from google' };
    }

    const { email } = userDto;
    const user = await this.getUser(email);

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: accessToken,
    };
  }

  private async getUser(userDto): Promise<UserResponseDto> {
    return this.userService.findUserByEmail(userDto.email);
  }
}
