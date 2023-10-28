import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ClienteNotFoundException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error('El cliente solicitado no ha podido ser encontrado en la base de datos. Stacktrace: ', stacktrace, 'ClienteModule');
    super('El cliente solicitado no ha podido ser encontrado.', HttpStatus.NOT_FOUND);
  }
}
