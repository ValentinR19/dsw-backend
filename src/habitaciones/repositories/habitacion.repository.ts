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
    const query = this.repository.createQueryBuilder('habitacion').where('habitacion.estado = :estado', { estado: true }).andWhere('habitacion.deletedAt IS NULL');
    query.leftJoin('habitacion.tipoHabitacion', 'tipoHabitacion');
    query.leftJoinAndSelect('habitacion.reserva', 'reserva');

    filters?.capacidadPersonas && query.andWhere('habitacion.capacidadPersonas >= :capacidadPersonas', { capacidadPersonas: filters.capacidadPersonas });
    filters?.startDate && query.andWhere('DATE(reserva.fechaEntrada) <= :startDate', { startDate: dayjs(filters.startDate).format('YYYY-MM-DD') });
    filters?.endDate && query.andWhere('DATE(reserva.fechaSalida) >= :endDate', { endDate: dayjs(filters.endDate).format('YYYY-MM-DD') });

    filters?.idTipoHabitacion && query.andWhere('habitacion.idTipoHabitacion = :idTipoHabitacion', { idTipoHabitacion: filters.idTipoHabitacion });

    return query.getMany();
  }

  async findById(id: number): Promise<Habitacion> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(habitacion: DeepPartial<Habitacion>): Promise<Habitacion> {
    return this.repository.save(habitacion);
  }
}
