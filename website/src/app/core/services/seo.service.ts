import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Updates page SEO titles and meta tags.
   */
  setMeta(
    title: string,
    description: string,
    keywords: string,
    canonicalUrl?: string
  ): void {
    this.titleService.setTitle(title);
    
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    
    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'VELOUR' });
    
    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    // Canonical link
    if (canonicalUrl && this.document) {
      try {
        let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = this.document.createElement('link');
          if (link) {
            link.setAttribute('rel', 'canonical');
            if (this.document.head) {
              this.document.head.appendChild(link);
            }
          }
        }
        if (link) {
          link.setAttribute('href', canonicalUrl);
        }
      } catch (e) {
        console.warn('Could not inject canonical link during SSR:', e);
      }
    }
  }

  /**
   * Injects JSON-LD structured data into the HTML head for AEO and GEO optimization.
   */
  injectSchema(schema: Record<string, any>, schemaId: string): void {
    if (!this.document) return;
    try {
      // Remove existing schema script with same ID if it exists
      const existing = this.document.getElementById(schemaId);
      if (existing) {
        existing.remove();
      }

      const script = this.document.createElement('script');
      if (script) {
        script.id = schemaId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        if (this.document.head) {
          this.document.head.appendChild(script);
        }
      }
    } catch (e) {
      console.warn('Could not inject schema during SSR:', e);
    }
  }

  /**
   * Standard hotel and geographical coordinates schema (GEO).
   */
  injectHotelSchema(): void {
    const hotelSchema = {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      '@id': 'https://ankorbook.com/#hotel',
      'name': 'Ankor Book Resort',
      'description': "The World's Most Exclusive Private Retreat - 48 curated suites and 16 motorcycles above a private coastline.",
      'url': 'https://ankorbook.com',
      'telephone': '+1-800-835-6871',
      'logo': 'https://ankorbook.com/assets/logo.png',
      'image': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '18 Coastal Acres',
        'addressLocality': 'Estate Bay',
        'addressRegion': 'CA',
        'postalCode': '90210',
        'addressCountry': 'US'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '34.0194',
        'longitude': '-118.4912'
      },
      'priceRange': '$$$$',
      'starRating': {
        '@type': 'Rating',
        'ratingValue': '5',
        'bestRating': '5'
      },
      'amenityFeature': [
        { '@type': 'LocationFeatureSpecification', 'name': 'Private Shoreline', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Onsen Sanctuary', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Michelin 3-Star Cuisine', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Motorcycle Fleet', 'value': true },
        { '@type': 'LocationFeatureSpecification', 'name': 'Helipad', 'value': true }
      ]
    };
    this.injectSchema(hotelSchema, 'hotel-structured-data');
  }

  /**
   * Pre-packaged QA/FAQ page schema (AEO) to optimize AI search engine summaries.
   */
  injectFaqSchema(): void {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How many private suites are available at Ankor Book?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Ankor Book offers exactly 48 ultra-luxury private suites, each designed by Pritzker-winning architects using local elements sourced within 100 miles.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What motorcycles are included in the Ankor Book fleet?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The Ankor Book fleet contains 16 premium, hand-selected bikes, including the Ducati Scrambler 800, Harley-Davidson Pan America, Honda CB500F, Kawasaki Ninja 400, BMW G310GS, and Triumph Tiger 1200.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What payment methods are supported for stay reservations at Ankor Book?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We support Pay at Hotel and Secure Online Payments. Supported online channels include Bakong KHQR, ABA Pay, Acleda Bank, Wing Pay, and all major Credit Cards (Visa, Mastercard, Amex).'
          }
        }
      ]
    };
    this.injectSchema(faqSchema, 'faq-structured-data');
  }
}
