import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CalendlyEmbedService } from './calendly-embed.service';

describe('CalendlyEmbedService', () => {
  afterEach(() => {
    window.Calendly = undefined;
    document
      .querySelectorAll('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      .forEach((script) => script.remove());
  });

  it('does not touch the DOM during server rendering', async () => {
    TestBed.configureTestingModule({
      providers: [
        CalendlyEmbedService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    const service = TestBed.inject(CalendlyEmbedService);
    const container = document.createElement('div');

    await expect(
      service.mount(container, 'https://calendly.com/cedenorojasd/30min'),
    ).rejects.toThrow('only available in the browser');
    expect(document.querySelector('script[src*="assets.calendly.com"]')).toBeNull();
  });

  it('loads the official script once and initializes each requested container', async () => {
    TestBed.configureTestingModule({ providers: [CalendlyEmbedService] });
    const service = TestBed.inject(CalendlyEmbedService);
    const first = document.createElement('div');
    const second = document.createElement('div');
    const firstMount = service.mount(first, 'https://calendly.com/cedenorojasd/30min');
    const secondMount = service.mount(second, 'https://calendly.com/cedenorojasd/30min');
    const script = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    const initInlineWidget = vi.fn();
    window.Calendly = { initInlineWidget };
    expect(script).not.toBeNull();
    script?.dispatchEvent(new Event('load'));
    await Promise.all([firstMount, secondMount]);

    expect(document.querySelectorAll('script[src*="assets.calendly.com"]').length).toBe(1);
    expect(initInlineWidget).toHaveBeenCalledTimes(2);
    expect(first.dataset['url']).toBe('https://calendly.com/cedenorojasd/30min');
    service.clear(first);
    expect(first.dataset['url']).toBeUndefined();
  });
});
