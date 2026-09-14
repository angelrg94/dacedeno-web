export type Review = 'draft' | 'approved';
export type Modality = 'online' | 'presencial';
export interface SiteProfile {
  name: string;
  credentials: string;
  introduction: string;
  biography: string;
  highlights: { title: string; text: string }[];
  review: Review;
  contact: { email: string; instagram: string; whatsapp: string };
  timezone: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  modalities: Modality[];
  durationMinutes: number | null;
  bookingType: string;
  review: Review;
  cssClass: string;
  symbol: string;
}
export interface Program {
  id: string;
  title: string;
  description: string;
  kind: string;
  availability: 'available' | 'coming-soon' | 'unpublished';
  review: Review;
  serviceId: string;
  cssClass: string;
  featured: boolean;
  price?: { amount: number; currency: string };
}
export interface Testimonial {
  id: string;
  text: string;
  editorialType: 'literal' | 'summary';
  attribution: string;
  category: string;
  review: Review;
  sourceReviewed: boolean;
  publicationApproved: boolean;
}
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  review: Review;
}
export interface BookingConfig {
  enabled: boolean;
  allowedHosts: string[];
  events: { serviceId: string; modality: Modality; url: string }[];
}
export interface SiteContent {
  profile: SiteProfile;
  services: Service[];
  programs: Program[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  booking: BookingConfig;
  publication: {
    origin: string;
    contentApproved: boolean;
    privacyApproved: boolean;
    bookingVerified: boolean;
    hostingVerified: boolean;
    reviewedOn: string;
    year: number;
  };
}
export const siteContent: SiteContent = {
  profile: {
    name: 'Daniela Cedeño',
    credentials: 'Nutricionista · Entrenadora personal',
    introduction:
      'Te acompaño a construir hábitos que caben en tu vida y un cuerpo que se siente fuerte, sin planes imposibles ni culpas.',
    biography:
      'Soy Daniela, nutricionista y entrenadora. Trabajo desde la escucha, la evidencia y el movimiento posible. Empezamos por entender tu punto de partida; después construimos lo que puedes sostener.',
    highlights: [
      {
        title: '100%',
        text: 'personalizado',
      },
      {
        title: 'Online',
        text: 'y presencial',
      },
      {
        title: 'Real',
        text: 'para tu rutina',
      },
    ],
    review: 'draft',
    contact: {
      email: '',
      instagram: '',
      whatsapp: '',
    },
    timezone: '',
  },
  services: [
    {
      id: 'nutrition',
      title: 'Consulta nutricional',
      description:
        'Evaluación, objetivos y un plan flexible construido alrededor de tus horarios, gustos y contexto.',
      benefits: [
        'Consulta inicial de 60 min',
        'Plan y recetario personal',
        'Seguimiento quincenal',
      ],
      modalities: ['online', 'presencial'],
      durationMinutes: 60,
      bookingType: 'nutrition',
      review: 'draft',
      cssClass: 'service-nutrition',
      symbol: '◒',
    },
    {
      id: 'training',
      title: 'Entrenamiento personal',
      description:
        'Sesiones funcionales progresivas para ganar fuerza, confianza y autonomía al moverte.',
      benefits: ['Presencial u online', 'Rutinas adaptadas', 'Corrección en tiempo real'],
      modalities: ['online', 'presencial'],
      durationMinutes: null,
      bookingType: 'training',
      review: 'draft',
      cssClass: 'service-training',
      symbol: '⌁',
    },
    {
      id: 'integral',
      title: 'Proceso integral',
      description:
        'Nutrición y entrenamiento en un mismo programa para avanzar con una estrategia coherente.',
      benefits: ['Plan nutricional', 'Entrenamiento semanal', 'Acompañamiento continuo'],
      modalities: ['online', 'presencial'],
      durationMinutes: null,
      bookingType: 'integral',
      review: 'draft',
      cssClass: 'service-complete',
      symbol: '✦',
    },
  ],
  programs: [
    {
      id: 'impulso',
      title: 'Impulso 8',
      description:
        'Ocho semanas para ordenar tu alimentación, entrenar con intención y convertir el esfuerzo en una rutina sostenible.',
      kind: 'Acompañamiento',
      availability: 'unpublished',
      review: 'draft',
      serviceId: 'integral',
      cssClass: 'featured-program',
      featured: true,
    },
    {
      id: 'semana',
      title: 'Tu semana resuelta',
      description: 'Menú flexible, lista de compras y recetas simples para días con poco tiempo.',
      kind: 'Guía digital',
      availability: 'unpublished',
      review: 'draft',
      serviceId: 'integral',
      cssClass: 'compact-program coral-card',
      featured: false,
    },
    {
      id: 'fuerza',
      title: 'Fuerza en casa',
      description: 'Rutinas guiadas de 30 minutos con progresiones para cuatro semanas.',
      kind: 'Entrenamiento',
      availability: 'unpublished',
      review: 'draft',
      serviceId: 'integral',
      cssClass: 'compact-program lime-card',
      featured: false,
    },
  ],
  testimonials: [
    {
      id: 'story-01',
      text: 'Para mí fue un cambio de vida tu asesoría y acompañamiento. Aprendí a comer y a entender que debo mover y cuidar mi cuerpo para estar bien. A muchos te he recomendado porque de verdad funciona.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Acompañamiento integral',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-02',
      text: 'Lo mejor que pudimos hacer fue acudir juntos, en pareja, a tu asesoría. Nos motivaste un montón durante el reto y nos llevamos muchísimo aprendizaje. Eres dedicada, organizada, motivadora y, sobre todo, muy humana.',
      editorialType: 'literal',
      attribution: 'Pareja',
      category: 'Reto de hábitos',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-03',
      text: 'Después de mi embarazo me costó mucho volver a encontrarme conmigo misma y tú me ayudaste a dar ese primer paso. Aprendí a mejorar mi alimentación y a hacer ejercicio de una forma saludable, sin obsesiones.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Posparto y bienestar',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-04',
      text: 'Cómo porcionar un plato adecuado para una alimentación balanceada ya es un hábito en mí. Ese hábito me ha ayudado muchísimo a ver cambios a largo plazo, y eso te lo debo a ti y a tus enseñanzas.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Educación nutricional',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-05',
      text: 'Gracias a tu acompañamiento, tanto mi esposo como yo aprendimos a comer sano y balanceado con las porciones indicadas. Lo más importante en mi caso es que hice del ejercicio parte de mi vida.',
      editorialType: 'literal',
      attribution: 'Pareja',
      category: 'Nutrición y movimiento',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-06',
      text: 'Gracias a ti logré un cambio que va mucho más allá de lo físico. Me enseñaste a entender la alimentación, a disfrutar comer saludable y a construir comidas equilibradas sin verlo como un castigo.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Cambio de hábitos',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-07',
      text: 'Al iniciar me hiciste sentir cómoda y por eso volví. Siempre respondiste mis dudas y nos motivabas a cumplir las rutinas. Mientras mejoraba mi físico también sentía que ganaba salud mental y una red de apoyo.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Entrenamiento grupal',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-08',
      text: 'Trabajar contigo siempre es muy agradable. Respetas los tiempos del entrenamiento, eres puntual y haces que las actividades se sientan muy cómodas y motivadoras para seguir.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Entrenamiento funcional',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
    {
      id: 'story-09',
      text: 'Con el tiempo fui adaptando las cantidades y combinaciones hasta que se empezó a dar de forma natural. Hoy llevo nueve meses comiendo distinto, más consciente, y los resultados han sido increíbles.',
      editorialType: 'literal',
      attribution: 'Cliente',
      category: 'Plan nutricional',
      review: 'approved',
      sourceReviewed: true,
      publicationApproved: true,
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: '¿Necesito experiencia entrenando?',
      answer:
        'No. Cada sesión parte desde tu nivel actual, experiencia, movilidad y equipamiento disponible.',
      review: 'draft',
    },
    {
      id: 'faq-2',
      question: '¿Trabajas con dietas restrictivas?',
      answer:
        'El foco está en sumar herramientas y construir flexibilidad. Cualquier indicación clínica se adapta a tu contexto y se explica con claridad.',
      review: 'draft',
    },
    {
      id: 'faq-3',
      question: '¿Puedo hacer todo online?',
      answer:
        'Sí. Consultas, seguimiento y entrenamiento pueden hacerse online con acompañamiento y material de apoyo.',
      review: 'draft',
    },
    {
      id: 'faq-4',
      question: '¿Dónde son las sesiones presenciales?',
      answer: 'La ubicación y disponibilidad presencial se confirman antes de reservar.',
      review: 'draft',
    },
  ],
  booking: {
    enabled: true,
    allowedHosts: ['calendly.com'],
    events: [
      {
        serviceId: 'nutrition',
        modality: 'online',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
      {
        serviceId: 'nutrition',
        modality: 'presencial',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
      {
        serviceId: 'training',
        modality: 'online',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
      {
        serviceId: 'training',
        modality: 'presencial',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
      {
        serviceId: 'integral',
        modality: 'online',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
      {
        serviceId: 'integral',
        modality: 'presencial',
        url: 'https://calendly.com/cedenorojasd/30min',
      },
    ],
  },
  publication: {
    origin: '',
    contentApproved: false,
    privacyApproved: false,
    bookingVerified: false,
    hostingVerified: false,
    reviewedOn: '',
    year: 2026,
  },
};
