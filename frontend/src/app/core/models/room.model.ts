export interface Room {
  id: number;
  name: string;
  type?: string;
  pricePerNight: number;
  capacity?: number;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
