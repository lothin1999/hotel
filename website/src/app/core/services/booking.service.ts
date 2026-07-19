import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { generateBookingReference, generateSignature } from '../helpers/utils';

export interface BookingItem {
  id: string;
  reference: string;
  type: 'hotel' | 'moto' | 'combo';
  title: string;
  subTitle?: string;
  startDate: string;
  endDate: string;
  unitsCount: number; // Nights or Days
  ratePerUnit: number;
  subTotal: number;
  discount: number;
  total: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  guestGender?: 'male' | 'female' | 'other';
  nationality?: 'khmer' | 'foreigner';
  specificNationality?: string;
  idDocumentType?: 'khmer_id' | 'passport';
  idDocumentNumber?: string;
  idDocumentPhotoUrl?: string;
  uploadedDocumentUrls?: string[];
  driverLicenseNumber?: string;
  driverLicensePhotoUrl?: string;
  helmetSizeRider?: 'S' | 'M' | 'L' | 'XL';
  helmetSizePassenger?: 'none' | 'S' | 'M' | 'L' | 'XL';
  ridingExperience?: 'novice' | 'intermediate' | 'expert';
  transferRequest?: 'none' | 'helipad' | 'yacht' | 'car';
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod?: 'hotel' | 'online';
  paymentChannel?: 'bakong' | 'aba' | 'acleda' | 'wing' | 'card';
  paymentStatus?: 'pending' | 'paid' | 'pay_at_hotel';
}

export interface PaymentDetails {
  bookingId: string;
  amount: number;
  channel: 'bakong' | 'aba' | 'acleda' | 'wing' | 'card';
  transactionId: string;
  timestamp: number;
  signature: string; // HMAC validation string
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private historySubject = new BehaviorSubject<BookingItem[]>([]);
  public history$: Observable<BookingItem[]> = this.historySubject.asObservable();
  
  private activeBookingSubject = new BehaviorSubject<Partial<BookingItem> | null>(null);
  public activeBooking$: Observable<Partial<BookingItem> | null> = this.activeBookingSubject.asObservable();

  private isBrowser: boolean;
  private readonly MOCK_SECRET_KEY = 'ANKORBOOK_SECURE_HASH_KEY';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadHistoryFromStorage();
    }
  }

  /**
   * Load bookings history from local storage for client caching.
   */
  private loadHistoryFromStorage(): void {
    const data = localStorage.getItem('ankorbook_bookings_history');
    if (data) {
      try {
        this.historySubject.next(JSON.parse(data));
      } catch (e) {
        this.historySubject.next(this.getMockInitialHistory());
      }
    } else {
      // Seed with initial high-end mock history
      const initial = this.getMockInitialHistory();
      localStorage.setItem('ankorbook_bookings_history', JSON.stringify(initial));
      this.historySubject.next(initial);
    }
  }

  /**
   * Sync active history back to localStorage.
   */
  private syncStorage(history: BookingItem[]): void {
    if (this.isBrowser) {
      localStorage.setItem('ankorbook_bookings_history', JSON.stringify(history));
    }
  }

  /**
   * Set active draft selection for booking form checkout inputs.
   */
  setActiveDraft(draft: Partial<BookingItem> | null): void {
    this.activeBookingSubject.next(draft);
  }

  /**
   * Submits a new booking to history.
   */
  createBooking(
    bookingData: Omit<BookingItem, 'id' | 'reference' | 'status' | 'createdAt'>, 
    paymentDetails?: { channel: BookingItem['paymentChannel'], method: BookingItem['paymentMethod'] }
  ): Promise<BookingItem> {
    const newBooking: BookingItem = {
      ...bookingData,
      id: 'bk_' + Math.random().toString(36).substring(2, 9),
      reference: generateBookingReference(),
      status: 'active',
      createdAt: new Date().toISOString(),
      paymentMethod: paymentDetails?.method || 'hotel',
      paymentChannel: paymentDetails?.channel,
      paymentStatus: paymentDetails?.method === 'online' ? 'paid' : 'pay_at_hotel'
    };

    const current = this.historySubject.value;
    const updated = [newBooking, ...current];
    this.historySubject.next(updated);
    this.syncStorage(updated);
    
    return Promise.resolve(newBooking);
  }

  /**
   * Cancels a booking reference.
   */
  cancelBooking(id: string): Promise<void> {
    const updated = this.historySubject.value.map(item => {
      if (item.id === id) {
        return { ...item, status: 'cancelled' as const };
      }
      return item;
    });
    this.historySubject.next(updated);
    this.syncStorage(updated);
    return Promise.resolve();
  }

  /**
   * Cryptographically verifies transaction integrity from client payment outputs.
   */
  verifyPaymentSignature(payment: PaymentDetails): boolean {
    const payload = {
      bookingId: payment.bookingId,
      amount: payment.amount,
      channel: payment.channel,
      transactionId: payment.transactionId,
      timestamp: payment.timestamp
    };
    
    const recalculated = generateSignature(payload, this.MOCK_SECRET_KEY);
    return recalculated === payment.signature;
  }

  /**
   * Returns signed payment transaction payload for the checkout gateway.
   */
  getSignedPaymentPayload(bookingId: string, amount: number, channel: PaymentDetails['channel']): PaymentDetails {
    const timestamp = Date.now();
    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const payload = {
      bookingId,
      amount,
      channel,
      transactionId,
      timestamp
    };

    const signature = generateSignature(payload, this.MOCK_SECRET_KEY);

    return {
      ...payload,
      signature
    };
  }

  /**
   * Default high-end seed data for luxury booking demonstration history.
   */
  private getMockInitialHistory(): BookingItem[] {
    return [
      {
        id: 'bk_demo_1',
        reference: 'VEL-OR8K39',
        type: 'combo',
        title: 'Horizon Ocean Villa',
        subTitle: 'Ducati Scrambler 800',
        startDate: '2026-05-10',
        endDate: '2026-05-15',
        unitsCount: 5,
        ratePerUnit: 480, // Combined suite + bike
        subTotal: 2400,
        discount: 360, // 15% combo saving
        total: 2040,
        guestName: 'Isabelle Moreau',
        guestEmail: 'isabelle@moreau.fr',
        status: 'completed',
        createdAt: '2026-05-01T10:00:00Z',
        paymentMethod: 'online',
        paymentChannel: 'card',
        paymentStatus: 'paid'
      },
      {
        id: 'bk_demo_2',
        reference: 'VEL-TG941A',
        type: 'hotel',
        title: 'Obsidian Garden Suite',
        startDate: '2026-06-01',
        endDate: '2026-06-04',
        unitsCount: 3,
        ratePerUnit: 190,
        subTotal: 570,
        discount: 0,
        total: 570,
        guestName: 'Isabelle Moreau',
        guestEmail: 'isabelle@moreau.fr',
        status: 'completed',
        createdAt: '2026-05-20T14:32:00Z',
        paymentMethod: 'hotel',
        paymentStatus: 'pay_at_hotel'
      }
    ];
  }
}
