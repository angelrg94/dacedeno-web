export interface CalendlyInlineWidgetOptions {
  url: string;
  parentElement: HTMLElement;
  resize?: boolean;
}

export interface CalendlyApi {
  initInlineWidget(options: CalendlyInlineWidgetOptions): void;
}

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}
