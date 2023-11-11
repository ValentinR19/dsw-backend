import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ReservaNotFoundException extends HttpException {
  constructor() {
    Logger.error('La reserva solicitada no ha podido ser encontrada en la base de datos.', 'ReservaModule');
    super('La reserva solicitada no ha podido ser encontrada.', HttpStatus.NOT_FOUND);
  }
}
