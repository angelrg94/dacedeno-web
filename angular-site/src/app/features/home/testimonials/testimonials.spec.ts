import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testimonials } from './testimonials';

const fixtureItems = [
  {
    id: 't1',
    text: 'Primer proceso.',
    editorialType: 'literal' as const,
    attribution: 'Cliente',
    category: 'Hábitos',
    review: 'approved' as const,
    sourceReviewed: true,
    publicationApproved: true,
  },
  {
    id: 't2',
    text: 'Segundo proceso.',
    editorialType: 'summary' as const,
    attribution: 'Cliente',
    category: 'Movimiento',
    review: 'approved' as const,
    sourceReviewed: true,
    publicationApproved: true,
  },
];

describe('Testimonials', () => {
  let component: Testimonials;
  let fixture: ComponentFixture<Testimonials>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Testimonials] }).compileComponents();
    fixture = TestBed.createComponent(Testimonials);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', fixtureItems);
    fixture.detectChanges();
  });
  it('wraps at both carousel ends and supports direct selection', () => {
    component.previous();
    expect(component.index()).toBe(1);
    component.next();
    expect(component.index()).toBe(0);
    component.goTo(1);
    expect(component.current()?.text).toBe('Segundo proceso.');
  });
});
