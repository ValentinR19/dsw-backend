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

  @Column('varchar', { name: 'nacionalidad', length: 30, nullable: true })
  nacionalidad: string;

  @Column('varchar', { name: 'genero', length: 100, nullable: true })
  genero: string;

  @Column('date', { name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento: string;

  @Column('varchar', { name: 'localidad', length: 100, nullable: true })
  localidad: string;

  @Column('varchar', { name: 'direccion', length: 100, nullable: true })
  direccion: String;

  @Column('int', { name: 'piso', nullable: true })
  piso: string;

  @Column('varchar', { name: 'departamento', length: 100, nullable: true })
  departamento: string;

  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  usuario: Usuario;
}
