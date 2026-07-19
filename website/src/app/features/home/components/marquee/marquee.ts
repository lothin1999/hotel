import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.html',
  styleUrls: ['./marquee.scss']
})
export class MarqueeComponent implements OnInit {
  marqueeItems: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMarqueeItems().subscribe(items => {
      this.marqueeItems = items;
    });
  }
}
