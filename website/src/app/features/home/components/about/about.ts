import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AboutData } from '../../../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutComponent implements OnInit {
  aboutData?: AboutData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAboutData().subscribe(data => {
      this.aboutData = data;
    });
  }
}
