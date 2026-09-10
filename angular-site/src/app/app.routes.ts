import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Daniela Cedeño — Nutrición y movimiento',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'privacidad',
    title: 'Privacidad — Daniela Cedeño',
    loadComponent: () => import('./features/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: '404',
    title: 'Página no encontrada — Daniela Cedeño',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    title: 'Página no encontrada — Daniela Cedeño',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
