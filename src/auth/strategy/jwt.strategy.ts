import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadModel } from '../jwt.payload.model';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../user/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configuration: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.get('jwtSecret'),
    });
  }

  async validate(payload: JwtPayloadModel) {
    const user = await this.userService.getUser(payload.userid);
    return this.userService.transform(user);
  }
}
