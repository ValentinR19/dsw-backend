import { HabitacionNotFoundException } from '@habitacion-module/exceptions/habitacion-not-found.exception';
import { HabitacionNotSavedException } from '@habitacion-module/exceptions/habitacion-not-saved.exception';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { HabitacionRepository } from '@habitacion-module/repositories/habitacion.repository';
import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { CreateHabitacionDto } from '@habitacion-module/models/dto/create-habitacion.dto';
import { IHabitacionFilters } from '@habitacion-module/models/interfaces/habitacion-filters.interface';
import e from 'express';

@Injectable()
export class HabitacionService {
  private logger = new Logger(HabitacionService.name);

  constructor(private readonly habitacionRepository: HabitacionRepository) {}

  async findAll(filters?: IHabitacionFilters): Promise<Habitacion[]> {
    this.logger.log(`Comienza la busqueda de habitaciones con los siguientes filtros: ${JSON.stringify(filters)}`);
    const habitaciones = await this.habitacionRepository.findAll(filters);
    this.logger.log(`Se completa busqueda de habitaciones con los siguientes filtros: ${JSON.stringify(filters)}`);
    return habitaciones;
  }

  async create(createHabitacionDto: CreateHabitacionDto): Promise<Habitacion> {
    this.logger.log(`Comienza la creacion de una habitacion con la siguiente informacion: ${JSON.stringify(createHabitacionDto)}`);
    return this.save(createHabitacionDto);
  }

  async save(habitacion: DeepPartial<Habitacion>): Promise<Habitacion> {
    try {
      this.logger.log(`Comienza el guardado de una habitacion con la siguiente informacion: ${JSON.stringify(habitacion)}`);
      const savedHabitacion = await this.habitacionRepository.create(habitacion);
      this.logger.log(`Se completa el guardado de una habitacion con la siguiente informacion: ${JSON.stringify(savedHabitacion)}`);
      return savedHabitacion;
    } catch (error) {
      throw new HabitacionNotSavedException(error);
    }
  }

  async findById(id: number) {
    try {
      this.logger.log(`Comienza la busqueda de una habitacion con el siguiente id: ${id}`);
      const habitacion = await this.habitacionRepository.findById(id);
      this.logger.log(`Se completa la busqueda de una habitacion con el siguiente id: ${id}`);
      return habitacion;
    } catch (error) {
      throw new HabitacionNotFoundException();
    }
  }
}
