import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { SucessOrder } from './entities/sucess_order.entity';

@Injectable()
export class SuccessOrderRepository {
  constructor(
    @InjectRepository(SucessOrder)
    private successOrderRepository: Repository<SucessOrder>,
  ) {}

  async create(order) {
    return await this.successOrderRepository.save(order);
  }

  async getOrders(userId): Promise<SucessOrder[]> {
    const orders = await this.successOrderRepository.find({
      relations: ['items'],
    });

    return orders.filter((order) => order.userId === userId);
  }
}
