export class SuiteResponse {
  id!: number;
  no!: string;
  name!: string;
  size!: string;
  price!: number;
  image!: string;
  badge?: string | null;
  tags!: string[];
  detail?: string | null;
  description?: string | null;
}
