import { Module } from '@nestjs/common';
import { HabitacionService } from './services/habitacion.service';
import { HabitacionesController } from './controller/habitaciones.controller';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHabitacionService } from '@habitacion-module/services/tipo-habitacion.service';
import { TipoHabitacionesController } from '@habitacion-module/controller/tipos-habitaciones.controller';
import { HabitacionRepository } from '@habitacion-module/repositories/habitacion.repository';
import { TipoHabitacionRepository } from '@habitacion-module/repositories/tipo-habitacion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, TipoHabitacion])],
  controllers: [HabitacionesController, TipoHabitacionesController],
  providers: [HabitacionService, HabitacionRepository, TipoHabitacionService, TipoHabitacionRepository],
})
export class HabitacionesModule {}
