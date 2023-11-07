import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_habitaciones', { schema: 'dsw' })
export class TipoHabitacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'nombre', length: 300 })
  nombre: string;

  @Column('varchar', { name: 'descripcion', length: 500 })
  descripcion: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Habitacion, (habitacion) => habitacion, { nullable: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  habitaciones: Habitacion[];
}
