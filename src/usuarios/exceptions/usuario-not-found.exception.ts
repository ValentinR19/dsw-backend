import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class UsuarioNotFoundException extends HttpException {
  constructor() {
    Logger.error('El usuario solicitado no ha podido ser encontrado en la base de datos.', 'UsuarioModule');
    super('El usuario solicitado no ha podido ser encontrado.', HttpStatus.NOT_FOUND);
  }
}
