import { Bike } from '@prisma/client';
import { BikeResponse } from '../responses/bike.response';

export class BikeMapper {
  static toResponse(bike: Bike): BikeResponse {
    return {
      id: bike.id,
      name: bike.name,
      category: bike.category,
      engine: bike.engine,
      power: bike.power,
      price: bike.price,
      image: bike.image,
      badge: bike.badge,
      detail: bike.detail,
    };
  }

  static toResponseCollection(bikes: Bike[]): BikeResponse[] {
    return bikes.map(bike => this.toResponse(bike));
  }
}
