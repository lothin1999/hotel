import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateBikeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  engine?: string;

  @IsString()
  @IsOptional()
  power?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  badge?: string;

  @IsString()
  @IsOptional()
  detail?: string;
}
