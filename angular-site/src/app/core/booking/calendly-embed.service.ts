import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CalendlyApi } from './calendly.types';

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

@Injectable({ providedIn: 'root' })
export class CalendlyEmbedService {
  private scriptPromise: Promise<CalendlyApi> | null = null;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  async mount(container: HTMLElement, url: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Calendly embeds are only available in the browser.');
    }

    container.replaceChildren();
    const calendly = await this.loadScript();
    container.dataset['url'] = url;
    calendly.initInlineWidget({ url, parentElement: container, resize: true });
  }

  clear(container: HTMLElement): void {
    container.replaceChildren();
    delete container.dataset['url'];
  }

  private loadScript(): Promise<CalendlyApi> {
    if (window.Calendly) return Promise.resolve(window.Calendly);
    if (this.scriptPromise) return this.scriptPromise;

    this.scriptPromise = new Promise<CalendlyApi>((resolve, reject) => {
      const existing = this.document.querySelector<HTMLScriptElement>(
        `script[src="${CALENDLY_SCRIPT_SRC}"]`,
      );
      if (existing) {
        existing.addEventListener('load', () => this.resolveGlobal(resolve, reject), {
          once: true,
        });
        existing.addEventListener('error', () => reject(new Error('Calendly failed to load.')), {
          once: true,
        });
        return;
      }

      const script = this.document.createElement('script');
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.addEventListener('load', () => this.resolveGlobal(resolve, reject), { once: true });
      script.addEventListener('error', () => reject(new Error('Calendly failed to load.')), {
        once: true,
      });
      this.document.head.appendChild(script);
    });

    return this.scriptPromise;
  }

  private resolveGlobal(
    resolve: (value: CalendlyApi) => void,
    reject: (reason?: unknown) => void,
  ): void {
    if (window.Calendly) resolve(window.Calendly);
    else reject(new Error('Calendly loaded without exposing its API.'));
  }
}
