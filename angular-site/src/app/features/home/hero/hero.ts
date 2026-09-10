import { Component, input, output, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteProfile } from '../../../core/content/site-content';
@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  profile = input.required<SiteProfile>();
}
