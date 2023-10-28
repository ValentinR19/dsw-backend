import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ClienteNotSavedException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error('Ocurrio un error guardando el cliente en la base de datos. Stacktrace:', stacktrace, 'ClienteModule');
    super('Ocurrio un error guardando el cliente. Por favor intente nuevamente mas tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
