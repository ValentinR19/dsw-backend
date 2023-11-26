import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class TipoHabitacionRepository {
  constructor(@InjectRepository(TipoHabitacion) private readonly repository: Repository<TipoHabitacion>) {}

  async getAll(): Promise<TipoHabitacion[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<TipoHabitacion> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(habitacion: DeepPartial<TipoHabitacion>): Promise<TipoHabitacion> {
    return this.repository.save(habitacion);
  }
}
