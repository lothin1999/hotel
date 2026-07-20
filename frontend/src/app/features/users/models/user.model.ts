export interface UserAccount {
  id: number;
  email: string;
  name?: string;
  role: 'DEVELOPER' | 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER';
  createdAt?: string;
}
