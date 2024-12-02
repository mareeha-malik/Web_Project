import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async create(body) {
    const productPost = {
      title: body.title,
      description: body.description,
      price: body.price,
      rating: body.rating,
      img: body.img,
    };

    return await this.productRepository.save(productPost);
  }

  async update(id: number, body) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found'); 
    }

    const updatedProduct = {
      title: body.title,
      description: body.description,
    };

    await this.productRepository.update(id, updatedProduct);
    return await this.productRepository.findOne({ where: { id } });  
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    return await this.productRepository.remove(product);
  }
}
