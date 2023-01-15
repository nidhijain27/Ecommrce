import { Orders } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('orders', {
  orderBy: {
    created_at: 'DESC',
  },
})
export class SucessOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany((type) => Orders, (item) => item.order_id)
  items: Orders[];
}
