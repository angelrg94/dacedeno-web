import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template:
    '<article class="page-copy"><h1>Página no encontrada</h1><a routerLink="/">Volver al inicio</a></article>',
})
export class NotFound {}
