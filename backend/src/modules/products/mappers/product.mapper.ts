import { Product } from '../products.repository';
import { ProductResponse } from '../responses/product.response';

export class ProductMapper {
  static toResponse(product: Product): ProductResponse {
    return ProductResponse.fromEntity(product);
  }

  static toResponseList(products: Product[]): ProductResponse[] {
    return products.map((product) => ProductMapper.toResponse(product));
  }
}
