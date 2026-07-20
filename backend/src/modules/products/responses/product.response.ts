import { Product } from '../products.repository';

export class ProductResponse {
  id!: number;
  name!: string;
  description?: string | null;
  price!: number;
  category?: string | null;

  static fromEntity(product: Product): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    };
  }
}
