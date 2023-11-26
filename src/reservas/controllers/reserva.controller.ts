import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CreateReservaDTO } from '@reserva-module/models/dto/create-reserva.dto';
import { ReservaService } from '@reserva-module/services/reserva.service';
import { Reserva } from '@reserva-module/models/classes/reserva.entity';

@Controller()
export class ReservasController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get(':documento')
  async findByDocumentoCliente(@Param('documento') documento: string): Promise<Reserva[]> {
    return this.reservaService.findByDocumentoCliente(documento);
  }

  @Post()
  async create(@Body() createReservaDTO: CreateReservaDTO): Promise<Reserva> {
    return this.reservaService.create(createReservaDTO);
  }
}
