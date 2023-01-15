import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { usersRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'NidhiJain',
      signOptions: { algorithm: 'HS512', expiresIn: '1d' },
    }),
  ],

  controllers: [UsersController],
  providers: [UsersService, usersRepository],
})
export class UsersModule {}
