import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IValidate, IValidateReturn } from '../interfaces/IValidate.interface';

@Injectable()
export class AuthUserJwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('USER_SECRET')!,
    });
  }

  public validate(payload: IValidate): IValidateReturn {
    return { id: payload.sub };
  }
}
