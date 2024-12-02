import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import * as fs from 'fs';
import * as path from 'path';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post('create')
  async create(@Body() body): Promise<Product> {
    return this.productService.create(body);
  }

  @Post('update/:id')
  async update(@Body() body, @Param('id') id: number): Promise<Product> {
    return this.productService.update(id, body);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.productService.remove(id);
  }
}
