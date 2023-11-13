import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from '@reserva-module/controllers/reserva.controller';
import { Reserva } from '@reserva-module/models/classes/reserva.entity';
import { ReservaRepository } from '@reserva-module/repositories/reserva.repository';
import { ReservaService } from '@reserva-module/services/reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservasController],
  providers: [ReservaService, ReservaRepository],
})
export class ReservaModule {}
