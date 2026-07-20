import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { Room } from '../../core/models/room.model';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss'
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  loading = false;
  showForm = false;
  editingRoom: Room | null = null;

  // Form fields
  no = '';
  name = '';
  size = '';
  price = 0;
  image = '';
  description = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading = true;
    this.adminService.getRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.loading = false;
      },
      error: () => {
        // Mock data fallback if API fails
        this.rooms = [
          { id: 1, name: 'Obsidian Garden Suite', pricePerNight: 190, status: 'AVAILABLE', description: '60m² · Garden & Pool View', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&auto=format&fit=crop' },
          { id: 2, name: 'Horizon Ocean Villa', pricePerNight: 340, status: 'AVAILABLE', description: '110m² · Oceanfront', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85&auto=format&fit=crop' }
        ];
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingRoom = null;
    this.no = '';
    this.name = '';
    this.size = '';
    this.price = 100;
    this.image = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304';
    this.description = '';
    this.showForm = true;
  }

  openEditForm(room: Room): void {
    this.editingRoom = room;
    this.no = (room as any).no || '';
    this.name = room.name;
    this.size = (room as any).size || room.type || '';
    this.price = room.pricePerNight || (room as any).price || 0;
    this.image = room.image || '';
    this.description = room.description || '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingRoom = null;
  }

  onSubmit(): void {
    const payload = {
      no: this.no,
      name: this.name,
      size: this.size,
      price: this.price,
      pricePerNight: this.price,
      image: this.image,
      description: this.description,
      status: 'AVAILABLE' as const
    };

    if (this.editingRoom) {
      this.adminService.updateRoom(this.editingRoom.id, payload).subscribe({
        next: () => {
          this.loadRooms();
          this.closeForm();
        },
        error: (err) => alert('Failed to update: ' + (err.error?.message || err.message))
      });
    } else {
      this.adminService.createRoom(payload).subscribe({
        next: () => {
          this.loadRooms();
          this.closeForm();
        },
        error: (err) => alert('Failed to create: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.adminService.deleteRoom(id).subscribe({
        next: () => this.loadRooms(),
        error: (err) => alert('Failed to delete: ' + (err.error?.message || err.message))
      });
    }
  }
}
