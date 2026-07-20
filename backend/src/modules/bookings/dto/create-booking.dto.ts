import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  type!: string; // 'hotel' | 'moto' | 'combo'

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  subTitle?: string;

  @IsString()
  @IsNotEmpty()
  startDate!: string;

  @IsString()
  @IsNotEmpty()
  endDate!: string;

  @IsNumber()
  @Min(1)
  unitsCount!: number;

  @IsNumber()
  @Min(0)
  ratePerUnit!: number;

  @IsNumber()
  @Min(0)
  subTotal!: number;

  @IsNumber()
  @Min(0)
  discount!: number;

  @IsNumber()
  @Min(0)
  total!: number;

  @IsString()
  @IsNotEmpty()
  guestName!: string;

  @IsString()
  @IsNotEmpty()
  guestEmail!: string;

  @IsString()
  @IsOptional()
  guestPhone?: string;

  @IsString()
  @IsOptional()
  guestGender?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  specificNationality?: string;

  @IsString()
  @IsOptional()
  idDocumentType?: string;

  @IsString()
  @IsOptional()
  idDocumentNumber?: string;

  @IsString()
  @IsOptional()
  idDocumentPhotoUrl?: string;

  @IsString()
  @IsOptional()
  driverLicenseNumber?: string;

  @IsString()
  @IsOptional()
  driverLicensePhotoUrl?: string;

  @IsString()
  @IsOptional()
  helmetSizeRider?: string;

  @IsString()
  @IsOptional()
  helmetSizePassenger?: string;

  @IsString()
  @IsOptional()
  ridingExperience?: string;

  @IsString()
  @IsOptional()
  transferRequest?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  paymentChannel?: string;

  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @IsNumber()
  @IsOptional()
  suiteId?: number;

  @IsNumber()
  @IsOptional()
  bikeId?: number;
}
