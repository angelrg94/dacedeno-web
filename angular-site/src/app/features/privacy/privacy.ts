import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  template:
    '<main><h1>Privacidad</h1><p>Este sitio no recoge datos mediante formularios ni incorpora analítica.</p><a routerLink="/">Volver al inicio</a></main>',
})
export class Privacy {}
