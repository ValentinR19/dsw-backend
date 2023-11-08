import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Index('documento_UNIQUE', ['documento'], { unique: true })
@Entity('clientes', { schema: 'dsw' })
export class Cliente {
  @PrimaryColumn('varchar', { name: 'documento', unique: true, length: 45, nullable: false })
  documento: string;

  @Column('string', { name: 'username', nullable: false })
  username: string;

  @Column('varchar', { name: 'telefono', nullable: true })
  telefono: string;

  @Column('varchar', { name: 'domicilio', length: 250, nullable: true })
  domicilio: string;

  @Column('varchar', { name: 'nacionalidad', length: 30, nullable: true })
  nacionalidad: string;

  @Column('varchar', { name: 'genero', length: 100, nullable: true })
  genero: string;

  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  usuario: Usuario;
}
