import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Tag } from 'src/items/entities/tag.entity';
import { Listing } from 'src/items/entities/listing.entity';
import { Item } from 'src/items/entities/item.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Item, Tag, Listing, Comment],
  migrations: ['migrations/**'],
});
