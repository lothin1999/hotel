import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DataService, SocialLinkItem } from '../../../core/services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent implements OnInit {
  socialLinks: SocialLinkItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSocialLinks().subscribe(links => {
      this.socialLinks = links;
    });
  }
}

