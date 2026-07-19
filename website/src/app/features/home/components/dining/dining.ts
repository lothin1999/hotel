import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, DiningData } from '../../../../core/services/data.service';

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dining.html',
  styleUrls: ['./dining.scss']
})
export class DiningComponent implements OnInit {
  diningData?: DiningData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getDiningData().subscribe(data => {
      this.diningData = data;
    });
  }
}
