export class BikeResponse {
  id!: number;
  name!: string;
  category!: string;
  engine!: string;
  power!: string;
  price!: number;
  image!: string;
  badge?: string | null;
  detail?: string | null;
}
