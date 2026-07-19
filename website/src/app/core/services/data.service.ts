import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SuiteItem {
  no: string;
  name: string;
  size: string;
  price: number;
  image: string;
  badge?: string;
  tags: string[];
  detail?: string;
}

export interface BikeItem {
  name: string;
  category: 'adventure' | 'scrambler' | 'naked' | 'sport' | 'touring';
  engine: string;
  power: string;
  price: number;
  image: string;
  badge?: string;
  detail?: string;
}

export interface RouteItem {
  no: string;
  name: string;
  size: string;
  desc: string;
  badge?: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  suite: string;
  image: string;
  rating: number;
  text: string;
  stayDuration: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private suites: SuiteItem[] = [
    {
      no: '01 / 06',
      name: 'Obsidian Garden',
      size: '60m² · Garden & Pool View',
      price: 190,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&auto=format&fit=crop',
      tags: ['King Bed', 'Rain Shower', 'Garden View', 'Butler'],
      detail: '60m² · Garden & Pool View'
    },
    {
      no: '02 / 06',
      name: 'Horizon Ocean Villa',
      size: '110m² · Oceanfront',
      price: 340,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85&auto=format&fit=crop',
      badge: 'Most Popular',
      tags: ['King Bed', 'Plunge Pool', 'Ocean View', 'Private Terrace'],
      detail: '110m² · Oceanfront'
    },
    {
      no: '03 / 06',
      name: 'Clifftop Penthouse',
      size: '200m² · 360° Views',
      price: 520,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&auto=format&fit=crop',
      tags: ['2 Suites', '360° Terrace', 'Private Chef', 'Jacuzzi'],
      detail: '200m² · 360° Views'
    },
    {
      no: '04 / 06',
      name: 'Overwater Lagoon Villa',
      size: '130m² · Above the Lagoon',
      price: 440,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=85&auto=format&fit=crop',
      tags: ['Glass Floor', 'Lagoon Access', 'Hammock Deck', 'Sunset View'],
      detail: '130m² · Above the Lagoon'
    },
    {
      no: '05 / 06',
      name: 'Canopy Forest Retreat',
      size: '80m² · Treetop Level',
      price: 260,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85&auto=format&fit=crop',
      tags: ['King Bed', 'Open Bath', 'Treetop Walk', 'Forest Sounds'],
      detail: '80m² · Treetop Level'
    },
    {
      no: '06 / 06',
      name: 'Imperial Residence',
      size: '400m² · Private Estate',
      price: 780,
      image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=85&auto=format&fit=crop',
      badge: 'Signature',
      tags: ['3 Rooms', 'Private Beach', 'Full Butler', 'Cinema Room'],
      detail: '400m² · Private Estate'
    }
  ];

  private bikes: BikeItem[] = [
    {
      name: 'Ducati Scrambler 800',
      category: 'scrambler',
      engine: '803 cc · L-Twin',
      power: '73 HP',
      price: 150,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop',
      badge: 'Guest Favorite',
      detail: '803cc · Desert Sled'
    },
    {
      name: 'Harley-Davidson Pan America',
      category: 'adventure',
      engine: '1252 cc · V-Twin',
      power: '150 HP',
      price: 240,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      detail: '1250cc · Adventure Touring'
    },
    {
      name: 'Honda CB500F',
      category: 'naked',
      engine: '471 cc · Parallel Twin',
      power: '47 HP',
      price: 90,
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop',
      detail: '471cc · Urban Roadster'
    },
    {
      name: 'Kawasaki Ninja 400',
      category: 'sport',
      engine: '399 cc · Parallel Twin',
      power: '49 HP',
      price: 110,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: 'Track Prep',
      detail: '399cc · Lightweight Sport'
    },
    {
      name: 'BMW G310GS',
      category: 'adventure',
      engine: '313 cc · Single Cylinder',
      power: '34 HP',
      price: 120,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop',
      detail: '313cc · Light Trail'
    },
    {
      name: 'Triumph Tiger 1200',
      category: 'touring',
      engine: '1160 cc · Inline 3',
      power: '147 HP',
      price: 280,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
      badge: 'Ultimate Cruiser',
      detail: '1160cc · Explorer Edition'
    }
  ];

  private routes: RouteItem[] = [
    {
      no: '01',
      name: 'Pacific Cliff Highway',
      size: '85km · 2.5 hrs · Scenic',
      desc: 'Climb 400 meters above ocean level through sweeping coastal turns with panoramic views of the western archipelago.',
      badge: '★ Signature'
    },
    {
      no: '02',
      name: 'Volcanic Ridge Loop',
      size: '120km · 4.0 hrs · Advanced',
      desc: 'Technical hairpins surrounding ancient crater lakes and dense cloud forests. Custom riding gear included.'
    },
    {
      no: '03',
      name: 'Sunset Cape Run',
      size: '42km · 1.5 hrs · Leisure',
      desc: 'A gentle coastal cruise leading to our private sunset lighthouse point with champagne reception.'
    },
    {
      no: '04',
      name: 'Village & Vineyard Trail',
      size: '55km · 3.5 hrs · Intermediate',
      desc: 'A cultural journey through three historic villages with a private tasting at Estate Noir winery arranged for all Ankor Book guests.'
    }
  ];

  private testimonials: TestimonialItem[] = [
    {
      name: 'Isabelle Moreau',
      location: 'Paris, France',
      suite: 'Horizon Ocean Villa',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Ankor Book is not merely a hotel — it is a sanctuary for the soul. The silence at dawn in the Horizon Villa, combined with the sheer perfection of private butler service, created an experience we will cherish forever.',
      stayDuration: '7 Nights',
      date: 'March 2025'
    },
    {
      name: 'Lord Alistair Sterling',
      location: 'London, UK',
      suite: 'Clifftop Penthouse',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Having stayed at luxury properties worldwide, I can state without hesitation that Ankor Book operates at a level unmatched anywhere else. The privacy is absolute, the dining is world-class.',
      stayDuration: '4 Nights',
      date: 'January 2025'
    },
    {
      name: 'Dr. Elena & David Vance',
      location: 'Zurich, Switzerland',
      suite: 'Combo Package',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Renting the Ducati and riding the coastal highway at sunrise on our honeymoon morning was, without any hesitation, the single most alive I have felt in years. Ankor Book somehow made every moment feel personal.',
      stayDuration: '5 Nights',
      date: 'February 2025'
    },
    {
      name: 'Marcus Olsen',
      location: 'Oslo, Norway',
      suite: 'Overwater Villa',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Three nights in the overwater villa with a BMW G310GS for island exploration entirely transformed my understanding of what luxury actually is. Ankor Book understands that true luxury is the freedom to feel something.',
      stayDuration: '3 Nights',
      date: 'January 2025'
    }
  ];

  /**
   * API methods returning Observables (ready to replace with HttpClient.get() in production)
   */
  getSuites(): Observable<SuiteItem[]> {
    return of(this.suites);
  }

  getBikes(): Observable<BikeItem[]> {
    return of(this.bikes);
  }

  getRoutes(): Observable<RouteItem[]> {
    return of(this.routes);
  }

  getTestimonials(): Observable<TestimonialItem[]> {
    return of(this.testimonials);
  }
}
