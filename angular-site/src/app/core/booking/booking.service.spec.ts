import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
describe('BookingService', () => {
  it('only resolves enabled HTTPS events on an allowlisted host', () => {
    const service = TestBed.inject(BookingService);
    const config = {
      enabled: true,
      allowedHosts: ['calendar.example.com'],
      events: [
        {
          serviceId: 'nutrition',
          modality: 'online' as const,
          url: 'https://calendar.example.com/nutrition',
        },
      ],
    };
    expect(service.resolve({ serviceId: 'nutrition', modality: 'online' }, config)).toBe(
      'https://calendar.example.com/nutrition',
    );
    expect(service.resolve({ serviceId: 'nutrition', modality: 'presencial' }, config)).toBeNull();
    expect(
      service.resolve(
        { serviceId: 'nutrition', modality: 'online' },
        { ...config, allowedHosts: ['evil.example'] },
      ),
    ).toBeNull();
  });
});
