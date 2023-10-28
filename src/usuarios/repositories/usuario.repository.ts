import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(@InjectRepository(Usuario) private readonly repository: Repository<Usuario>) {}

  async findByUsername(username: string): Promise<Usuario> {
    return this.repository.findOneOrFail({ where: { username } });
  }

  async findBy(filters: DeepPartial<Usuario>): Promise<Usuario> {
    const query = this.repository.createQueryBuilder('user').where('user.deletedAt IS NULL');

    filters?.username && query.andWhere('user.username = :username', { username: filters.username });
    filters?.firstName && query.andWhere('user.firstName = :firstName', { firstName: filters.firstName });
    filters?.lastName && query.andWhere('user.lastName = :lastName', { lastName: filters.lastName });
    filters?.email && query.andWhere('user.email = :email', { email: filters.email });

    return query.getOneOrFail();
  }

  async create(usuario: DeepPartial<Usuario>): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async softDelete(username: string): Promise<void> {
    await this.repository.softDelete({ username });
  }
}
