import { Reserva } from '@reserva-module/models/classes/reserva.entity';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservaDTO extends Reserva {
  @IsDateString({ strict: true }, { message: 'El formato de la fechade entrada es incorrecto. Por favor envíe una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de entrada no puede estar vacia' })
  fechaEntrada: string;

  @IsDateString({ strict: true }, { message: 'El formato de la fecha de salida es incorrecto. Por favor envíe una fecha valida' })
  @IsNotEmpty({ message: 'La fecha de salida no puede estar vacia' })
  fechaSalida: string;

  @IsNumber({}, { message: 'El formato del id de la habitacion es incorrecto. Por favor envíe un valor numérico valido' })
  @IsNotEmpty({ message: 'Se debe proporcionar la habitacion' })
  idHabitacion: number;

  @IsNumber({}, { message: 'El formato del documento del cliente es incorrecto. Por favor envíe un valor numérico valido' })
  @IsNotEmpty({ message: 'Se debe proporcionar el documento del cliente' })
  documentoCliente: string;

  @IsNumber({}, { message: 'El formato de la cantidad de personas es incorrecto. Por favor envíe un valor numérico valido' })
  @IsNotEmpty({ message: 'Se debe proporcionar la cantidad de personas' })
  cantidad: number;

  @IsNumber({}, { message: 'El formato del precio final es incorrecto. Por favor envíe un valor numérico valido' })
  @IsNotEmpty({ message: 'Se debe proporcionar un precio final' })
  precioFinal: number;

  @IsBoolean({ message: `El formato del campo pagado es incorrecto` })
  @IsNotEmpty({ message: 'El campo pagado no puede estar vacio' })
  pagada: boolean;
}
