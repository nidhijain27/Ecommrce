import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/createProduct')
  create(@Body() body) {
    return this.productsService.create(body);
  }

  @Get('/getAllProducts')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/getProductById/:id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Post('/deleteProductById/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
