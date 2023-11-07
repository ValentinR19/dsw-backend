import { TipoHabitacionNotFoundException } from '@habitacion-module/exceptions/tipo-habitacion-not-found.exception';
import { TipoHabitacionNotSavedException } from '@habitacion-module/exceptions/tipo-habitacion-not-saved.exception';
import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { CreateTipoHabitacionDto } from '@habitacion-module/models/dto/create-tipo-habitacion.dto';
import { TipoHabitacionRepository } from '@habitacion-module/repositories/tipo-habitacion.repository';
import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

@Injectable()
export class TipoHabitacionService {
  private logger = new Logger(TipoHabitacionService.name);

  constructor(private readonly tipohabitacionRepository: TipoHabitacionRepository) {}

  async create(createHabitacionDto: CreateTipoHabitacionDto): Promise<TipoHabitacion> {
    this.logger.log(`Comienza la creacion de un tipo de habitacion con la siguiente informacion: ${JSON.stringify(createHabitacionDto)}`);
    return this.save(createHabitacionDto);
  }

  async save(habitacion: DeepPartial<TipoHabitacion>): Promise<TipoHabitacion> {
    try {
      this.logger.log(`Comienza el guardado de un tipo de habitacion con la siguiente informacion: ${JSON.stringify(habitacion)}`);
      const savedHabitacion = await this.tipohabitacionRepository.create(habitacion);
      this.logger.log(`Se completa el guardado de un tipo de habitacion con la siguiente informacion: ${JSON.stringify(savedHabitacion)}`);
      return savedHabitacion;
    } catch (error) {
      throw new TipoHabitacionNotSavedException(error);
    }
  }

  async findById(id: number) {
    try {
      this.logger.log(`Comienza la busqueda de un tipo de habitacion con el siguiente id: ${id}`);
      const habitacion = await this.tipohabitacionRepository.findById(id);
      this.logger.log(`Se completa la busqueda de un tipo de habitacion con el siguiente id: ${id}`);
      return habitacion;
    } catch (error) {
      throw new TipoHabitacionNotFoundException();
    }
  }
}
