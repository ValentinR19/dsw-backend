import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { IsOptional } from 'class-validator';

export class UpdateClienteDto extends Cliente {
  @IsOptional()
  domicilio: string;

  @IsOptional()
  genero: string;

  @IsOptional()
  nacionalidad: string;

  @IsOptional()
  telefono: string;
}
