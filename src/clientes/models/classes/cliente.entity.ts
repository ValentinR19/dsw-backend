import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Index('documento_UNIQUE', ['documento'], { unique: true })
@Entity('clientes', { schema: 'dsw' })
export class Cliente {
  @PrimaryColumn('varchar', { name: 'documento', unique: true, length: 45 })
  documento: string;

  @Column('int', { name: 'username' })
  username: string;

  @Column('varchar', { name: 'telefono' })
  telefono: string;

  @Column('varchar', { name: 'domicilio', length: 250 })
  domicilio: string;

  @Column('varchar', { name: 'nacionalidad', length: 30 })
  nacionalidad: string;

  @Column('varchar', { name: 'genero', length: 100 })
  genero: string;

  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  usuario: Usuario;
}
