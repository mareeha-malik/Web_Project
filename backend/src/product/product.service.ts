import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService, // Dependency injection for Cloudinary
  ) {}

  // Retrieve all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Retrieve a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Create a new product
  async create(body, file?: Express.Multer.File): Promise<Product> {
    let uploadedImgUrl = null;

    if (file) {
      uploadedImgUrl = await this.cloudinaryService.uploadImage(file.path); // Upload file to Cloudinary
    }

    const newProduct = {
      title: body.title,
      description: body.description,
      price: body.price,
      rating: body.rating,
      img: uploadedImgUrl,
    };

    return await this.productRepository.save(newProduct); // Save product to the database
  }

  // Update an existing product by ID
  async update(id: number, body, file?: Express.Multer.File): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Handle file upload if a new file is provided
    let updatedImg = product.img;
    if (file) {
      updatedImg = await this.cloudinaryService.uploadImage(file.path);
    }

    // Merge updated fields with existing product data
    const updatedProduct = {
      ...product,
      title: body.title || product.title,
      description: body.description || product.description,
      price: body.price || product.price,
      rating: body.rating || product.rating,
      img: updatedImg,
    };

    // Perform the update
    await this.productRepository.update(id, updatedProduct);

    // Return the updated product
    return await this.productRepository.findOne({ where: { id } });
  }

  // Delete a product by ID
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product); // Remove product from the database
  }
}
