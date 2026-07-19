import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AboutData } from '../../../../core/services/data.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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
