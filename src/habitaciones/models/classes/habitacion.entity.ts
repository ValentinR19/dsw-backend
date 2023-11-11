import { TipoHabitacion } from '@habitacion-module/models/classes/tipo-habitacion.entity';
import { Reserva } from 'src/reservas/models/classes/reserva.entity';
import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('habitaciones', { schema: 'dsw' })
export class Habitacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'id_tipo_habitacion' })
  idTipoHabitacion: number;

  @Column('boolean', { name: 'estado' })
  estado: boolean;

  @Column('varchar', { name: 'caracteristicas', length: 300 })
  caracteristicas: string;

  @Column('int', { name: 'capacidad_personas' })
  capacidadPersonas: number;

  @Column('float', { name: 'precio' })
  precio: number;

  @Column('float', { name: 'descuento' })
  descuento: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => TipoHabitacion, (tipoHabitacion) => tipoHabitacion)
  tipoHabitacion: TipoHabitacion;

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  reservas: Reserva[];
}
