import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'CONSUMER' })
  role: userRoles;

  @Column({ default: 0 })
  balance: number;
}

export enum userRoles {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  CONSUMER = 'CONSUMER',
}
