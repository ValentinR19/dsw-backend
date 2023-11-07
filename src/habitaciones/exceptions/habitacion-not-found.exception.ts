import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class HabitacionNotFoundException extends HttpException {
  constructor() {
    Logger.error('La habitacion solicitada no ha podido ser encontrada en la base de datos.', 'HabitacionModule');
    super('La habitacion solicitado no ha podido ser encontrada.', HttpStatus.NOT_FOUND);
  }
}
