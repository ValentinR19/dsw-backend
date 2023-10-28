import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDTO extends Usuario {
  @MaxLength(45, { message: 'El nombre de usuario es demasiado largo' })
  @MinLength(4, { message: 'La cantidad minima de caracteres para el nombre de usuario no debe ser menor a 4' })
  @IsString({ message: 'El formato del nombre de usuario es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  username: string;

  @MaxLength(100, { message: 'La clave es demasiado larga' })
  @MinLength(8, { message: 'La cantidad minima de caracteres para la clave no debe ser menor a $constraint1' })
  @IsString({ message: 'El formato de la clave es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'La clave no puede estar vacia' })
  password: string;

  @MaxLength(30, { message: 'El nombre es demasiado largo' })
  @IsString({ message: 'El formato del nombre es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  firstName: string;

  @MaxLength(30, { message: 'El apellido es demasiado largo' })
  @IsString({ message: 'El formato del apellido es incorrecto. Por favor envie una cadena de caracteres valida' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
  lastName: string;

  @MaxLength(100, { message: `La longitud del email no puede ser mayor a $constraint1 caracteres` })
  @IsEmail(undefined, { message: `El formato del email es incorrecto` })
  @IsNotEmpty({ message: 'El email no puede estar vacio' })
  email: string;

  @IsNotEmpty({ message: 'El documento no puede estar vacío' })
  documento: string;
}
