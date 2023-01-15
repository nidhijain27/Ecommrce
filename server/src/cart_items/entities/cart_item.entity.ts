import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  productName: String;

  @Column({ default: 1 })
  quantity: number;
}
