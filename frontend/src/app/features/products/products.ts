import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;

  typeFilter = 'all';
  searchQuery = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    
    this.adminService.getRooms().subscribe({
      next: (rooms) => {
        const roomProducts = rooms.map(r => ({
          id: r.id,
          name: r.name,
          type: 'suite',
          price: r.pricePerNight || (r as any).price || 0,
          status: r.status || 'AVAILABLE',
          image: r.image,
          details: (r as any).size || r.description || 'Luxury Suite'
        }));

        this.adminService.getBikes().subscribe({
          next: (bikes) => {
            const bikeProducts = bikes.map(b => ({
              id: b.id,
              name: b.name,
              type: 'bike',
              price: b.pricePerDay || (b as any).price || 0,
              status: b.status || 'AVAILABLE',
              image: b.image,
              details: `${b.category || 'Motorcycle'} · ${(b as any).engine || '800cc'}`
            }));

            this.products = [...roomProducts, ...bikeProducts];
            this.applyFilters();
            this.loading = false;
          }
        });
      },
      error: () => {
        // Fallback items
        this.products = [
          { id: 1, name: 'Horizon Ocean Villa', type: 'suite', price: 340, status: 'AVAILABLE', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d', details: '110m² · Oceanfront' },
          { id: 2, name: 'Ducati Scrambler 800', type: 'bike', price: 150, status: 'AVAILABLE', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39', details: 'scrambler · 803 cc' }
        ];
        this.applyFilters();
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p => {
      const matchesType = this.typeFilter === 'all' || p.type === this.typeFilter;
      const matchesSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            p.details.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }
}
