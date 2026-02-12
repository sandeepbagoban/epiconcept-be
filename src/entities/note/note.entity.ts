// src/modules/notes/entities/note.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Tenant } from '../tenant/tenant.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  // Note belongs to a User
  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column()
  userId: string; // Foreign key to user

  // ADD THIS: Direct tenant reference for easier querying
  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column()
  tenantId: string; // Foreign key to tenant

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
