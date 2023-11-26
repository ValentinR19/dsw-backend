import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTipoHabitacionDto extends TipoHabitacion {
  @IsString({ message: 'El formato del nombre es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'El nombre  no puede estar vacio' })
  @MaxLength(300, { message: 'El nombre  es demasiado largo' })
  nombre: string;

  @IsString({ message: 'El formato de la descripcion es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'La descripcion no puede estar vacia' })
  @MaxLength(500, { message: 'La descripcion es demasiado larga' })
  descripcion: string;
}
