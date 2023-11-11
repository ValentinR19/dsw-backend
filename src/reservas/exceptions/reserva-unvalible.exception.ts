import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ReservaUnvalibleException extends HttpException {
  constructor() {
    Logger.error('La reserva en esta fecha ya se encuentra registrada.', 'ReservaModule');
    super('Ocurrio un error guardando la reserva. Por favor intente nuevamente mas tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
