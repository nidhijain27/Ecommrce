import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { SucessOrdersModule } from 'src/sucess_orders/sucess_orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), SucessOrdersModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
