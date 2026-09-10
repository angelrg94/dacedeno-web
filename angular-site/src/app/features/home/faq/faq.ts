import { Component, input } from '@angular/core';
import { FaqItem } from '../../../core/content/site-content';
@Component({ selector: 'app-faq', templateUrl: './faq.html', styleUrl: './faq.scss' })
export class Faq {
  items = input.required<FaqItem[]>();
}
