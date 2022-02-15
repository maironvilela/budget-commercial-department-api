import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountModel } from '@/domain';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roles: string[];

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  created_at: Date;

  public map(): AccountModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      roles: this.roles,
      refreshToken: this.refreshToken,
    };
  }
}
