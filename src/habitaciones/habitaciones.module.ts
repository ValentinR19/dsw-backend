import { Module } from '@nestjs/common';
import { HabitacionService } from './services/habitacion.service';
import { HabitacionesController } from './controller/habitaciones.controller';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, TipoHabitacion])],
  controllers: [HabitacionesController],
  providers: [HabitacionService],
})
export class HabitacionesModule {}
