import { Component, signal } from '@angular/core';
import { siteContent } from '../../core/content/site-content';
import { Hero } from './hero/hero';
import { ApproachBanner } from './approach-banner/approach-banner';
import { Services } from './services/services';
import { Programs } from './programs/programs';
import { Method } from './method/method';
import { Booking } from './booking/booking';
import { Testimonials } from './testimonials/testimonials';
import { Faq } from './faq/faq';
import { FinalCta } from './final-cta/final-cta';
import { SeoService } from '../../core/seo/seo.service';
@Component({
  selector: 'app-home',
  imports: [Hero, ApproachBanner, Services, Programs, Method, Booking, Testimonials, Faq, FinalCta],
  templateUrl: './home.html',
})
export class Home {
  readonly content = siteContent;
  readonly selectedService = signal('');
  chooseService(serviceId: string): void {
    this.selectedService.set(serviceId);
  }
  constructor(seo: SeoService) {
    seo.setPage(
      'Daniela Cedeño — Nutrición y movimiento',
      'Nutrición y entrenamiento personal con Daniela Cedeño. Hábitos realistas para sentirte fuerte y con más energía.',
    );
  }
}
