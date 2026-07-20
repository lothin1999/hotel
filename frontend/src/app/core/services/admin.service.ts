import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';
import { Room } from '../models/room.model';
import { Bike } from '../models/bike.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private roomsUrl = API_CONFIG.endpoints.rooms;
  private bikesUrl = API_CONFIG.endpoints.bikes;
  private bookingsUrl = API_CONFIG.endpoints.bookings;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Rooms CRUD
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl, { headers: this.authService.getHeaders() });
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomsUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  createRoom(room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, { headers: this.authService.getHeaders() });
  }

  updateRoom(id: number, room: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(`${this.roomsUrl}/${id}`, room, { headers: this.authService.getHeaders() });
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.roomsUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  // Bikes CRUD
  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.bikesUrl, { headers: this.authService.getHeaders() });
  }

  getBikeById(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.bikesUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  createBike(bike: Partial<Bike>): Observable<Bike> {
    return this.http.post<Bike>(this.bikesUrl, bike, { headers: this.authService.getHeaders() });
  }

  updateBike(id: number, bike: Partial<Bike>): Observable<Bike> {
    return this.http.put<Bike>(`${this.bikesUrl}/${id}`, bike, { headers: this.authService.getHeaders() });
  }

  deleteBike(id: number): Observable<any> {
    return this.http.delete<any>(`${this.bikesUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  // Bookings CRUD
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl, { headers: this.authService.getHeaders() });
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.bookingsUrl}/${id}`, { headers: this.authService.getHeaders() });
  }

  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, { headers: this.authService.getHeaders() });
  }

  updateBookingStatus(id: number, status: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.bookingsUrl}/${id}/status`, { status }, { headers: this.authService.getHeaders() });
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.bookingsUrl}/${id}`, { headers: this.authService.getHeaders() });
  }
}
