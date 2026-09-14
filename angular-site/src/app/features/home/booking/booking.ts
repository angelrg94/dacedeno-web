import { AfterViewInit, Component, ElementRef, effect, input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendlyEmbedService } from '../../../core/booking/calendly-embed.service';
import { BookingService } from '../../../core/booking/booking.service';
import { BookingConfig, Modality, Service } from '../../../core/content/site-content';

type CalendlyState = 'idle' | 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  styleUrl: './booking.scss',
  templateUrl: './booking.html',
})
export class Booking implements AfterViewInit {
  @ViewChild('calendlyContainer') private calendlyContainer?: ElementRef<HTMLDivElement>;
  services = input.required<Service[]>();
  config = input.required<BookingConfig>();
  selectedServiceId = input('');
  readonly form = new FormGroup({
    serviceId: new FormControl('', { nonNullable: true, validators: Validators.required }),
    modality: new FormControl<Modality | ''>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  feedback = '';
  bookingUrl: string | null = null;
  calendlyState: CalendlyState = 'idle';
  private bookingRequest = 0;
  constructor(
    private readonly booking: BookingService,
    private readonly calendly: CalendlyEmbedService,
  ) {
    effect(() => {
      const serviceId = this.selectedServiceId();
      if (serviceId) this.form.controls.serviceId.setValue(serviceId);
    });
    this.form.valueChanges.subscribe(() => {
      this.bookingRequest += 1;
      this.bookingUrl = null;
      this.feedback = '';
      this.calendlyState = 'idle';
      if (this.calendlyContainer) this.calendly.clear(this.calendlyContainer.nativeElement);
    });
  }
  ngAfterViewInit(): void {
    if (this.bookingUrl) void this.mountCalendly(this.bookingRequest);
  }
  continueToBooking(): void {
    const request = ++this.bookingRequest;
    this.feedback = '';
    this.bookingUrl = null;
    this.calendlyState = 'idle';
    if (this.calendlyContainer) this.calendly.clear(this.calendlyContainer.nativeElement);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedback = 'Elige un servicio y una modalidad para continuar.';
      return;
    }
    const { serviceId, modality } = this.form.getRawValue();
    this.bookingUrl = this.booking.resolve(
      { serviceId, modality: modality as Modality },
      this.config(),
    );
    if (!this.bookingUrl) {
      this.feedback =
        'La agenda todavía no está configurada. La disponibilidad se publicará cuando Daniela confirme el proveedor y el contacto.';
      return;
    }
    this.feedback = 'Cargando la disponibilidad segura en Calendly…';
    this.calendlyState = 'loading';
    void this.mountCalendly(request);
  }

  private async mountCalendly(request: number): Promise<void> {
    if (request !== this.bookingRequest || !this.bookingUrl || !this.calendlyContainer) return;
    try {
      await this.calendly.mount(this.calendlyContainer.nativeElement, this.bookingUrl);
      if (request !== this.bookingRequest || !this.bookingUrl) {
        this.calendly.clear(this.calendlyContainer.nativeElement);
        return;
      }
      this.calendlyState = 'ready';
      this.feedback = 'Elige un horario disponible en Calendly. La cita aún no está confirmada.';
    } catch {
      if (request !== this.bookingRequest || !this.bookingUrl) return;
      this.calendlyState = 'error';
      this.feedback =
        'No pudimos cargar Calendly. Puedes abrir la agenda en una pestaña nueva para continuar.';
    }
  }
}
