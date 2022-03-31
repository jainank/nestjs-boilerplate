import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayloadModel } from './jwt.payload.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtExpirationInterval: number;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.jwtExpirationInterval = config.get<number>('jwtExpirationInterval');
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<JwtPayloadModel> {
    const user = await this.userService.findOne(username);
    if (user && (await this.comparePassword(password, user.password))) {
      return this.token(user);
    }
    return null;
  }

  async login(payload: JwtPayloadModel) {
    return { accessToken: this.jwtService.sign(payload) };
  }

  private comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }

  private token(user: User): JwtPayloadModel {
    const now = new Date();
    now.setMinutes(now.getMinutes() + this.jwtExpirationInterval);
    Math.round(now.getTime() / 1000);

    return {
      userid: user._id,
      exp: Math.round(now.getTime() / 1000),
      iat: Math.round(Date.now() / 1000),
    };
  }
}
