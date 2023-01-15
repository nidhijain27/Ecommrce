import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  mediaUrl: string;

  static createProductDto(newProduct: CreateProductDto): CreateProductDto {
    const entity = new Product();
    entity.name = newProduct.name;
    entity.price = newProduct.price;
    entity.description = newProduct.description;
    entity.mediaUrl = newProduct.mediaUrl;
    return entity;
  }
}
