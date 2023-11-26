import { Cliente } from '@cliente-module/models/classes/cliente.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, DeleteDateColumn, Entity, Index, OneToOne, PrimaryColumn } from 'typeorm';

@Index('username_UNIQUE', ['username'], { unique: true })
@Entity('usuarios', { schema: 'dsw' })
export class Usuario extends BaseEntity {
  constructor(password: string, firstName: string, lastName: string, email: string, documento: string) {
    super();
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.documento = documento;
  }

  @PrimaryColumn('varchar', { name: 'username', unique: true, length: 45 })
  username: string;

  @Column('varchar', { name: 'documento', length: 30 })
  documento: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { name: 'password', length: 300 })
  password: string;

  @Column('varchar', { name: 'first_name', length: 30 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 30 })
  lastName: string;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column({ nullable: true })
  estado: boolean;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => Cliente, (cliente) => cliente, { cascade: true })
  cliente: Cliente;
}
