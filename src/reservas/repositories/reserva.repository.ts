import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from '@reserva-module/models/classes/reserva.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ReservaRepository {
  constructor(@InjectRepository(Reserva) private readonly repository: Repository<Reserva>) {}

  async create(reserva: DeepPartial<Reserva>): Promise<Reserva> {
    return this.repository.save(reserva);
  }

  async findByHabitacionAndFecha(idHabitacion: number, fechaEntrada: string, fechaSalida: string): Promise<Reserva> {
    const query = this.repository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.habitacion', 'habitacion')
      .andWhere('habitacion.id = :idHabitacion', { idHabitacion })
      .andWhere(':fechaSalida >= reserva.fechaEntrada AND :fechaEntrada <= reserva.fechaSalida', {
        fechaEntrada,
        fechaSalida,
      })
      .getOneOrFail();

    return query;
  }

  async findByDocumentoCliente(documento: string): Promise<Reserva[]> {
    return this.repository.find({ where: { documentoCliente: documento } });
  }
}
