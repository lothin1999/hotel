import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RouteItem {
  no: string;
  name: string;
  size: string;
  desc: string;
  badge?: string;
}

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.html',
  styleUrls: ['./routes.scss']
})
export class RoutesComponent {
  routes: RouteItem[] = [
    {
      no: '01',
      name: "Cliff's Edge Circuit",
      size: '42km · 2.5 hrs · Intermediate',
      desc: "The signature route. A serpentine coastal road carved into the volcano's southern face, with three unmissable overlooks.",
      badge: '★ Signature'
    },
    {
      no: '02',
      name: 'Jungle Pass Loop',
      size: '68km · 4 hrs · Advanced',
      desc: "Dense forest switchbacks through the interior, emerging at the island's highest peak with panoramic views of all shores."
    },
    {
      no: '03',
      name: 'Sunrise Bay Dawn Ride',
      size: '28km · 1.5 hrs · Beginner',
      desc: "The gentlest route, perfectly timed for the island's famous 6am sunrise over the eastern bay. Departs at 5:30am."
    },
    {
      no: '04',
      name: 'Village & Vineyard Trail',
      size: '55km · 3.5 hrs · Intermediate',
      desc: "A cultural journey through three historic villages with a private tasting at Estate Noir winery arranged for all Ankor Book guests."
    }
  ];

  scrollToFleet(): void {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
