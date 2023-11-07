import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class TipoHabitacionNotSavedException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error('Ocurrio un error guardando el tipo de habitacion en la base de datos. Stacktrace:', stacktrace, 'HabitacionModule');
    super('Ocurrio un error guardando el tipo de habitacion. Por favor intente nuevamente mas tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
