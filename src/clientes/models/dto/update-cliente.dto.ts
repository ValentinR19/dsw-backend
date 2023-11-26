import { CreateClienteDto } from '@cliente-module/models/dto/create-cliente.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
