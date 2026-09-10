import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: '<main><h1>Página no encontrada</h1><a routerLink="/">Volver al inicio</a></main>',
})
export class NotFound {}
