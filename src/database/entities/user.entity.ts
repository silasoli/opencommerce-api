import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../../roles/enums/role.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'simple-array',
    default: Roles.USER,
  })
  roles: Roles[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @BeforeInsert()
  // @BeforeUpdate()
  // normalizeFields() {
  //   if (this.username) {
  //     this.username = this.username.toLowerCase();
  //   }
  //   if (this.email) {
  //     this.email = this.email.toLowerCase();
  //   }
  // }
}
