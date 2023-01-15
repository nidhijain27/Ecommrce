import { User, userRoles } from '../entities/user.entity';

import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;

  static createUserDto(newUser: CreateUserDto): CreateUserDto {
    const entity = new User();
    entity.name = newUser.name;
    entity.email = newUser.email;
    entity.password = newUser.password;

    return entity;
  }
}
