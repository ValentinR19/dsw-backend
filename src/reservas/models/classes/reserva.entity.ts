import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { Habitacion } from '@habitacion-module/models/classes/habitacion.entity';
import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservas', { schema: 'dsw' })
export class Reserva extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'id_habitacion' })
  idHabitacion: number;

  @Column('varchar', { name: 'documento_cliente', nullable: false })
  documentoCliente: string;

  @Column('date', { name: 'fecha_entrada' })
  fechaEntrada: string;

  @Column('date', { name: 'fecha_salida' })
  fechaSalida: string;

  @Column('boolean', { name: 'pagada' })
  pagada: boolean;

  @Column('int', { name: 'cantidad_personas' })
  cantidadPersonas: number;

  @Column('float', { name: 'precio_final' })
  precioFinal: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion)
  @JoinColumn({ name: 'id_habitacion', referencedColumnName: 'id' })
  habitacion: Habitacion;

  @ManyToOne(() => Cliente, (cliente) => cliente)
  @JoinColumn({ name: 'documento_cliente', referencedColumnName: 'documento' })
  cliente: Cliente;
}
