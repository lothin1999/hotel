import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/components/profile-dashboard/profile-dashboard').then(m => m.ProfileDashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
