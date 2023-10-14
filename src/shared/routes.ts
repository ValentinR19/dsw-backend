import { Routes } from '@nestjs/core';
import { UsuarioModule } from '@usuario-module/usuario.module';
import { AuthModule } from '@auth-module/auth.module';

export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'usuario',
    module: UsuarioModule,
  },
];
