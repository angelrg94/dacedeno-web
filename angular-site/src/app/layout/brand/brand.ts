import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  styleUrl: './brand.scss',
  template: `<a
    class="brand"
    [class.footer-brand]="inFooter()"
    routerLink="/"
    fragment="inicio"
    aria-label="Daniela Cedeño, inicio"
    ><span class="brand-mark" aria-hidden="true">dc</span
    ><span class="brand-copy"
      ><strong>Daniela Cedeño</strong><small>nutrición + movimiento</small></span
    ></a
  >`,
})
export class Brand {
  inFooter = input(false);
}
