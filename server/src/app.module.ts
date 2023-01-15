import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StripeModule } from 'nestjs-stripe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

import { Product } from './products/entities/product.entity';
import { CartItemsModule } from './cart_items/cart_items.module';
import { CartItem } from './cart_items/entities/cart_item.entity';
import { MulterModule } from '@nestjs/platform-express';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './orders/entities/order.entity';
import { SucessOrdersModule } from './sucess_orders/sucess_orders.module';
import { SucessOrder } from './sucess_orders/entities/sucess_order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'next-nest',
      entities: [User, Product, CartItem, Orders, SucessOrder],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,

    CartItemsModule,

    StripeModule.forRoot({
      apiKey:
        'sk_test_51IjklUSJHFYF8OaeXlUX3w3vgCAGNptX4R0C0IvIoFb3L3N1FNnbYvVlIgRd5UJGgTVHLpMSAtcBX8ZkjSNKL5nP00LB6cxHrU',
      apiVersion: '2022-11-15',
    }),

    OrdersModule,

    SucessOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
