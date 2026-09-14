import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  template:
    '<article class="page-copy"><h1>Privacidad</h1><p>Este sitio no recoge datos mediante formularios propios ni incorpora analítica. La agenda se carga con Calendly, un proveedor externo que recibe los datos que introduzcas en su interfaz y puede usar cookies según sus propias políticas.</p><p>Para reservar, cambiar o cancelar una cita, revisa el <a href="https://calendly.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">aviso de privacidad de Calendly</a>. No introduzcas antecedentes clínicos en la web.</p><a routerLink="/">Volver al inicio</a></article>',
})
export class Privacy {
  constructor(seo: SeoService) {
    seo.setPage(
      'Privacidad — Daniela Cedeño',
      'Información sobre los datos que trata este sitio y sus límites actuales.',
    );
  }
}
