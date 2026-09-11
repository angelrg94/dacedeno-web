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
    ><img
      class="brand-logo"
      [src]="inFooter() ? '/brand/logo-aprobado-light.png' : '/brand/logo-aprobado.png'"
      width="1283"
      height="360"
      alt=""
      aria-hidden="true"
  /></a>`,
})
export class Brand {
  inFooter = input(false);
}
