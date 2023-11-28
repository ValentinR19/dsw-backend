import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { routes } from '@shared-module/routes';
import { AuthModule } from '@auth-module/auth.module';
import { UsuarioModule } from '@usuario-module/usuario.module';
import { SharedModule } from '@shared-module/shared.module';
import { ClientesModule } from './clientes/clientes.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { ReservaModule } from '@reserva-module/reservas.module';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        TOKEN_EXPIRATION: Joi.string().required(),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),

        JWT_SECRET_KEY: Joi.string().required(),

        ORIGIN: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'dsw',
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
      synchronize: true,
      extra: {
        timezone: 'local',
        insecureAuth: true,
      },
    }),
    AuthModule,
    SharedModule,
    UsuarioModule,
    ClientesModule,
    HabitacionesModule,
    ReservaModule,
  ],
})
export class AppModule {}
