import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { IHabitacionFilters } from '@habitacion-module/models/interfaces/habitacion-filters.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class HabitacionRepository {
  constructor(@InjectRepository(Habitacion) private readonly repository: Repository<Habitacion>) {}

  async findAll(filters?: IHabitacionFilters): Promise<Habitacion[]> {
    const query = this.repository
      .createQueryBuilder('habitacion')
      .leftJoinAndSelect('habitacion.reservas', 'reserva')
      .leftJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion')
      .andWhere('habitacion.deletedAt IS NULL');

    filters?.capacidadPersonas && query.andWhere('habitacion.capacidadPersonas >= :capacidadPersonas', { capacidadPersonas: filters.capacidadPersonas });

    filters?.idTipoHabitacion && query.andWhere('habitacion.idTipoHabitacion = :idTipoHabitacion', { idTipoHabitacion: filters.idTipoHabitacion });

    if (filters?.fechaEntrada && filters.fechaSalida) {
      const subquery = this.repository
        .createQueryBuilder('subquery')
        .select('reserva.idHabitacion')
        .from('reservas', 'reserva')
        .where(':fechaSalida >= reserva.fechaEntrada AND :fechaEntrada <= reserva.fechaSalida', {
          fechaEntrada: filters.fechaEntrada,
          fechaSalida: filters.fechaSalida,
        });

      query.andWhere(`habitacion.id NOT IN (${subquery.getQuery()})`, {
        fechaEntrada: filters.fechaEntrada,
        fechaSalida: filters.fechaSalida,
      });
    }

    return query.getMany();
  }

  async findById(id: number): Promise<Habitacion> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(habitacion: DeepPartial<Habitacion>): Promise<Habitacion> {
    return this.repository.save(habitacion);
  }
}
