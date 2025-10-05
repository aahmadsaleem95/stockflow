import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeepPartial } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto, UpdateItemDto } from './items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
  ) {}

  async create(data: CreateItemDto): Promise<Item> {
    const item = this.itemsRepo.create(data as DeepPartial<Item>);
    return await this.itemsRepo.save(item);
  }

  async findAll(
    search?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Item[]; total: number }> {
    const where = search
      ? [
          { title: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
          { category: ILike(`%${search}%`) },
        ]
      : undefined;

    const [data, total] = await this.itemsRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }

  async update(id: number, data: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return await this.itemsRepo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemsRepo.remove(item);
  }
}
