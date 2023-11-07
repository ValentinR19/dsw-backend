import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class HabitacionRepository {
  constructor(@InjectRepository(Habitacion) private readonly repository: Repository<Habitacion>) {}

  async findById(id: number): Promise<Habitacion> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(habitacion: DeepPartial<Habitacion>): Promise<Habitacion> {
    return this.repository.save(habitacion);
  }
}
