import { Routes } from '@nestjs/core';
import { UsuarioModule } from '@usuario-module/usuario.module';
import { AuthModule } from '@auth-module/auth.module';
import { ClientesModule } from '@cliente-module/clientes.module';
import { HabitacionesModule } from '@habitacion-module/habitaciones.module';
import { ReservaModule } from '@reserva-module/reservas.module';

export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'usuario',
    module: UsuarioModule,
  },
  {
    path: 'cliente',
    module: ClientesModule,
  },
  {
    path: 'habitacion',
    module: HabitacionesModule,
  },
  {
    path: 'reserva',
    module: ReservaModule,
  },
];
