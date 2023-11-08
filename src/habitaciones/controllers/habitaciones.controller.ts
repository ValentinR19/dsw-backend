import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { HabitacionService } from '@habitacion-module/services/habitacion.service';
import { CreateHabitacionDto } from '@habitacion-module/models/dto/create-habitacion.dto';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { IHabitacionFilters } from '@habitacion-module/models/interfaces/habitacion-filters.interface';

@Controller()
export class HabitacionesController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Habitacion> {
    return this.habitacionService.findById(id);
  }

  @Get()
  async getAll(@Query() filters?: IHabitacionFilters): Promise<Habitacion[]> {
    return this.habitacionService.findAll(filters);
  }

  @Post()
  async create(@Body() createHabitacioneDto: CreateHabitacionDto): Promise<Habitacion> {
    return this.habitacionService.create(createHabitacioneDto);
  }
}
