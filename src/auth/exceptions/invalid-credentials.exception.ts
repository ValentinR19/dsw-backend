import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(username: string) {
    Logger.error(`La clave proporcionada para el usuario ${username} es incorrecta.`, 'UsuarioModule');
    super('El usuario o clave proporcionados son incorrectos.', HttpStatus.NOT_ACCEPTABLE);
  }
}
