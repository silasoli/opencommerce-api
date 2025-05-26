import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillingType } from '../../asaas/dto/payments/create-charge-asaas.dto';

export enum PaymentStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  CONFIRMED = 'CONFIRMED',
  SENT = 'SENT', //status interno
  OVERDUE = 'OVERDUE',
  REFUNDED = 'REFUNDED',
  RECEIVED_IN_CASH = 'RECEIVED_IN_CASH',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUND_IN_PROGRESS = 'REFUND_IN_PROGRESS',
  CHARGEBACK_REQUESTED = 'CHARGEBACK_REQUESTED',
  CHARGEBACK_DISPUTE = 'CHARGEBACK_DISPUTE',
  AWAITING_CHARGEBACK_REVERSAL = 'AWAITING_CHARGEBACK_REVERSAL',
  DUNNING_REQUESTED = 'DUNNING_REQUESTED',
  DUNNING_RECEIVED = 'DUNNING_RECEIVED',
  AWAITING_RISK_ANALYSIS = 'AWAITING_RISK_ANALYSIS',
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nuvemshop_order_id: number;

  @Column({ unique: true })
  asaas_order_id: string;

  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: BillingType,
  })
  billingType: BillingType;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  // @Column({
  //   type: 'enum',
  //   enum: OrderStatus,
  //   default: OrderStatus.PENDING,
  // })
  // orderStatus: OrderStatus;

  @Column()
  user_id: string;

  @Column('simple-array', { nullable: true, select: false })
  orderData?: string[];

  @Column('simple-array', { nullable: true, select: false })
  paymentData?: string[];

  @Column('simple-array', { nullable: true, select: false })
  shippingData?: string[];

  @Column({ nullable: true })
  canceledAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
