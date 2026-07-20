export interface Bike {
  id: number;
  name: string;
  category?: string;
  pricePerDay: number;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
