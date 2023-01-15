import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class usersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAll(user): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder()
      .select([
        'id as id',
        'name as name',
        'email as email',
        'role as role',
        // 'prod.id as productId',
        // 'prod.name as name',
        // 'prod.price as price',
        // 'prod.description as description',
        // 'prod.mediaUrl as mediaUrl',
        // 'cart.quantity as quantity',
      ])
      .where(`id != ${user.id}`)
      .getRawMany();
  }

  async findOne(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id, role) {
    return await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ role: role })
      .where(`id = ${id}`)
      .execute();
  }

  async remove(id: number): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
