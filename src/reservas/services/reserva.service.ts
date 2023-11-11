import { Injectable, Logger } from '@nestjs/common';
import { ReservaNotFoundException } from '@reserva-module/exceptions/reserva-not-found.exception';
import { ReservaNotSavedException } from '@reserva-module/exceptions/reserva-not-saved.exception';
import { ReservaUnvalibleException } from '@reserva-module/exceptions/reserva-unvalible.exception';
import { Reserva } from '@reserva-module/models/classes/reserva.entity';
import { CreateReservaDTO } from '@reserva-module/models/dto/create-reserva.dto';
import { ReservaRepository } from '@reserva-module/repositories/reserva.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ReservaService {
  private logger = new Logger(ReservaService.name);

  constructor(private readonly reservaRepository: ReservaRepository) {}

  async create(dto: CreateReservaDTO): Promise<Reserva> {
    try {
      this.logger.log(`Comienza la busqueda de una reserva para guardar la siguiene informacion: ${JSON.stringify(dto)}`);
      await this.findByHabitacionAndFecha(dto);
      throw new ReservaUnvalibleException();
    } catch (error) {
      if (error instanceof ReservaNotFoundException) {
        const savedReserva = await this.save(dto);
        this.logger.log(`Se completa la creacion de una reserva con la siguiente informacion: ${JSON.stringify(dto)}`);
        return savedReserva;
      }
      throw new ReservaNotSavedException(error);
    }
  }

  private async save(reserva: DeepPartial<Reserva>): Promise<Reserva> {
    try {
      this.logger.log(`Comienza el guardado de una reserva con la siguiente informacion: ${JSON.stringify(reserva)}`);
      const savedReserva = await this.reservaRepository.create(reserva);
      this.logger.log(`Se completa el guardado de una reserva con la siguiente informacion: ${JSON.stringify(reserva)}`);
      return savedReserva;
    } catch (error) {
      throw new ReservaNotSavedException(error);
    }
  }

  async findByHabitacionAndFecha(dto: CreateReservaDTO): Promise<Reserva> {
    try {
      this.logger.log(`Comienza la busqueda de una reserva para la habitacion con id: ${dto.id} en los rangos de fecha de: ${dto.fechaEntrada}, hasta: ${dto.fechaSalida}`);
      const reserva = await this.reservaRepository.findByHabitacionAndFecha(dto.idHabitacion, dto.fechaEntrada, dto.fechaSalida);
      this.logger.log(`Se completa la busqueda de una reserva para la habitacion con id: ${dto.id} en los rangos de fecha de: ${dto.fechaEntrada}, hasta: ${dto.fechaSalida}`);
      return reserva;
    } catch (error) {
      throw new ReservaNotFoundException();
    }
  }

  async findByDocumentoCliente(documento: string): Promise<Reserva[]> {
    return this.reservaRepository.findByDocumentoCliente(documento);
  }
}
