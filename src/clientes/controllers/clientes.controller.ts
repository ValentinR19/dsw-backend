import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { ClienteService } from '@cliente-module/services/clientes.service';
import { CreateClienteDto } from '@cliente-module/models/dto/create-cliente.dto';
import { UpdateClienteDto } from '@cliente-module/models/dto/update-cliente.dto';
import { Cliente } from '@cliente-module/models/classes/cliente.entity';

@Controller()
export class ClientesController {
  constructor(private readonly clientesService: ClienteService) {}

  @Get(':documento')
  async findById(@Param('documento') documento: string): Promise<Cliente> {
    return this.clientesService.findByDocumento(documento);
  }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Put(':documento')
  update(@Param('documento') documento: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(documento, updateClienteDto);
  }
}
