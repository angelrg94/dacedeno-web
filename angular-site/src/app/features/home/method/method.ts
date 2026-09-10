import { Component, input, output, signal, computed } from '@angular/core';
import { SiteProfile } from '../../../core/content/site-content';
@Component({
  selector: 'app-method',
  imports: [],
  templateUrl: './method.html',
  styleUrl: './method.scss',
})
export class Method {
  profile = input.required<SiteProfile>();
}
