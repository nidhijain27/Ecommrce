import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  mediaUrl: string;

  // @OneToOne(() => ProductCategory, (ProductCategory) => ProductCategory.id, {
  //   cascade: true,
  // })
  // @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  // category_id: number;
}
