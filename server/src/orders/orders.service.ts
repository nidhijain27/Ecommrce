import { Injectable } from '@nestjs/common';
import { SucessOrdersService } from 'src/sucess_orders/sucess_orders.service';

import { Orders } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private readonly successOrderService: SucessOrdersService,
  ) {}

  async create(user, cart, email, price) {
    let data = JSON.parse(user);
    let result = await this.successOrderService.create(data.id, price);
    await cart.forEach((item) => {
      const order = new Orders();
      order.userId = data.id;
      order.productId = item.productId;
      order.productName = item.name;
      order.email = email;
      order.quantity = item.quantity;
      order.price = item.price;
      order.order_id = result.id;
      this.orderRepository.create(order);
    });
  }
}
