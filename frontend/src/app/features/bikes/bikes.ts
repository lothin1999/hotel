import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { Bike } from '../../core/models/bike.model';

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bikes.html',
  styleUrl: './bikes.scss'
})
export class BikesComponent implements OnInit {
  bikes: Bike[] = [];
  loading = false;
  showForm = false;
  editingBike: Bike | null = null;

  // Form fields
  name = '';
  category = 'adventure';
  engine = '';
  power = '';
  price = 0;
  image = '';
  badge = '';
  detail = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes(): void {
    this.loading = true;
    this.adminService.getBikes().subscribe({
      next: (data) => {
        this.bikes = data;
        this.loading = false;
      },
      error: () => {
        // Fallback mock data if API is not running
        this.bikes = [
          { id: 1, name: 'Ducati Scrambler 800', category: 'scrambler', pricePerDay: 150, status: 'AVAILABLE', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop' },
          { id: 2, name: 'Harley-Davidson Pan America', category: 'adventure', pricePerDay: 240, status: 'AVAILABLE', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop' }
        ];
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingBike = null;
    this.name = '';
    this.category = 'adventure';
    this.engine = '800 cc';
    this.power = '75 HP';
    this.price = 100;
    this.image = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39';
    this.badge = '';
    this.detail = '';
    this.showForm = true;
  }

  openEditForm(bike: Bike): void {
    this.editingBike = bike;
    this.name = bike.name;
    this.category = bike.category || 'adventure';
    this.engine = (bike as any).engine || '';
    this.power = (bike as any).power || '';
    this.price = bike.pricePerDay || (bike as any).price || 0;
    this.image = bike.image || '';
    this.badge = (bike as any).badge || '';
    this.detail = (bike as any).detail || '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingBike = null;
  }

  onSubmit(): void {
    const payload = {
      name: this.name,
      category: this.category,
      engine: this.engine,
      power: this.power,
      price: this.price,
      pricePerDay: this.price,
      image: this.image,
      badge: this.badge,
      detail: this.detail,
      status: 'AVAILABLE' as const
    };

    if (this.editingBike) {
      this.adminService.updateBike(this.editingBike.id, payload).subscribe({
        next: () => {
          this.loadBikes();
          this.closeForm();
        },
        error: (err) => alert('Failed to update: ' + (err.error?.message || err.message))
      });
    } else {
      this.adminService.createBike(payload).subscribe({
        next: () => {
          this.loadBikes();
          this.closeForm();
        },
        error: (err) => alert('Failed to create: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteBike(id: number): void {
    if (confirm('Are you sure you want to delete this bike?')) {
      this.adminService.deleteBike(id).subscribe({
        next: () => this.loadBikes(),
        error: (err) => alert('Failed to delete: ' + (err.error?.message || err.message))
      });
    }
  }
}
