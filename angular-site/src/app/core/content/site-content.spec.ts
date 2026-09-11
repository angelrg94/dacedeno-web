import { siteContent } from './site-content';

describe('siteContent testimonials', () => {
  it('contains the nine approved stories from the mock', () => {
    expect(siteContent.testimonials).toHaveLength(9);
    expect(siteContent.testimonials.every((item) => item.editorialType === 'literal')).toBe(true);
    expect(
      siteContent.testimonials.every(
        (item) => item.review === 'approved' && item.sourceReviewed && item.publicationApproved,
      ),
    ).toBe(true);
    expect(siteContent.testimonials.map((item) => item.category)).toEqual([
      'Acompañamiento integral',
      'Reto de hábitos',
      'Posparto y bienestar',
      'Educación nutricional',
      'Nutrición y movimiento',
      'Cambio de hábitos',
      'Entrenamiento grupal',
      'Entrenamiento funcional',
      'Plan nutricional',
    ]);
  });
});
