import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { usersRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { ResponseUtils } from 'src/response.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { json } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: usersRepository,

    private jwt: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new NotFoundException({
        statusCode: '422',
        message: 'Please add all the fields',
      });
    }

    let data = await this.usersRepository.findOne(createUserDto.email);

    if (data) {
      throw new NotFoundException({
        statusCode: '422',
        message: 'Email Already Exist',
      });
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;

    let result = await this.usersRepository.create(createUserDto);
    if (result) {
      return ResponseUtils.success(
        CreateUserDto.createUserDto(result),
        ' Successfully Register',
      );
    } else {
      return new InternalServerErrorException();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    if (!loginUserDto.email || !loginUserDto.password) {
      throw new NotFoundException({
        statusCode: '422',
        message: 'Please add all the fields',
      });
    }
    const user = await this.usersRepository.findOne(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    const email = loginUserDto.email;
    if (isPasswordMatch) {
      const jwtPayload = { email };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });

      const data = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: jwtToken,
      };
      return ResponseUtils.success(data, 'Login Successfully');
    } else {
      throw new UnauthorizedException('Invalid Credentials.');
    }
  }

  async findAll(req) {
    const data = JSON.parse(req.headers.user);
    const result = await this.usersRepository.findAll(data);

    return ResponseUtils.success(result, 'Success');
  }

  async update(req) {
    const newRole = req.body.role == 'CONSUMER' ? 'ADMIN' : 'CONSUMER';
    await this.usersRepository.update(req.body.id, newRole);
    const data = await this.usersRepository.findOneById(req.body.id);
    return ResponseUtils.success(data, 'Success');
  }
}
