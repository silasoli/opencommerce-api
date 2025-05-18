import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Roles } from '../../roles/enums/role.enum';
import { Address } from './address.entity';

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

  @Column({ unique: true })
  nuvemshop_customer_id: number;

  @Column({ unique: true })
  asaas_customer_id: string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;

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
