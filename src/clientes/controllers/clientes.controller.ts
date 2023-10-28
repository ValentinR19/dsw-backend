import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { ClienteService } from '@cliente-module/services/clientes.service';
import { CreateClienteDto } from '@cliente-module/models/dto/create-cliente.dto';
import { UpdateClienteDto } from '@cliente-module/models/dto/update-cliente.dto';

@Controller()
export class ClientesController {
  constructor(private readonly clientesService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Put(':documento')
  update(@Param('documento') documento: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(documento, updateClienteDto);
  }
}
