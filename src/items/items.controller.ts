import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreatItemDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';

@Controller('api/v1/items')
export class itemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Post()
  async create(@Body() itemData: CreatItemDto) {
    return await this.itemService.create(itemData);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':itemId')
  async findOne(@Param('itemId', ParseIntPipe) itemId: number) {
    return await this.itemService.findOne(itemId);
  }

  @Patch(':itemId')
  async update(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() itemData: UpdateItemsDto,
  ) {
    return await this.itemService.update(itemId, itemData);
  }

  @Delete(':itemId')
  @HttpCode(204)
  async remove(@Param('itemId', ParseIntPipe) itemId: number) {
    await this.itemService.remove(itemId);
  }
}
