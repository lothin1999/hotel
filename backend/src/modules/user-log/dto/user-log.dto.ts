export class UserLogDto {
  id!: number;
  userId!: number;
  action!: string;
  description?: string | null;
  ipAddress?: string | null;
  createdAt!: Date;
}
