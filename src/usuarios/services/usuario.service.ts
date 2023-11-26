import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioRepository } from '@usuario-module/repositories/usuario.repository';
import { UsuarioNotFoundException } from '@usuario-module/exceptions/usuario-not-found.exception';
import { UsuarioNotSavedException } from '@usuario-module/exceptions/usuario-not-saved.exception';
import { DeepPartial } from 'typeorm';
import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { hash } from 'bcrypt';
import { UpdateUsuarioDTO } from '@usuario-module/models/dtos/update-usuario.dto';
import { ClienteService } from '@cliente-module/services/clientes.service';
import { CreateClienteDto } from '@cliente-module/models/dto/create-cliente.dto';

@Injectable()
export class UsuarioService {
  private logger = new Logger(UsuarioService.name);

  constructor(
    private readonly userRepository: UsuarioRepository,
    private readonly clienteService: ClienteService,
  ) {}

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
    dto.password = await hash(dto.password, 10);
    const dtoCliente = new CreateClienteDto();
    dtoCliente.documento = dto.documento;
    dtoCliente.username = dto.username;
    const user = await this.save(dto);
    await this.clienteService.create(dtoCliente);

    return user;
  }

  async update(username: string, dto: UpdateUsuarioDTO): Promise<Usuario> {
    const user = await this.findBy({ username });
    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.email = dto.email || user.email;

    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }

    this.logger.log(`Inicia la actualizacion del usuario con username ${username}. Informacion a actualizar: ${JSON.stringify(dto)}`);

    return this.save(user);
  }

  async softDelete(username: string): Promise<void> {
    try {
      this.logger.log(`Se inicia el softdelete del usuario con username:  ${username}`);
      await this.userRepository.softDelete(username);
      this.logger.log(`Softdelete del usuario con username ${username} realizado con exito`);
    } catch (error) {
      throw new UsuarioNotSavedException(error);
    }
  }

  private async save(user: DeepPartial<Usuario>): Promise<Usuario> {
    try {
      this.logger.log(`Se inicia el guardado de un usuario con la siguiente informacion: ${user}`);
      const usuario = await this.userRepository.create(user);
      this.logger.log(`El guardado del usuario ha sido exitoso. username: ${usuario.username}`);

      return usuario;
    } catch (error) {
      throw new UsuarioNotSavedException(error);
    }
  }
}
