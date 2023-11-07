import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HabitacionService } from '@habitacion-module/services/habitacion.service';
import { CreateHabitacionDto } from '@habitacion-module/models/dto/create-habitacion.dto';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';

@Controller()
export class HabitacionesController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Post()
  async create(@Body() createHabitacioneDto: CreateHabitacionDto): Promise<Habitacion> {
    return this.habitacionService.create(createHabitacioneDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Habitacion> {
    return this.habitacionService.findById(id);
  }
}
