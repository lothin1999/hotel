import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, WellnessData, SpaCard } from '../../../../core/services/data.service';

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wellness.html',
  styleUrls: ['./wellness.scss']
})
export class WellnessComponent implements OnInit {
  wellnessData?: WellnessData;
  treatments: SpaCard[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getWellnessData().subscribe(data => {
      this.wellnessData = data;
      this.treatments = data?.treatments || [];
    });
  }
}
