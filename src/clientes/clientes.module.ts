import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ClienteService } from '@cliente-module/services/clientes.service';
import { ClienteRepository } from '@cliente-module/repositories/cliente.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '@cliente-module/models/classes/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClienteService, ClienteRepository],
  exports: [ClienteService, ClienteRepository],
})
export class ClientesModule {}
