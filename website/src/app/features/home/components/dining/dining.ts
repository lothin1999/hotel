import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuOffer {
  name: string;
  details: string;
  price?: number;
}

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dining.html',
  styleUrls: ['./dining.scss']
})
export class DiningComponent {
  offers: MenuOffer[] = [
    {
      name: 'Evening Tasting Menu',
      details: '12 courses · Paired wines · 3.5 hours',
      price: 180
    },
    {
      name: "Chef's Table Experience",
      details: 'Private kitchen · 8 courses · Bespoke',
      price: 320
    },
    {
      name: 'Sunrise Breakfast Ritual',
      details: 'Cliff terrace · Seasonal · Included for suites'
    },
    {
      name: 'In-Suite Private Dinner',
      details: 'Terrace · Personal sommelier · Fully bespoke',
      price: 250
    }
  ];
}
