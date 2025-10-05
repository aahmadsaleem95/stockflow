import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { createItemSchema, updateItemSchema } from './items.dto';
import { ZodError } from 'zod';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() body: unknown) {
    try {
      const data = createItemSchema.parse(body);
      return await this.itemsService.create(data);
    } catch (err) {
      if (err instanceof ZodError) {
        return { message: 'Validation error', errors: err.issues };
      }
      throw err;
    }
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.itemsService.findAll(search, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    try {
      const data = updateItemSchema.parse(body);
      return await this.itemsService.update(id, data);
    } catch (err) {
      if (err instanceof ZodError) {
        return { message: 'Validation error', errors: err.issues };
      }
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.itemsService.remove(id);
    return { message: `Item ${id} deleted successfully` };
  }
}
