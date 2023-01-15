import { IsNotEmpty, IsString } from 'class-validator';
import { CartItem } from '../entities/cart_item.entity';
export class CreateCartItemDto {
  id: number;

  userId: number;

  productId: number;

  quantity: number;

  static createUserDto(newUser: CreateCartItemDto): CreateCartItemDto {
    const entity = new CartItem();
    entity.userId = newUser.userId;
    entity.productId = newUser.productId;
    entity.quantity = newUser.quantity;

    return entity;
  }
}
