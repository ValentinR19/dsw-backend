import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class TipoHabitacionNotFoundException extends HttpException {
  constructor() {
    Logger.error('EL tipo de habitacion solicitado no ha podido ser encontrado en la base de datos.', 'HabitacionModule');
    super('EL tipo de habitacion solicitado  no ha podido ser encontrado.', HttpStatus.NOT_FOUND);
  }
}
