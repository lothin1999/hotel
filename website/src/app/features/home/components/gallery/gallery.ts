import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, GalleryData } from '../../../../core/services/data.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryComponent implements OnInit {
  galleryData?: GalleryData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGalleryData().subscribe(data => {
      this.galleryData = data;
    });
  }
}
