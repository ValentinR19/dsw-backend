import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class TiposHabitacionNotFoundException extends HttpException {
  constructor() {
    Logger.error('No se encontraron tipos de habitación en la base de datos.', 'HabitacionModule');
    super('Los tipos de habitación solicitados no han podido ser encontrados.', HttpStatus.NOT_FOUND);
  }
}
