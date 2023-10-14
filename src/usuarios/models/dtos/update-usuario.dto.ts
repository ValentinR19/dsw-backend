import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUsuarioDTO extends PartialType(CreateUsuarioDTO) {}
