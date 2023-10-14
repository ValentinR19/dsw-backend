import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuario-module/models/dtos/update-usuario.dto';

import { UsuarioService } from '@usuario-module/services/usuario.service';

@Controller('users')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.userService.findBy({ id });
  }

  @Post()
  async create(@Body() dto: CreateUsuarioDTO): Promise<Usuario> {
    return this.userService.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDTO): Promise<Usuario> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.softDelete(id);
  }
}
