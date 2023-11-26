import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';

export class UpdateUsuarioDTO extends PartialType(CreateUsuarioDTO) {
  @IsEmpty({ message: 'No puede modificar el nombre de usuario' })
  username?: string;
}
