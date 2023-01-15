import { Controller, Get, Post, Body, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUtils } from 'src/response.utils';
import { ValidationPipe } from '@nestjs/common/pipes';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('registerUser')
  registration(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('loginUser')
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('/findAllUsers')
  findAll(@Req() request) {
    return this.usersService.findAll(request);
  }

  @Put('/changeRoles')
  update(@Req() request) {
    return this.usersService.update(request);
  }
}
