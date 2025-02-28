import { Module } from '@nestjs/common';
import { itemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';
import { ItemSubscriber } from './entities/item.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  controllers: [itemsController],
  providers: [ItemsService, ItemSubscriber],
})
export class ItemsModule {}
