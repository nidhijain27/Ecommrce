import { PartialType } from '@nestjs/mapped-types';
import { CreateSucessOrderDto } from './create-sucess_order.dto';

export class UpdateSucessOrderDto extends PartialType(CreateSucessOrderDto) {}
