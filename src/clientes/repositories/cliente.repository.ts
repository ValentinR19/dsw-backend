import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

export class ClienteRepository {

  constructor(@InjectRepository(Cliente) private readonly repository: Repository<Cliente>) {}

  async create(usuario: DeepPartial<Cliente>): Promise<Cliente> {
    return this.repository.save(usuario);
  }

  async findByDocumento(documento: string): Promise<Cliente> {
    return this.repository.findOneOrFail({ where: { documento } });
  }
}
