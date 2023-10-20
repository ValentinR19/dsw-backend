import { Exclude } from 'class-transformer';
import { BaseEntity, Column, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('username_UNIQUE', ['username'], { unique: true })
@Entity('usuarios', { schema: 'dsw' })
export class Usuario extends BaseEntity {
  constructor(username: string, password: string, firstName: string, lastName: string, email: string) {
    super();
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
  @PrimaryGeneratedColumn({})
  id: number;

  @Column('varchar', { name: 'username', unique: true, length: 45 })
  username: string;

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
}
