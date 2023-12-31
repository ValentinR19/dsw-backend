import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { CreateTipoHabitacionDto } from '@habitacion-module/models/dto/create-tipo-habitacion.dto';
import { TipoHabitacionService } from '@habitacion-module/services/tipo-habitacion.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Res, Req } from '@nestjs/common';

@Controller('tipo')
export class TipoHabitacionesController {
  constructor(private readonly tipoHabitacionService: TipoHabitacionService) {}

  @Get('getTiposHabitacion')
  getAll(): Promise<TipoHabitacion[]> {
    return this.tipoHabitacionService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoHabitacion> {
    return this.tipoHabitacionService.findById(id);
  }

  @Post()
  create(@Body() createTipoHabitacioneDto: CreateTipoHabitacionDto): Promise<TipoHabitacion> {
    return this.tipoHabitacionService.create(createTipoHabitacioneDto);
  }
}
