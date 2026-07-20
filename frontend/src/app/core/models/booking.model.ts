export interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  roomId?: number;
  roomName?: string;
  bikeId?: number;
  bikeName?: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt?: string;
}
