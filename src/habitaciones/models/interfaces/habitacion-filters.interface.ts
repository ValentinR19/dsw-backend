import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';

export interface IHabitacionFilters extends Partial<Habitacion> {
  fechaEntrada?: Date;
  fechaSalida?: Date;
}
