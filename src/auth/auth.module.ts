import { Module } from '@nestjs/common';
import { AuthService } from '@auth-module/services/auth.service';
import { UsuarioModule } from '@usuario-module/usuario.module';
import { AuthController } from '@auth-module/controllers/auth.controller';

@Module({
  imports: [UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
