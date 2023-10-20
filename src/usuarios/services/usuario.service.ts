import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioRepository } from '@usuario-module/repositories/usuario.repository';
import { UsuarioNotFoundException } from '@usuario-module/exceptions/usuario-not-found.exception';
import { UsuarioNotSavedException } from '@usuario-module/exceptions/usuario-not-saved.exception';
import { DeepPartial } from 'typeorm';
import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { hash } from 'bcrypt';
import { UpdateUsuarioDTO } from '@usuario-module/models/dtos/update-usuario.dto';

@Injectable()
export class UsuarioService {
  private logger = new Logger(UsuarioService.name);
  constructor(private readonly userRepository: UsuarioRepository) {}

  async findBy(filters: DeepPartial<Usuario>): Promise<Usuario> {
    try {
      const user = await this.userRepository.findBy(filters);
      return user;
    } catch (error) {
      throw new UsuarioNotFoundException();
    }
  }

  async create(dto: CreateUsuarioDTO): Promise<Usuario> {
    this.logger.log(`Inicia la creacion de un usuario con la siguiente informacion: ${JSON.stringify(dto)}`);
    // const user = await this.userRepository.findBy({ username: dto.username });
    // if (user) throw new Error('El usuario ya existe en la BD');

    dto.password = await hash(dto.password, 10);
    return this.save(dto);
  }

  async update(id: number, dto: UpdateUsuarioDTO): Promise<Usuario> {
    const user = await this.findBy({ id });
    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.email = dto.email || user.email;

    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }

    this.logger.log(`Inicia la actualizacion del usuario con ID ${id}. Informacion a actualizar: ${JSON.stringify(dto)}`);

    return this.save(user);
  }

  async softDelete(id: number): Promise<void> {
    try {
      this.logger.log(`Se inicia el softdelete del usuario con ID ${id}`);
      await this.userRepository.softDelete(id);
      this.logger.log(`Softdelete del usuario con ID ${id} realizado con exito`);
    } catch (error) {
      throw new UsuarioNotSavedException(error);
    }
  }

  private async save(user: DeepPartial<Usuario>): Promise<Usuario> {
    try {
      this.logger.log(`Se inicia el guardado de un usuario con la siguiente informacion: ${user}`);
      const usuario = await this.userRepository.create(user);
      this.logger.log(`El guardado del usuario ha sido exitoso. ID: ${usuario.id}`);

      return usuario;
    } catch (error) {
      throw new UsuarioNotSavedException(error);
    }
  }
}
