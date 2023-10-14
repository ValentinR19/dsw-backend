import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class UsuarioNotSavedException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error('Ocurrio un error guardando el usuario en la base de datos. Stacktrace:', stacktrace, 'UsuarioModule');
    super('Ocurrio un error guardando el usuario. Por favor intente nuevamente mas tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
