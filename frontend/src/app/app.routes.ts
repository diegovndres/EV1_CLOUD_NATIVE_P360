import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { Home } from './pages/home/home';
import { Pedidos } from './pages/pedidos/pedidos';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [MsalGuard] },
  { path: 'pedidos', component: Pedidos, canActivate: [MsalGuard] }
];