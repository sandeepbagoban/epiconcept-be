// src/modules/users/entities/user.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';
import { Note } from '../note/note.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  // User belongs to a Tenant
  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;

  @Column()
  tenantId: string; // Foreign key to tenant

  // User has many Notes
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
