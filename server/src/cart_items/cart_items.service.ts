import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseUtils } from 'src/response.utils';
import { CartRepository } from './cart.repository';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class CartItemsService {
  constructor(
    private cartRepository: CartRepository,

    @InjectStripe() private readonly stripe: Stripe,
    private readonly ordersService: OrdersService,
  ) {}

  async findAll(user) {
    let data = await this.cartRepository.findAll(user);
    return ResponseUtils.success(data, 'Success');
  }

  async update(req: any) {
    let data = JSON.parse(req.headers.user);

    const cart = await this.cartRepository.findOne(data, req.body);
    if (cart) {
      await this.cartRepository.update(data, req.body);
    } else {
      await this.cartRepository.create(data, req.body);
    }
    return ResponseUtils.success('Product Added to Cart');
  }

  async remove(req: any) {
    let data = JSON.parse(req.headers.user);
    await this.cartRepository.remove(data, req.body);
    return await this.findAll(req.headers.user);
  }

  async payment(req: any) {
    try {
      let uniquekey = uuid();
      const cart = await this.cartRepository.findAll(req.headers.user);
      let price = 0;
      cart.forEach((item) => {
        price = price + item.quantity * item.price;
      });

      const prevCustomer = await this.stripe.customers.list({
        email: req.body.paymentInfo.email,
      });

      const isExistingCustomer = prevCustomer.data.length > 0;
      let newCustomer;
      if (!isExistingCustomer) {
        newCustomer = await this.stripe.customers.create({
          email: req.body.paymentInfo.email,
          source: req.body.paymentInfo.id,
        });
      }

      await this.stripe.charges.create(
        {
          currency: 'INR',
          amount: price * 100,
          receipt_email: req.body.paymentInfo.email,
          customer: isExistingCustomer
            ? prevCustomer.data[0].id
            : newCustomer.id,
          description: `you purchased a product | ${req.body.paymentInfo.email}`,
        },
        {
          idempotencyKey: uniquekey,
        },
      );
      await this.ordersService.create(
        req.headers.user,
        cart,
        req.body.paymentInfo.email,
        price,
      );
      await this.cartRepository.removeAll(req.headers.user);

      return ResponseUtils.success('Payment was successful');
    } catch (err) {
      return ResponseUtils.success('Payment Failed');
    }
  }
}
