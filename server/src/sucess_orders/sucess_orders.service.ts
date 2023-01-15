import { Injectable } from '@nestjs/common';
import { SucessOrder } from './entities/sucess_order.entity';
import { SuccessOrderRepository } from './success_order.repository';

@Injectable()
export class SucessOrdersService {
  constructor(private successRepository: SuccessOrderRepository) {}

  async create(userId, totalPrice) {
    const order = new SucessOrder();
    order.userId = userId;
    order.total_price = totalPrice;
    return this.successRepository.create(order);
  }

  async findAll(req) {
    let data = JSON.parse(req.headers.user);
    return await this.successRepository.getOrders(data.id);
  }
}
