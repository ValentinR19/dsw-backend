import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  handleRequest(err: Error, userPayload, info: string) {
    if (err || !userPayload) {
      Logger.warn(`Ocurrio un evento que impidio la validacion del JWT. Stacktrace: ${info}`, 'JwtAuthGuard');
      throw err || new UnauthorizedException();
    }
    return userPayload;
  }
}
