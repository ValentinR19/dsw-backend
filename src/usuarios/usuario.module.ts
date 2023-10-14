import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioController } from '@usuario-module/controllers/usuario.controller';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { UsuarioRepository } from '@usuario-module/repositories/usuario.repository';
import { IsUsernameAvailableConstraint } from '@usuario-module/validators/is-username-validate.validators';
import { EmailNotExistsConstraint } from '@usuario-module/validators/email-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, IsUsernameAvailableConstraint, EmailNotExistsConstraint],
  exports: [UsuarioService],
})
export class UsuarioModule {}
