import { SucessOrder } from 'src/sucess_orders/entities/sucess_order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('orders_item')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  email: string;

  @Column()
  price: number;

  @Column()
  productName: String;

  @ManyToOne((type) => SucessOrder)
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @CreateDateColumn()
  created_at: Date;
}
