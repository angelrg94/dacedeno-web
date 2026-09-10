import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
describe('public routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));
  it('renders privacy directly and an unknown-route recovery page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/privacidad');
    expect(harness.routeNativeElement?.textContent).toContain('Privacidad');
    await harness.navigateByUrl('/missing');
    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');
  });
});
