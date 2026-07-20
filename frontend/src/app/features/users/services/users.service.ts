import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { API_CONFIG } from '../../../core/config/api.config';
import { UserAccount } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = `${API_CONFIG.baseUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.usersUrl, { headers: this.authService.getHeaders() });
  }

  getUserById(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.usersUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  createUser(user: Partial<UserAccount>): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.usersUrl, user, { headers: this.authService.getHeaders() });
  }

  updateUser(id: number, user: Partial<UserAccount>): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.usersUrl}/${id}`, user, { headers: this.authService.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${id}`, { headers: this.authService.getHeaders() });
  }
}
