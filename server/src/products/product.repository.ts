import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class productRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: CreateProductDto): Promise<Product> {
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id: id } });
  }

  //   async update(id: number, user: UpdateUserDto): Promise<any> {
  //     return await this.usersRepository
  //       .createQueryBuilder()
  //       .update()
  //       .set(user)
  //       .where('id = :id', { id })
  //       .execute();
  //   }

  async remove(id: number): Promise<any> {
    return await this.productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();
  }
}
