import { PartialType } from '@nestjs/mapped-types';
import { CreatItemDto } from './create-items.dto';

export class UpdateItemsDto extends PartialType(CreatItemDto) {}
