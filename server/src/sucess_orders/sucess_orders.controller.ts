import { Controller, Get, Req } from '@nestjs/common';
import { SucessOrdersService } from './sucess_orders.service';

@Controller('sucess-orders')
export class SucessOrdersController {
  constructor(private readonly sucessOrdersService: SucessOrdersService) {}

  @Get('/findAllOrders')
  findAll(@Req() request) {
    return this.sucessOrdersService.findAll(request);
  }
}
