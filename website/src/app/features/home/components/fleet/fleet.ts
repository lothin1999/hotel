import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';

interface BikeItem {
  name: string;
  category: 'adventure' | 'scrambler' | 'naked' | 'sport' | 'touring';
  engine: string;
  power: string;
  price: number;
  image: string;
  badge?: string;
}

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.html',
  styleUrls: ['./fleet.scss']
})
export class FleetComponent {
  selectedCategory: string = 'all';

  bikes: BikeItem[] = [
    {
      name: 'Ducati Scrambler 800',
      category: 'scrambler',
      engine: '803 cc · L-Twin',
      power: '73 HP',
      price: 150,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop',
      badge: 'Guest Favorite'
    },
    {
      name: 'Harley-Davidson Pan America',
      category: 'adventure',
      engine: '1252 cc · V-Twin',
      power: '150 HP',
      price: 240,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop'
    },
    {
      name: 'Honda CB500F',
      category: 'naked',
      engine: '471 cc · Parallel Twin',
      power: '47 HP',
      price: 90,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop'
    },
    {
      name: 'Kawasaki Ninja 400',
      category: 'sport',
      engine: '399 cc · Parallel Twin',
      power: '49 HP',
      price: 110,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: 'Track Prep'
    },
    {
      name: 'BMW G310GS',
      category: 'adventure',
      engine: '313 cc · Single Cylinder',
      power: '34 HP',
      price: 120,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop'
    },
    {
      name: 'Triumph Tiger 1200',
      category: 'touring',
      engine: '1160 cc · Inline 3',
      power: '147 HP',
      price: 280,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: 'Ultimate Cruiser'
    }
  ];

  constructor(private bookingService: BookingService) {}

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
