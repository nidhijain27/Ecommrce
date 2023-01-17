import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseUtils } from 'src/response.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import { productRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: productRepository) {}

  async create(createProductDto: CreateProductDto) {
    if (
      !createProductDto.name ||
      !createProductDto.price ||
      !createProductDto.description ||
      !createProductDto.mediaUrl
    ) {
      throw new NotFoundException({
        statusCode: '404',
        message: 'Please add all the fields',
      });
    }
    let data = await this.productRepository.create(createProductDto);

    return ResponseUtils.success(
      CreateProductDto.createProductDto(data),
      ' Product saved',
    );
  }

  async findAll() {
    let data = await this.productRepository.findAll();

    return { errorCode: 0, errorMessage: 'Success', data: data };
  }

  async findOne(id: number) {
    let data = await this.productRepository.findOne(id);

    if (!data) {
      return { errorCode: 1, errorMessage: 'No data found', data: {} };
    }
    return { errorCode: 0, errorMessage: 'Success', data: data };
  }

  async remove(id: number) {
    let data = await this.productRepository.remove(id);

    if (data.affected === 0) {
      throw new NotFoundException({ messsage: 'data not found' });
    }
    return ResponseUtils.success('Successfully deleted');
  }
}
