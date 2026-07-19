import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface HeroStat {
  num: string;
  label: string;
}

export interface HeroAwardCard {
  stars: number;
  title: string;
  source: string;
  badge: string;
}

export interface HeroData {
  overline: string;
  titlePart1: string;
  titlePart2: string;
  titleGold: string;
  titlePart3: string;
  description: string;
  bgImage: string;
  stats: HeroStat[];
  awardCard: HeroAwardCard;
}

export interface PillarItem {
  icon: string;
  name: string;
  desc: string;
}

export interface AboutData {
  chipText: string;
  title: string;
  body1: string;
  body2: string;
  mainImage: string;
  secondaryImage: string;
  establishedYear: string;
  yearsExperience: number;
  pillars: PillarItem[];
}

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

export interface ExperienceItem {
  tag: string;
  name: string;
  desc: string;
  image: string;
  alt: string;
}

export interface ExperiencesData {
  chipText: string;
  title: string;
  items: ExperienceItem[];
}

export interface ChefInfo {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

export interface DiningOffer {
  name: string;
  details: string;
  price?: number;
}

export interface MichelinBadge {
  stars: string;
  label: string;
  sub: string;
}

export interface DiningData {
  chipText: string;
  title: string;
  body1: string;
  body2: string;
  chef: ChefInfo;
  offers: DiningOffer[];
  mainImage: string;
  dishOverlayImage: string;
  michelinBadge: MichelinBadge;
}

export interface GalleryItem {
  label: string;
  image: string;
  alt: string;
}

export interface GalleryData {
  chipText: string;
  title: string;
  description: string;
  items: GalleryItem[];
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

  private heroData: HeroData = {
    overline: "The World's Most Private Retreat",
    titlePart1: 'Where',
    titlePart2: 'Silence is',
    titleGold: 'Luxury',
    titlePart3: 'Reborn',
    description: 'An invitation-only estate nestled above a private coastline — where 48 curated suites and 16 motorcycles await those who seek perfection without compromise.',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=90&auto=format&fit=crop',
    stats: [
      { num: '48', label: 'Private Suites' },
      { num: '16', label: 'Motorcycles' },
      { num: '5★', label: 'Forbes Rated' },
      { num: '15', label: 'Years of Excellence' }
    ],
    awardCard: {
      stars: 5,
      title: '"A destination that\ntranscends hospitality"',
      source: 'Condé Nast Traveller · 2024',
      badge: "World's Best Resort"
    }
  };

  private aboutData: AboutData = {
    chipText: 'The Ankor Book Story',
    title: 'A Sanctuary Built for the Discerning Few',
    body1: 'Born from the belief that true luxury is not decoration but sensation — Ankor Book was conceived on 18 acres of volcanic coastline as a sanctuary for those who have experienced everything, yet seek something more profound.',
    body2: 'Our fleet of 16 hand-selected motorcycles offers a dimension of freedom rarely associated with five-star hospitality. Here, the journey is as curated as the destination.',
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop',
    establishedYear: '2009',
    yearsExperience: 15,
    pillars: [
      { icon: '🌊', name: 'Private Shoreline', desc: '1.2km of exclusive white sand, reserved for guests only.' },
      { icon: '🍾', name: '3-Star Cuisine', desc: "Chef Théodore Blanc's nightly tasting menu." },
      { icon: '🏍️', name: 'Moto Fleet', desc: '16 premium bikes, guided routes, full gear.' },
      { icon: '💆', name: 'Onsen Sanctuary', desc: 'Volcanic stone villas with private thermal pools.' },
      { icon: '🚁', name: 'Helipad Access', desc: 'Private arrival for those who prefer the sky.' },
      { icon: '⚓', name: 'Yacht Charter', desc: 'Personal superyacht available for island excursions.' }
    ]
  };

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

  private experiencesData: ExperiencesData = {
    chipText: 'Life at Ankor Book',
    title: 'Moments Beyond the Ordinary',
    items: [
      {
        tag: 'Wellness',
        name: 'Suspended Infinity Pool & Thermal Onsen',
        desc: 'Float at the literal edge of the world in our gravity-defying pool, then descend into volcanic stone thermal chambers for transcendent restoration.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=90&auto=format&fit=crop',
        alt: 'Infinity Pool'
      },
      {
        tag: 'Gastronomy',
        name: 'Three-Star Experience',
        desc: "Chef Théodore Blanc's seasonal tasting menus, with produce harvested that same morning.",
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85&auto=format&fit=crop',
        alt: 'Dining'
      },
      {
        tag: 'Adventure',
        name: 'Coastal Moto Freedom',
        desc: '16 premium bikes, curated cliff roads, and the horizon as your only constraint.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format&fit=crop',
        alt: 'Motorcycles'
      }
    ]
  };

  private diningData: DiningData = {
    chipText: 'Gastronomy',
    title: 'Three Stars, One Island',
    body1: "Chef Théodore Blanc arrived at Ankor Book in 2019, bringing his third Michelin star and an obsessive devotion to the island's native produce. The result is a nightly tasting experience unlike any in the world.",
    body2: 'Every ingredient is sourced within 48 kilometres. Every plate is a conversation between the chef and the coastline. Dining here is not a meal — it is a confrontation with beauty.',
    chef: {
      name: 'Chef Théodore Blanc',
      title: '★★★ Michelin · Executive Chef',
      quote: '"I cook the sea, the cliff and the forest."',
      avatar: 'https://images.unsplash.com/photo-1583394293214-8bcc2f2d282b?w=200&q=80&auto=format&fit=crop'
    },
    offers: [
      { name: '7-Course Coastal Tasting', details: 'Wine pairing included · 3 hrs', price: 380 },
      { name: 'Sunrise Breakfast Ritual', details: 'Cliff terrace · Seasonal · Included for suites' },
      { name: 'In-Suite Private Dinner', details: 'Terrace · Personal sommelier · Fully bespoke', price: 250 }
    ],
    mainImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=90&auto=format&fit=crop',
    dishOverlayImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80&auto=format&fit=crop',
    michelinBadge: {
      stars: '★★★',
      label: 'Michelin Stars',
      sub: 'Since 2021'
    }
  };

  private galleryData: GalleryData = {
    chipText: 'The Estate',
    title: 'Every Frame a Memory',
    description: 'Ankor Book was designed to be seen, felt, and photographed. Light changes everything here.',
    items: [
      { label: 'The Main Estate', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85&auto=format&fit=crop', alt: 'Resort' },
      { label: 'Infinity Pool', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=700&q=85&auto=format&fit=crop', alt: 'Pool' },
      { label: 'Private Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85&auto=format&fit=crop', alt: 'Beach' },
      { label: 'Imperial Suite', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85&auto=format&fit=crop', alt: 'Suite' },
      { label: 'Overwater Villa', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=85&auto=format&fit=crop', alt: 'Overwater' }
    ]
  };

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
   * API simulation getters (returns Observables ready for HTTP backend replacement)
   */
  getHeroData(): Observable<HeroData> {
    return of(this.heroData);
  }

  getAboutData(): Observable<AboutData> {
    return of(this.aboutData);
  }

  getSuites(): Observable<SuiteItem[]> {
    return of(this.suites);
  }

  getBikes(): Observable<BikeItem[]> {
    return of(this.bikes);
  }

  getRoutes(): Observable<RouteItem[]> {
    return of(this.routes);
  }

  getExperiencesData(): Observable<ExperiencesData> {
    return of(this.experiencesData);
  }

  getDiningData(): Observable<DiningData> {
    return of(this.diningData);
  }

  getGalleryData(): Observable<GalleryData> {
    return of(this.galleryData);
  }

  getTestimonials(): Observable<TestimonialItem[]> {
    return of(this.testimonials);
  }
}
