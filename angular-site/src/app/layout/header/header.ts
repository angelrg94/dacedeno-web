import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../brand/brand';
@Component({
  selector: 'app-header',
  imports: [RouterLink, Brand],
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  readonly menuOpen = signal(false);
  readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');
  readonly links = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'programas', label: 'Programas' },
    { id: 'metodo', label: 'Mi método' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'agenda', label: 'Agenda una cita' },
  ];
  close(restore = false) {
    this.menuOpen.set(false);
    if (restore) this.toggle()?.nativeElement.focus();
  }
}
