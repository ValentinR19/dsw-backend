import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { IHabitacionFilters } from '@habitacion-module/models/interfaces/habitacion-filters.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class HabitacionRepository {
  constructor(@InjectRepository(Habitacion) private readonly repository: Repository<Habitacion>) {}

  async findAll(filters?: IHabitacionFilters): Promise<Habitacion[]> {
    const query = this.repository.createQueryBuilder('habitacion').andWhere('habitacion.deletedAt IS NULL');
    query.leftJoin('habitacion.reserva', 'reserva');
    query.leftJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion');

    filters?.capacidadPersonas && query.andWhere('habitacion.capacidadPersonas >= :capacidadPersonas', { capacidadPersonas: filters.capacidadPersonas });
    filters?.idTipoHabitacion && query.andWhere('habitacion.idTipoHabitacion = :idTipoHabitacion', { idTipoHabitacion: filters.idTipoHabitacion });

    filters?.fechaEntrada &&
      filters.fechaSalida &&
      query.andWhere(
        ':fechaEntrada NOT BETWEEN DATE(reserva.fechaEntrada) AND DATE(reserva.fechaSalida)' +
          ':fechaSalida NOT BETWEEN DATE(reserva.fechaEntrada) AND DATE(reserva.fechaSalida)' +
          'reserva.id IS NULL',
        { fechaEntrada: dayjs(filters.fechaEntrada).format('YYYY-MM-DD'), fechaSalida: dayjs(filters.fechaSalida).format('YYYY-MM-DD') },
      );
    return query.getMany();
  }

  async findById(id: number): Promise<Habitacion> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(habitacion: DeepPartial<Habitacion>): Promise<Habitacion> {
    return this.repository.save(habitacion);
  }
}
