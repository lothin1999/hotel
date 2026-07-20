import { IsString, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  status?: string; // 'active' | 'completed' | 'cancelled'

  @IsString()
  @IsOptional()
  paymentStatus?: string; // 'pending' | 'paid' | 'pay_at_hotel'

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  paymentChannel?: string;
}
