import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
  ) {}

  async create(order) {
    return await this.orderRepository.save(order);
  }

  async findAll(user) {
    return await this.orderRepository
      .createQueryBuilder()
      .where(`userId = ${user.id}`)
      .groupBy('created_at')
      .getRawMany();
  }
}
