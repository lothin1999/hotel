import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];
  private idCounter = 1;

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const newProduct: Product = {
      id: this.idCounter++,
      name: dto.name,
      description: dto.description || null,
      price: dto.price,
      category: dto.category || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
