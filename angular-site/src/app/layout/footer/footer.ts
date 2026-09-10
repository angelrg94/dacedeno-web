import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../brand/brand';
import { SiteProfile } from '../../core/content/site-content';
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Brand],
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  profile = input.required<SiteProfile>();
  year = input.required<number>();
}
