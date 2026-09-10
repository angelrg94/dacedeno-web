import { Injectable } from '@angular/core';
import { BookingConfig, Modality } from '../content/site-content';

export interface BookingSelection {
  serviceId: string;
  modality: Modality;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  resolve(selection: BookingSelection, config: BookingConfig): string | null {
    const event = config.events.find(
      (candidate) =>
        candidate.serviceId === selection.serviceId && candidate.modality === selection.modality,
    );
    if (!config.enabled || !event || !this.isAllowed(event.url, config.allowedHosts)) return null;
    return event.url;
  }
  private isAllowed(rawUrl: string, allowedHosts: string[]): boolean {
    try {
      const url = new URL(rawUrl);
      return url.protocol === 'https:' && allowedHosts.includes(url.hostname);
    } catch {
      return false;
    }
  }
}
