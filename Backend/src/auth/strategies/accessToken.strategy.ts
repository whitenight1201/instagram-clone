import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

// type JwtPayload = {
//   sub: string;
//   username: string;
// };

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.username };
  }
}
