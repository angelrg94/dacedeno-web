import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  template:
    '<article class="page-copy"><h1>Privacidad</h1><p>Este sitio no recoge datos mediante formularios ni incorpora analítica.</p><a routerLink="/">Volver al inicio</a></article>',
})
export class Privacy {
  constructor(seo: SeoService) {
    seo.setPage(
      'Privacidad — Daniela Cedeño',
      'Información sobre los datos que trata este sitio y sus límites actuales.',
    );
  }
}
