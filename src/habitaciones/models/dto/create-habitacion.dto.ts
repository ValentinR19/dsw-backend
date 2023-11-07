import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateHabitacionDto extends Habitacion {
  idTipoHabitacion: number;

  @IsString({ message: 'El formato de las categorias es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'Las caracteristicas no pueden estar vacías' })
  @MaxLength(500, { message: 'Las caracteristicas son demasiado largas' })
  caracteristicas: string;

  @IsInt({ message: 'La capacidad de personas debe ser un valor entero. Por favor envie un valor correcto' })
  @IsNotEmpty({ message: 'La cantidad de personas no puede estar vacía' })
  capacidadPersonas: number;

  @IsNumber({}, { message: 'El formato del precio es incorrecto. Por favor envie un valor numerico valido' })
  @IsNotEmpty({ message: 'El precio no puede estar vacío' })
  precio: number;

  @IsInt({ message: 'El formato del descuento es incorrecto. Por favor envie un valor numerico correcto' })
  @IsNotEmpty({ message: 'El descuento no puede estar vacío' })
  descuento: number;

  @IsBoolean({ message: 'El formato del estado es incorrectom. Por favor envíe un valor true o false' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  estado: boolean;
}
