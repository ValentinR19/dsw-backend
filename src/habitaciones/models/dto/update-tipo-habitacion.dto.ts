import { CreateTipoHabitacionDto } from '@habitacion-module/models/dto/create-tipo-habitacion.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTipoHabitacionDTO extends PartialType(CreateTipoHabitacionDto) {}
