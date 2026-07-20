import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  displayName!: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsString()
  @IsOptional()
  gender?: string;

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
}
