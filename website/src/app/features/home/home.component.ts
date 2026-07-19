import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero';
import { MarqueeComponent } from './components/marquee/marquee';
import { AboutComponent } from './components/about/about';
import { SuitesComponent } from './components/suites/suites';
import { ExperiencesComponent } from './components/experiences/experiences';
import { FleetComponent } from './components/fleet/fleet';
import { RoutesComponent } from './components/routes/routes';
import { DiningComponent } from './components/dining/dining';
import { WellnessComponent } from './components/wellness/wellness';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { BookingWidgetComponent } from '../booking/components/booking-widget/booking-widget';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    MarqueeComponent,
    AboutComponent,
    SuitesComponent,
    ExperiencesComponent,
    FleetComponent,
    RoutesComponent,
    DiningComponent,
    WellnessComponent,
    TestimonialsComponent,
    BookingWidgetComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set rich search engine optimizations (SEO)
    this.seoService.setMeta(
      'Ankor Book | Luxury Private Stay & Motorcycle Fleet',
      'The world\'s most private luxury retreat. Nestled above a coastal cliff, featuring 48 architect-designed suites, a 16-motorcycle fleet, and Michelin 3-star dining.',
      'ankor book resort, luxury retreat, private island, private beach, motorcycle rental, ducati scrambler, onsen spa, michelin star dining',
      'https://ankorbook.com'
    );

    // Inject AEO structured schemas
    this.seoService.injectHotelSchema();
    this.seoService.injectFaqSchema();
  }
}
