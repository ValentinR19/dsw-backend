import { Injectable, Logger } from '@nestjs/common';
import { CreateClienteDto } from '@cliente-module/models/dto/create-cliente.dto';
import { UpdateClienteDto } from '@cliente-module/models/dto/update-cliente.dto';
import { ClienteRepository } from '@cliente-module/repositories/cliente.repository';
import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { DeepPartial, DeleteDateColumn } from 'typeorm';
import { ClienteNotSavedException } from '@cliente-module/exceptions/cliente-not-saved.exception';
import { ClienteNotFoundException } from '@cliente-module/exceptions/cliente-not-found.exception';

@Injectable()
export class ClienteService {
  private logger = new Logger(ClienteService.name);
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      this.logger.log(`Inicia la creacion de un cliente con la siguiente informacion: ${JSON.stringify(createClienteDto)}`);
      return this.save(createClienteDto);
    } catch (error) {}
  }

  async update(documento: string, dto: UpdateClienteDto): Promise<Cliente> {
    await this.findByDocumento(documento);
    try {
      this.logger.log(`Se inicia la edicion del cliente con documento: ${documento}, con la siguiente informacion: ${JSON.stringify(dto)}`);
      const updatedCliente = await this.save({ documento, ...dto });
      this.logger.log(`Se completa la edicion del cliente con la siguiente informacion: ${JSON.stringify(updatedCliente)}`);

      return updatedCliente;
    } catch (error) {
      throw new ClienteNotSavedException(error);
    }
  }

  async findByDocumento(documento: string) {
    try {
      this.logger.log(`Se inicia la busqueda del cliente con documento: ${documento}`);
      const cliente = await this.clienteRepository.findByDocumento(documento);
      this.logger.log(`Se completa la busqueda del cliente con documento: ${documento}`);

      return cliente;
    } catch (error) {
      throw new ClienteNotFoundException(error);
    }
  }

  async findByUsuario(documento: string) {
    try {
      this.logger.log(`Se inicia la busqueda del cliente con documento: ${documento}`);
      const cliente = await this.clienteRepository.findByDocumento(documento);
      this.logger.log(`Se completa la busqueda del cliente con documento: ${documento}`);

      return cliente;
    } catch (error) {
      throw new ClienteNotFoundException(error);
    }
  }

  private async save(cliente: DeepPartial<Cliente>): Promise<Cliente> {
    try {
      this.logger.log(`Se inicia el guardado de un cliente con la siguiente informacion: ${cliente}`);
      const savedCliente = await this.clienteRepository.create(cliente);
      this.logger.log(`El guardado del cliente ha sido exitoso. documento: ${savedCliente.documento}`);

      return savedCliente;
    } catch (error) {
      throw new ClienteNotSavedException(error);
    }
  }
}
