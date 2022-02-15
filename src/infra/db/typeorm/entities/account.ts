import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountModel } from '@/domain';

import { Role } from './roles';

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

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @OneToMany(() => Role, role => role.account, { eager: true })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  public getAccountModel(): AccountModel {
    const roles: string[] = this.roles.map(role => role.description);

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      roles,
      refreshToken: this.refreshToken,
    };
  }
}
