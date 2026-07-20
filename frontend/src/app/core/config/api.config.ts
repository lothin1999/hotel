import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  endpoints: {
    auth: `${environment.apiUrl}/auth`,
    rooms: `${environment.apiUrl}/rooms`,
    bikes: `${environment.apiUrl}/bikes`,
    bookings: `${environment.apiUrl}/bookings`
  }
};
