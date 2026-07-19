import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingService, BookingItem, PaymentDetails } from '../../../../core/services/booking.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DataService, SuiteItem, BikeItem } from '../../../../core/services/data.service';
import { daysBetween, fmtMoney } from '../../../../core/helpers/utils';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { HlmDialogService } from '../../../../components/ui/dialog/src';
import { AuthModalComponent } from '../../../auth/components/auth-modal/auth-modal';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-booking-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, TranslatePipe],
  providers: [HlmDialogService],
  templateUrl: './booking-widget.html',
  styleUrls: ['./booking-widget.scss']
})
export class BookingWidgetComponent implements OnInit, OnDestroy {
  activeTab: 'hotel' | 'moto' | 'combo' = 'hotel';
  
  // Hotel form inputs
  hotelSuite = '';
  hotelSuitePrice = 0;
  hotelCheckIn = '';
  hotelCheckOut = '';
  hotelAdults = 1;
  hotelChildren = 0;
  
  // Moto form inputs
  motoBike = '';
  motoBikePrice = 0;
  motoCheckIn = '';
  motoCheckOut = '';
  
  // Combo form inputs
  comboSuite = '';
  comboSuitePrice = 0;
  comboBike = '';
  comboBikePrice = 0;
  comboCheckIn = '';
  comboCheckOut = '';
  comboAdults = 1;
  comboChildren = 0;

  // Checkout flow state
  isCheckingOut = false;
  // Step flow: 'form' (step 1) -> 'guest_kyc' (step 2) -> 'payment' (step 3) -> 'success'
  checkoutStep: 'form' | 'guest_kyc' | 'payment' | 'success' = 'form';
  selectedPaymentMethod: 'hotel' | 'online' = 'online';
  selectedPaymentChannel: BookingItem['paymentChannel'] = 'bakong';

  // Step 2 Guest KYC & Prerequisites
  guestFullName = '';
  guestEmail = '';
  guestPhone = '+855 ';
  guestGender: 'male' | 'female' | 'other' = 'male';
  nationality: 'khmer' | 'foreigner' = 'khmer';
  specificNationality = '';
  idNumber = '';
  idPhotoPreview: string | null = null;
  idPhotoFileName = '';

  // Multiple drag & drop files/images upload
  uploadedFiles: Array<{ name: string; size: number; type: string; previewUrl: string; file: File }> = [];
  isDragging = false;

  // Moto Prerequisites
  driverLicenseNumber = '';
  licensePhotoPreview: string | null = null;
  licensePhotoFileName = '';
  helmetSizeRider: 'S' | 'M' | 'L' | 'XL' = 'M';
  helmetSizePassenger: 'none' | 'S' | 'M' | 'L' | 'XL' = 'none';
  ridingExperience: 'novice' | 'intermediate' | 'expert' = 'intermediate';
  transferRequest: 'none' | 'helipad' | 'yacht' | 'car' = 'none';
  
  // Online payment card details
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  
  // Simulators
  isProcessingPayment = false;
  qrPayloadUrl = '';
  countdownSeconds = 120;
  private countdownInterval?: any;

  // Completed Booking reference
  completedBooking?: BookingItem;
  
  // Active drafts subscription
  private draftSubscription?: Subscription;
  private isBrowser: boolean;
  public todayStr = '';

  // Options lists loaded dynamically from DataService
  suitesOptions: { name: string; price: number; detail: string }[] = [];
  bikesOptions: { name: string; price: number; detail: string }[] = [];

  // Custom Select Dropdown open/close states
  hotelSuiteOpen = false;
  motoBikeOpen = false;
  comboSuiteOpen = false;
  comboBikeOpen = false;

  toggleDropdown(type: 'hotelSuite' | 'motoBike' | 'comboSuite' | 'comboBike'): void {
    if (type === 'hotelSuite') this.hotelSuiteOpen = !this.hotelSuiteOpen;
    if (type === 'motoBike') this.motoBikeOpen = !this.motoBikeOpen;
    if (type === 'comboSuite') this.comboSuiteOpen = !this.comboSuiteOpen;
    if (type === 'comboBike') this.comboBikeOpen = !this.comboBikeOpen;
  }

  selectHotelSuite(name: string): void {
    this.hotelSuite = name;
    this.onSelectSuite(name);
    this.hotelSuiteOpen = false;
  }

  selectMotoBike(name: string): void {
    this.motoBike = name;
    this.onSelectBike(name);
    this.motoBikeOpen = false;
  }

  selectComboSuite(name: string): void {
    this.comboSuite = name;
    this.onSelectSuite(name);
    this.comboSuiteOpen = false;
  }

  selectComboBike(name: string): void {
    this.comboBike = name;
    this.onSelectBike(name);
    this.comboBikeOpen = false;
  }

  closeAllDropdowns(): void {
    this.hotelSuiteOpen = false;
    this.motoBikeOpen = false;
    this.comboSuiteOpen = false;
    this.comboBikeOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.closeAllDropdowns();
    }
  }

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dataService: DataService,
    private dialogService: HlmDialogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Load suites and bikes dynamically from DataService API
    this.dataService.getSuites().subscribe(suites => {
      this.suitesOptions = suites.map(s => ({
        name: s.name,
        price: s.price,
        detail: s.detail || s.size
      }));
    });

    this.dataService.getBikes().subscribe(bikes => {
      this.bikesOptions = bikes.map(b => ({
        name: b.name,
        price: b.price,
        detail: b.detail || `${b.engine} · ${b.power}`
      }));
    });

    // Sync auth user details when logged in
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.guestFullName = user.displayName || this.guestFullName;
        this.guestEmail = user.email || this.guestEmail;
      }
    });

    // Watch for incoming selections from other components (e.g. clicking Reserve in Suites or Fleet)
    this.draftSubscription = this.bookingService.activeBooking$.subscribe(draft => {
      if (draft) {
        this.activeTab = draft.type || 'hotel';
        if (this.activeTab === 'hotel') {
          this.hotelSuite = draft.title || '';
          this.hotelSuitePrice = draft.ratePerUnit || 0;
        } else if (this.activeTab === 'moto') {
          this.motoBike = draft.title || '';
          this.motoBikePrice = draft.ratePerUnit || 0;
        } else if (this.activeTab === 'combo') {
          this.comboSuite = draft.title || '';
          this.comboSuitePrice = draft.ratePerUnit || 0;
        }
      }
    });

    // Default dates setup
    if (this.isBrowser) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 2);
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

      this.todayStr = fmt(today);
      this.hotelCheckIn = this.motoCheckIn = this.comboCheckIn = fmt(today);
      this.hotelCheckOut = this.motoCheckOut = this.comboCheckOut = fmt(tomorrow);
    }
  }

  // Document Upload File Handlers
  onIdPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.idPhotoFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.idPhotoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onLicensePhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.licensePhotoFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.licensePhotoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeIdPhoto(): void {
    this.idPhotoPreview = null;
    this.idPhotoFileName = '';
  }

  removeLicensePhoto(): void {
    this.licensePhotoPreview = null;
    this.licensePhotoFileName = '';
  }

  setNationality(nat: 'khmer' | 'foreigner'): void {
    this.nationality = nat;
    this.idNumber = '';
    this.idPhotoPreview = null;
    this.idPhotoFileName = '';
    this.specificNationality = '';
    this.uploadedFiles = [];
  }

  setGender(gender: 'male' | 'female' | 'other'): void {
    this.guestGender = gender;
  }

  // Multi file upload handlers
  onDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
    
    if (e.dataTransfer && e.dataTransfer.files) {
      this.handleMultipleFiles(e.dataTransfer.files);
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleMultipleFiles(input.files);
    }
  }

  private handleMultipleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        this.uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl: previewUrl,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeUploadedFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  setHelmetRider(size: any): void {
    this.helmetSizeRider = size;
  }

  setHelmetPassenger(size: any): void {
    this.helmetSizePassenger = size;
  }

  setExperience(exp: 'novice' | 'intermediate' | 'expert'): void {
    this.ridingExperience = exp;
  }

  onDateChange(type: 'hotelCheckIn' | 'hotelCheckOut' | 'motoCheckIn' | 'motoCheckOut' | 'comboCheckIn' | 'comboCheckOut', value: string): void {
    if (type === 'hotelCheckIn') {
      this.hotelCheckIn = value;
      this.adjustDates('hotel');
    } else if (type === 'hotelCheckOut') {
      this.hotelCheckOut = value;
      this.adjustDates('hotel');
    } else if (type === 'motoCheckIn') {
      this.motoCheckIn = value;
      this.adjustDates('moto');
    } else if (type === 'motoCheckOut') {
      this.motoCheckOut = value;
      this.adjustDates('moto');
    } else if (type === 'comboCheckIn') {
      this.comboCheckIn = value;
      this.adjustDates('combo');
    } else if (type === 'comboCheckOut') {
      this.comboCheckOut = value;
      this.adjustDates('combo');
    }
  }

  private adjustDates(tab: 'hotel' | 'moto' | 'combo'): void {
    let start = '';
    let end = '';
    if (tab === 'hotel') { start = this.hotelCheckIn; end = this.hotelCheckOut; }
    else if (tab === 'moto') { start = this.motoCheckIn; end = this.motoCheckOut; }
    else { start = this.comboCheckIn; end = this.comboCheckOut; }

    if (start && end) {
      const s = new Date(start + 'T00:00:00');
      const e = new Date(end + 'T00:00:00');
      if (e <= s) {
        const nextDay = new Date(s);
        nextDay.setDate(nextDay.getDate() + 1);
        const pad = (n: number) => n.toString().padStart(2, '0');
        const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const newEnd = fmt(nextDay);
        if (tab === 'hotel') this.hotelCheckOut = newEnd;
        else if (tab === 'moto') this.motoCheckOut = newEnd;
        else this.comboCheckOut = newEnd;
      }
    }
  }

  // Validation getters
  get nameError(): string {
    if (!this.guestFullName) return 'booking.validation.nameRequired';
    if (!/^[a-zA-Z\s\u1780-\u17FF]+$/.test(this.guestFullName)) return 'booking.validation.nameInvalid';
    if (this.guestFullName.trim().split(/\s+/).length < 2) return 'booking.validation.nameParts';
    return '';
  }

  get emailError(): string {
    if (!this.guestEmail) return 'booking.validation.nameRequired';
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.guestEmail)) return 'booking.validation.emailInvalid';
    return '';
  }

  get phoneError(): string {
    if (!this.guestPhone || this.guestPhone.trim() === '+855' || this.guestPhone.trim() === '') return 'booking.validation.phoneInvalid';
    const cleanPhone = this.guestPhone.replace(/\s+/g, '');
    const phonePattern = /^\+?[0-9-]{8,15}$/;
    if (!phonePattern.test(cleanPhone)) return 'booking.validation.phoneInvalid';
    return '';
  }

  get idNumberErrorMsg(): string {
    if (!this.idNumber) return '';
    if (this.nationality === 'khmer') {
      if (!/^\d{9,12}$/.test(this.idNumber)) return 'booking.validation.khmerIdInvalid';
    } else {
      if (!/^[a-zA-Z0-9]{7,12}$/.test(this.idNumber)) return 'booking.validation.passportInvalid';
    }
    return '';
  }

  get idPhotoErrorMsg(): string {
    if (this.checkoutStep === 'guest_kyc' && !this.idPhotoPreview) {
      return 'booking.validation.idPhotoRequired';
    }
    return '';
  }

  get licenseErrorMsg(): string {
    if (this.activeTab === 'moto' || this.activeTab === 'combo') {
      if (!this.driverLicenseNumber) return 'booking.validation.licenseRequired';
      if (this.driverLicenseNumber.trim().length < 5) return 'booking.validation.licenseRequired';
    }
    return '';
  }

  get licensePhotoErrorMsg(): string {
    if ((this.activeTab === 'moto' || this.activeTab === 'combo') && this.checkoutStep === 'guest_kyc' && !this.licensePhotoPreview) {
      return 'booking.validation.licensePhotoRequired';
    }
    return '';
  }

  get isKycValid(): boolean {
    if (this.nameError || this.emailError || this.phoneError || !this.idNumber || this.idNumberErrorMsg || this.idPhotoErrorMsg) {
      return false;
    }
    if (this.activeTab === 'moto' || this.activeTab === 'combo') {
      if (this.licenseErrorMsg || this.licensePhotoErrorMsg) {
        return false;
      }
    }
    return true;
  }

  get cardNumberError(): string {
    if (this.selectedPaymentMethod !== 'online' || this.selectedPaymentChannel !== 'card') return '';
    if (!this.cardNumber) return 'booking.validation.cardNumberInvalid';
    const cleanCard = this.cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanCard)) return 'booking.validation.cardNumberInvalid';
    return '';
  }

  get cardExpiryError(): string {
    if (this.selectedPaymentMethod !== 'online' || this.selectedPaymentChannel !== 'card') return '';
    if (!this.cardExpiry) return 'booking.validation.cardExpiryInvalid';
    if (!/^\d{2}\/\d{2}$/.test(this.cardExpiry)) return 'booking.validation.cardExpiryInvalid';
    const [monthStr, yearStr] = this.cardExpiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt('20' + yearStr, 10);
    if (month < 1 || month > 12) return 'booking.validation.cardExpiryInvalid';
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    if (year < curYear || (year === curYear && month < curMonth)) return 'booking.validation.cardExpired';
    return '';
  }

  get cardCvvError(): string {
    if (this.selectedPaymentMethod !== 'online' || this.selectedPaymentChannel !== 'card') return '';
    if (!this.cardCvv) return 'booking.validation.cardCvvInvalid';
    if (!/^\d{3}$/.test(this.cardCvv)) return 'booking.validation.cardCvvInvalid';
    return '';
  }

  get isCardValid(): boolean {
    if (this.selectedPaymentMethod !== 'online' || this.selectedPaymentChannel !== 'card') {
      return true;
    }
    return !this.cardNumberError && !this.cardExpiryError && !this.cardCvvError;
  }

  // ── Step Navigation & Validation ──────────────────────────────────
  proceedToCheckout(): void {
    if (!this.isFormValid) return;

    // ── Auth Gate ──────────────────────────────────────────────
    if (!this.authService.currentUser) {
      const dialogRef = this.dialogService.open(AuthModalComponent, {
        contentClass: 'max-w-4xl w-full border-none bg-transparent shadow-none',
        showCloseButton: false
      });

      const authSub = this.authService.currentUser$.subscribe(user => {
        if (user) {
          authSub.unsubscribe();
          setTimeout(() => {
            this.guestFullName = user.displayName || this.guestFullName;
            this.guestEmail = user.email || this.guestEmail;
            this.checkoutStep = 'guest_kyc';
          }, 400);
        }
      });
      return;
    }

    const u = this.authService.currentUser;
    if (u) {
      this.guestFullName = u.displayName || this.guestFullName;
      this.guestEmail = u.email || this.guestEmail;
    }

    // Move to Step 2: Guest Information & KYC Upload
    this.checkoutStep = 'guest_kyc';
  }

  proceedToPayment(): void {
    if (!this.isKycValid) return;
    this.checkoutStep = 'payment';
    this.startQrTimer();
  }

  cancelCheckout(): void {
    this.checkoutStep = 'form';
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  backToSelection(): void {
    this.checkoutStep = 'form';
  }

  backToKyc(): void {
    this.checkoutStep = 'guest_kyc';
  }

  ngOnDestroy(): void {
    this.draftSubscription?.unsubscribe();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  setTab(tab: 'hotel' | 'moto' | 'combo'): void {
    this.activeTab = tab;
  }

  onSelectSuite(name: string): void {
    const s = this.suitesOptions.find(o => o.name === name);
    if (s) {
      if (this.activeTab === 'hotel') this.hotelSuitePrice = s.price;
      if (this.activeTab === 'combo') this.comboSuitePrice = s.price;
    }
  }

  onSelectBike(name: string): void {
    const b = this.bikesOptions.find(o => o.name === name);
    if (b) {
      if (this.activeTab === 'moto') this.motoBikePrice = b.price;
      if (this.activeTab === 'combo') this.comboBikePrice = b.price;
    }
  }

  incrementGuest(type: 'adults' | 'children'): void {
    if (this.activeTab === 'hotel') {
      if (type === 'adults') this.hotelAdults = Math.min(6, this.hotelAdults + 1);
      else this.hotelChildren = Math.min(6, this.hotelChildren + 1);
    } else if (this.activeTab === 'combo') {
      if (type === 'adults') this.comboAdults = Math.min(6, this.comboAdults + 1);
      else this.comboChildren = Math.min(6, this.comboChildren + 1);
    }
  }

  decrementGuest(type: 'adults' | 'children'): void {
    if (this.activeTab === 'hotel') {
      if (type === 'adults') this.hotelAdults = Math.max(1, this.hotelAdults - 1);
      else this.hotelChildren = Math.max(0, this.hotelChildren - 1);
    } else if (this.activeTab === 'combo') {
      if (type === 'adults') this.comboAdults = Math.max(1, this.comboAdults - 1);
      else this.comboChildren = Math.max(0, this.comboChildren - 1);
    }
  }

  // Cost calculation getters
  get calculatedUnits(): number {
    if (this.activeTab === 'hotel') return daysBetween(this.hotelCheckIn, this.hotelCheckOut);
    if (this.activeTab === 'moto') return daysBetween(this.motoCheckIn, this.motoCheckOut);
    return daysBetween(this.comboCheckIn, this.comboCheckOut);
  }

  get ratePerUnit(): number {
    if (this.activeTab === 'hotel') return this.hotelSuitePrice;
    if (this.activeTab === 'moto') return this.motoBikePrice;
    return this.comboSuitePrice + this.comboBikePrice;
  }

  get subTotal(): number {
    return this.ratePerUnit * this.calculatedUnits;
  }

  get discount(): number {
    // 15% automatic discount for combo suite + moto stays
    return this.activeTab === 'combo' ? Math.round(this.subTotal * 0.15) : 0;
  }

  get totalCost(): number {
    return this.subTotal - this.discount;
  }

  get checkoutTitle(): string {
    if (this.activeTab === 'hotel') return this.hotelSuite || 'Please select a Suite';
    if (this.activeTab === 'moto') return this.motoBike || 'Please select a Motorcycle';
    return `${this.comboSuite || 'Suite'} & ${this.comboBike || 'Bike'}`;
  }

  get isFormValid(): boolean {
    let start = '';
    let end = '';
    let selectedItem = false;
    if (this.activeTab === 'hotel') {
      start = this.hotelCheckIn;
      end = this.hotelCheckOut;
      selectedItem = !!this.hotelSuite;
    } else if (this.activeTab === 'moto') {
      start = this.motoCheckIn;
      end = this.motoCheckOut;
      selectedItem = !!this.motoBike;
    } else {
      start = this.comboCheckIn;
      end = this.comboCheckOut;
      selectedItem = !!this.comboSuite && !!this.comboBike;
    }

    if (!selectedItem || !start || !end) return false;

    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    return e > s;
  }

  // Formatting helpers for rendering currency safely
  formatVal(val: number): string {
    return fmtMoney(val);
  }

  selectPaymentMethod(method: 'hotel' | 'online'): void {
    this.selectedPaymentMethod = method;
  }

  selectPaymentChannel(channel: BookingItem['paymentChannel']): void {
    this.selectedPaymentChannel = channel;
    this.startQrTimer();
  }

  private startQrTimer(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownSeconds = 120;
    
    // Create simulated KHQR / ABA deep-link string using environment keys
    const ref = 'ANKOR' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const merchant = environment.bakong.merchantId;
    this.qrPayloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bakong://pay?ref=${ref}&amount=${this.totalCost}&merchant=${merchant}`;

    this.countdownInterval = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  /**
   * Finalizes reservation with KYC documents, helmet sizes, and payment verification.
   */
  async submitReservation(): Promise<void> {
    if (this.isProcessingPayment) return;
    if (this.selectedPaymentMethod === 'online' && this.selectedPaymentChannel === 'card' && !this.isCardValid) return;
    
    const user = this.authService.currentUser;
    const name = this.guestFullName || user?.displayName || 'Guest User';
    const email = this.guestEmail || user?.email || 'guest@ankorbook.com';
    
    const start = this.activeTab === 'hotel' ? this.hotelCheckIn : this.activeTab === 'moto' ? this.motoCheckIn : this.comboCheckIn;
    const end = this.activeTab === 'hotel' ? this.hotelCheckOut : this.activeTab === 'moto' ? this.motoCheckOut : this.comboCheckOut;
    
    this.isProcessingPayment = true;

    // Simulate online processing delay
    setTimeout(async () => {
      const draftData: Omit<BookingItem, 'id' | 'reference' | 'status' | 'createdAt'> = {
        type: this.activeTab,
        title: this.checkoutTitle,
        subTitle: this.activeTab === 'combo' ? `Suite: ${this.comboSuite} / Bike: ${this.comboBike}` : undefined,
        startDate: start,
        endDate: end,
        unitsCount: this.calculatedUnits,
        ratePerUnit: this.ratePerUnit,
        subTotal: this.subTotal,
        discount: this.discount,
        total: this.totalCost,
        guestName: name,
        guestEmail: email,
        guestPhone: this.guestPhone,
        guestGender: this.guestGender,
        nationality: this.nationality,
        specificNationality: this.nationality === 'foreigner' ? this.specificNationality : undefined,
        idDocumentType: this.nationality === 'khmer' ? 'khmer_id' : 'passport',
        idDocumentNumber: this.idNumber,
        idDocumentPhotoUrl: this.uploadedFiles[0]?.previewUrl || undefined,
        uploadedDocumentUrls: this.uploadedFiles.map(f => f.previewUrl),
        driverLicenseNumber: this.driverLicenseNumber || undefined,
        driverLicensePhotoUrl: this.licensePhotoPreview || undefined,
        helmetSizeRider: (this.activeTab === 'moto' || this.activeTab === 'combo') ? this.helmetSizeRider : undefined,
        helmetSizePassenger: (this.activeTab === 'moto' || this.activeTab === 'combo') ? this.helmetSizePassenger : undefined,
        ridingExperience: (this.activeTab === 'moto' || this.activeTab === 'combo') ? this.ridingExperience : undefined,
        transferRequest: this.transferRequest
      };

      if (this.selectedPaymentMethod === 'online') {
        // Secure transaction payload signing to prevent price injection tampering
        const tempId = 'bk_temp_' + Date.now();
        const signedPayload = this.bookingService.getSignedPaymentPayload(tempId, this.totalCost, this.selectedPaymentChannel!);
        
        // Cryptographic integrity verification check simulation
        const isValid = this.bookingService.verifyPaymentSignature(signedPayload);
        if (!isValid) {
          alert('Security Alert: Invoice signature validation failed. Transaction halted.');
          this.isProcessingPayment = false;
          return;
        }
      }

      this.completedBooking = await this.bookingService.createBooking(draftData, {
        method: this.selectedPaymentMethod,
        channel: this.selectedPaymentMethod === 'online' ? this.selectedPaymentChannel : undefined
      });

      this.checkoutStep = 'success';
      this.isProcessingPayment = false;
      if (this.countdownInterval) clearInterval(this.countdownInterval);
    }, 2000);
  }

  copyReference(): void {
    if (this.completedBooking && this.isBrowser) {
      navigator.clipboard.writeText(this.completedBooking.reference);
      alert('Booking Reference copied to clipboard.');
    }
  }

  resetWidget(): void {
    this.checkoutStep = 'form';
    this.completedBooking = undefined;
    this.bookingService.setActiveDraft(null);
  }
}
