import { Controller, Get, Put, Req, Delete, Post } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Controller('cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Get('/getAllProducts')
  findAll(@Req() request) {
    return this.cartItemsService.findAll(request.headers.user);
  }

  @Put('/updateCart')
  update(@Req() request) {
    return this.cartItemsService.update(request);
  }

  @Delete('/deleteProductFromCart')
  remove(@Req() request) {
    return this.cartItemsService.remove(request);
  }

  @Post('/payment')
  payment(@Req() request) {
    return this.cartItemsService.payment(request);
  }
}
