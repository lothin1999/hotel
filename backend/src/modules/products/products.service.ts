import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductMapper } from './mappers/product.mapper';
import { ProductResponse } from './responses/product.response';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(): Promise<ProductResponse[]> {
    const products = await this.productsRepository.findAll();
    return ProductMapper.toResponseList(products);
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return ProductMapper.toResponse(product);
  }

  async create(dto: CreateProductDto): Promise<ProductResponse> {
    const created = await this.productsRepository.create(dto);
    return ProductMapper.toResponse(created);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductResponse> {
    const updated = await this.productsRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return ProductMapper.toResponse(updated);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const deleted = await this.productsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { success: true };
  }
}
