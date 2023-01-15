import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

import { Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

  async create(user, body) {
    const cart = new CartItem();
    cart.userId = user.id;
    cart.productId = body.productId;
    cart.productName = body.productName;
    cart.quantity = body.quantity;
    return await this.cartRepository.save(cart);
  }

  async update(user, body) {
    return await this.cartRepository
      .createQueryBuilder()
      .update()
      .set({ quantity: body.quantity })
      .where(`userId = ${user.id}`)
      .andWhere(`productId=${body.productId}`)
      .execute();
  }

  async findOne(user, body) {
    return await this.cartRepository.findOne({
      where: {
        userId: user.id,
        productId: body.productId,
      },
    });
  }

  async remove(user, body) {
    return await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where(`userId = ${user.id}`)
      .andWhere(`productId=${body.productId}`)
      .execute();
  }

  async removeAll(user) {
    let data = JSON.parse(user);
    return await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where(`userId = ${data.id}`)
      .execute();
  }

  async findAll(user) {
    let data = JSON.parse(user);
    return await this.cartRepository
      .createQueryBuilder('cart')
      .innerJoin(Product, 'prod', ' prod.id = cart.productId')
      .select([
        'cart.id as cartId',
        'prod.id as productId',
        'prod.name as name',
        'prod.price as price',
        'prod.description as description',
        'prod.mediaUrl as mediaUrl',
        'cart.quantity as quantity',
      ])
      .where(`cart.userId = ${data.id}`)
      .getRawMany();
  }
}
