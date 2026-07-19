import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SpaCard {
  icon: string;
  name: string;
  duration: string;
  desc: string;
  price: number;
}

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wellness.html',
  styleUrls: ['./wellness.scss']
})
export class WellnessComponent {
  treatments: SpaCard[] = [
    {
      icon: '♨️',
      name: 'Volcanic Stone Ritual',
      duration: '90 Minutes',
      desc: 'Basalt stones heated to 60°C are placed along the meridians of the body, drawing toxins while restoring deep muscular equilibrium.',
      price: 220
    },
    {
      icon: '🌿',
      name: 'Forest Botanical Wrap',
      duration: '75 Minutes',
      desc: "A full-body envelopment in native botanical extracts sourced from the island's interior forest, followed by a hydration mask application.",
      price: 180
    },
    {
      icon: '🌊',
      name: 'Thalassotherapy',
      duration: '120 Minutes',
      desc: 'A marine therapy programme using seaweed, sea salts, and algae extracts drawn fresh from the adjacent private coastline each morning.',
      price: 280
    }
  ];
}
