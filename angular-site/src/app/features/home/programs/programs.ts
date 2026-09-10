import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Program } from '../../../core/content/site-content';
@Component({
  selector: 'app-programs',
  imports: [RouterLink],
  templateUrl: './programs.html',
  styleUrl: './programs.scss',
})
export class Programs {
  items = input.required<Program[]>();
  selectService = output<string>();
}
