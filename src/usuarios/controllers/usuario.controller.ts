import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt-auth.guard';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuario-module/models/dtos/update-usuario.dto';

import { UsuarioService } from '@usuario-module/services/usuario.service';

@Controller()
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getByUsername(@Param('username') username: string): Promise<Usuario> {
    return this.userService.findBy({ username });
  }

  @Post()
  async create(@Body() dto: CreateUsuarioDTO): Promise<Usuario> {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  async update(@Param('username') username: string, @Body() dto: UpdateUsuarioDTO): Promise<Usuario> {
    return this.userService.update(username, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async softDelete(@Param('username') username: string): Promise<void> {
    await this.userService.softDelete(username);
  }
}
