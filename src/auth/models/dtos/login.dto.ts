import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDTO {
  @MaxLength(45, { message: 'El nombre de usuario es demasiado largo' })
  @IsString({ message: 'El formato del nombre de usuario es incorrecto' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  username: string;

  @MaxLength(45, { message: 'La clave es demasiado larga' })
  @IsString({ message: 'El formato de la clave es incorrecta' })
  @IsNotEmpty({ message: 'La clave no puede estar vacia' })
  password: string;
}
