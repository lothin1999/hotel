export class CreateUserLogDto {
  userId!: number;
  action!: string;
  description?: string;
  ipAddress?: string;
}
