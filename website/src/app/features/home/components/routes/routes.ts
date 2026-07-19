import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, RouteItem } from '../../../../core/services/data.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.html',
  styleUrls: ['./routes.scss']
})
export class RoutesComponent implements OnInit {
  routes: RouteItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getRoutes().subscribe(data => {
      this.routes = data;
    });
  }

  scrollToFleet(): void {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
