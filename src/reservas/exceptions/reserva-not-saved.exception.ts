import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ReservaNotSavedException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error('Ocurrio un error guardando la reserva en la base de datos. Stacktrace:', stacktrace, 'ReservaModule');
    super('Ocurrio un error guardando la reserva. Por favor intente nuevamente mas tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
