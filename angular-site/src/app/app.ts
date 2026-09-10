import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { siteContent } from './core/content/site-content';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `<a class="skip-link" href="#contenido">Saltar al contenido</a><app-header />
    <main id="contenido" tabindex="-1"><router-outlet /></main>
    <app-footer [profile]="content.profile" [year]="content.publication.year" />`,
})
export class App {
  readonly content = siteContent;
}
