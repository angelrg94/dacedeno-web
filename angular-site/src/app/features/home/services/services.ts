import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../../core/content/site-content';
@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  items = input.required<Service[]>();
  selectService = output<string>();
}
