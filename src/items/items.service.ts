import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatItemDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from './entities/item.entity';
import { Comment } from './entities/comment.entity';
import { Listing } from './entities/listing.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly itemsManager: EntityManager,
  ) {}

  async create(createItemData: CreatItemDto): Promise<Item> {
    // desirialization process
    const listing = new Listing({ ...createItemData.listing });
    const comments = createItemData.comments.map(
      (comment) => new Comment(comment),
    );
    const tags = createItemData.tags.map((tag) => new Tag(tag));
    const item = new Item({ ...createItemData, listing, comments, tags });
    return await this.itemsManager.save(item);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findOne(itemId: number): Promise<Item> {
    // for making the typeorm populate all relationships
    const item = await this.itemsRepository.findOne({
      where: { id: itemId },
      relations: { listing: true, comments: true, tags: true },
    });
    if (!item) throw new NotFoundException();
    return item;
  }

  async update(itemId: number, itemData: UpdateItemsDto): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id: itemId });
    if (!item) throw new NotFoundException();
    Object.assign(item, itemData);
    return await this.itemsManager.save(item);
  }

  async remove(itemId: number) {
    const item = await this.itemsRepository.findOneBy({ id: itemId });
    if (!item) throw new NotFoundException();
    await this.itemsRepository.remove(item);
  }
}
