import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateClienteDto extends Cliente {
  @IsNotEmpty({ message: 'El username no puede estar vacío' })
  username: string;

  @IsNotEmpty({ message: 'El documento no pueee estar vacío' })
  documento: string;
}
