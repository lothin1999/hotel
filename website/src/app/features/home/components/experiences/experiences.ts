import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ExperiencesData } from '../../../../core/services/data.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.html',
  styleUrls: ['./experiences.scss']
})
export class ExperiencesComponent implements OnInit {
  experiencesData?: ExperiencesData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getExperiencesData().subscribe(data => {
      this.experiencesData = data;
    });
  }
}
