import { Component, computed, input, signal } from '@angular/core';
import { Testimonial } from '../../../core/content/site-content';

@Component({
  selector: 'app-testimonials',
  styleUrl: './testimonials.scss',
  templateUrl: './testimonials.html',
})
export class Testimonials {
  items = input.required<Testimonial[]>();
  readonly publishedItems = computed(() =>
    this.items().filter(
      (item) => item.review === 'approved' && item.sourceReviewed && item.publicationApproved,
    ),
  );
  readonly index = signal(0);
  readonly current = computed(() => this.publishedItems()[this.index()]);
  previous(): void {
    this.index.update((value) =>
      this.publishedItems().length
        ? (value - 1 + this.publishedItems().length) % this.publishedItems().length
        : 0,
    );
  }
  next(): void {
    this.index.update((value) =>
      this.publishedItems().length ? (value + 1) % this.publishedItems().length : 0,
    );
  }
  goTo(index: number): void {
    if (index >= 0 && index < this.publishedItems().length) this.index.set(index);
  }
}
