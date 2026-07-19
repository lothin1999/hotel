import {
  Component, Input, Output, EventEmitter, OnInit, OnChanges,
  SimpleChanges, HostListener, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() value = '';           // ISO string YYYY-MM-DD
  @Input() placeholder = 'Select date';
  @Input() minDate = '';         // ISO string - disable dates before this
  @Output() valueChange = new EventEmitter<string>();

  isOpen = signal(false);
  viewYear = signal(new Date().getFullYear());
  viewMonth = signal(new Date().getMonth()); // 0-indexed

  readonly MONTHS = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];
  readonly DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  get selectedDate(): Date | null {
    return this.value ? new Date(this.value + 'T00:00:00') : null;
  }

  get minDateObj(): Date | null {
    return this.minDate ? new Date(this.minDate + 'T00:00:00') : null;
  }

  get displayLabel(): string {
    if (!this.selectedDate) return '';
    return this.selectedDate.toLocaleDateString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  get headerLabel(): string {
    return `${this.MONTHS[this.viewMonth()]} ${this.viewYear()}`;
  }

  get calendarDays(): (number | null)[] {
    const year = this.viewYear();
    const month = this.viewMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }

  ngOnInit(): void {
    if (this.value) {
      const d = new Date(this.value + 'T00:00:00');
      this.viewYear.set(d.getFullYear());
      this.viewMonth.set(d.getMonth());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value) {
      const d = new Date(this.value + 'T00:00:00');
      this.viewYear.set(d.getFullYear());
      this.viewMonth.set(d.getMonth());
    }
  }

  toggle(e: Event): void {
    e.stopPropagation();
    this.isOpen.update(v => !v);
  }

  prevMonth(): void {
    if (this.viewMonth() === 0) {
      this.viewMonth.set(11);
      this.viewYear.update(y => y - 1);
    } else {
      this.viewMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.viewMonth() === 11) {
      this.viewMonth.set(0);
      this.viewYear.update(y => y + 1);
    } else {
      this.viewMonth.update(m => m + 1);
    }
  }

  selectDay(day: number | null): void {
    if (!day) return;
    const iso = this.toIso(this.viewYear(), this.viewMonth(), day);
    if (this.isDisabled(day)) return;
    this.valueChange.emit(iso);
    this.isOpen.set(false);
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return this.selectedDate.getFullYear() === this.viewYear() &&
           this.selectedDate.getMonth() === this.viewMonth() &&
           this.selectedDate.getDate() === day;
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const t = new Date();
    return t.getFullYear() === this.viewYear() &&
           t.getMonth() === this.viewMonth() &&
           t.getDate() === day;
  }

  isDisabled(day: number | null): boolean {
    if (!day || !this.minDateObj) return false;
    const d = new Date(this.viewYear(), this.viewMonth(), day);
    return d < this.minDateObj;
  }

  private toIso(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isOpen.set(false);
  }
}
