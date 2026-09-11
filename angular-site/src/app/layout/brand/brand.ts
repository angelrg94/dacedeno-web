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
      [src]="inFooter() ? '/brand/logo-daniela-light.svg' : '/brand/logo-daniela.svg'"
      width="305"
      height="63"
      alt=""
      aria-hidden="true"
  /></a>`,
})
export class Brand {
  inFooter = input(false);
}
