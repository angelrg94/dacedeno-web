import { Component, effect, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/booking/booking.service';
import { BookingConfig, Modality, Service } from '../../../core/content/site-content';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  styleUrl: './booking.scss',
  templateUrl: './booking.html',
})
export class Booking {
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
  constructor(private readonly booking: BookingService) {
    effect(() => {
      const serviceId = this.selectedServiceId();
      if (serviceId) this.form.controls.serviceId.setValue(serviceId);
    });
    this.form.valueChanges.subscribe(() => {
      this.bookingUrl = null;
      this.feedback = '';
    });
  }
  continueToBooking(): void {
    this.feedback = '';
    this.bookingUrl = null;
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
    this.feedback = this.bookingUrl
      ? 'La cita se confirma en la agenda externa.'
      : 'La agenda todavía no está configurada. La disponibilidad se publicará cuando Daniela confirme el proveedor y el contacto.';
  }
}
