import { IPayload } from '@auth-module/models/interfaces/validate-user.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: IPayload): Promise<IPayload> {
    if (payload.iss === process.env.ORIGIN) {
      return payload;
    }

    throw new UnauthorizedException('No tienes permiso para acceder a este sistema. Si esto es un error, ponte en contacto con el administrador');
  }
}
