import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitacionDto } from './create-habitacion.dto';

export class UpdateHabitacioneDto extends PartialType(CreateHabitacionDto) {}
