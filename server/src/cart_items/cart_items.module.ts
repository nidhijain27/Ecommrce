import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { CartRepository } from './cart.repository';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), OrdersModule],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartRepository],
})
export class CartItemsModule {}
