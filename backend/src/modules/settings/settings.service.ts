import { Injectable } from '@nestjs/common';

export interface SystemSettings {
  hotelName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  taxRate: number;
  maintenanceMode: boolean;
  enableBikeRentals: boolean;
  autoConfirmBookings: boolean;
}

@Injectable()
export class SettingsService {
  private settings: SystemSettings = {
    hotelName: 'Ankor Luxury Resort & Villas',
    tagline: 'Sanctuary of Modern Elegance & Heritage',
    contactEmail: 'concierge@ankorbook.com',
    contactPhone: '+855 23 888 999',
    currency: 'USD',
    taxRate: 10,
    maintenanceMode: false,
    enableBikeRentals: true,
    autoConfirmBookings: false
  };

  getSettings(): SystemSettings {
    return this.settings;
  }

  updateSettings(updated: Partial<SystemSettings>): SystemSettings {
    this.settings = { ...this.settings, ...updated };
    return this.settings;
  }
}
