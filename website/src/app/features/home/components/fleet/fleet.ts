import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';
import { DataService, BikeItem } from '../../../../core/services/data.service';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.html',
  styleUrls: ['./fleet.scss']
})
export class FleetComponent implements OnInit {
  selectedCategory: string = 'all';
  bikes: BikeItem[] = [];

  constructor(
    private bookingService: BookingService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getBikes().subscribe(data => {
      this.bikes = data;
    });
  }

  filterBikes(category: string): void {
    this.selectedCategory = category;
  }

  get filteredBikes(): BikeItem[] {
    if (this.selectedCategory === 'all') {
      return this.bikes;
    }
    return this.bikes.filter(b => b.category === this.selectedCategory);
  }

  reserveBike(bike: BikeItem): void {
    // Set active draft in booking service and scroll to booking form
    this.bookingService.setActiveDraft({
      type: 'moto',
      title: bike.name,
      ratePerUnit: bike.price
    });
    
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
