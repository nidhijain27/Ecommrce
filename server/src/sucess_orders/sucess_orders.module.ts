import { Module } from '@nestjs/common';
import { SucessOrdersService } from './sucess_orders.service';
import { SucessOrdersController } from './sucess_orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucessOrder } from './entities/sucess_order.entity';
import { SuccessOrderRepository } from './success_order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SucessOrder])],
  controllers: [SucessOrdersController],
  providers: [SucessOrdersService, SuccessOrderRepository],
  exports: [SucessOrdersService],
})
export class SucessOrdersModule {}
