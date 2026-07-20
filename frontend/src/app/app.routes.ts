import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login';
import { AdminLayoutComponent } from './layouts/admin/admin-layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { UsersComponent } from './features/users/users';
import { RolesComponent } from './features/roles/roles';
import { RoomsComponent } from './features/rooms/rooms';
import { BikesComponent } from './features/bikes/bikes';
import { ProductsComponent } from './features/products/products';
import { OrdersComponent } from './features/orders/orders';
import { BookingsComponent } from './features/bookings/bookings';
import { ReportsComponent } from './features/reports/reports';
import { SettingsComponent } from './features/settings/settings';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'bikes', component: BikesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
