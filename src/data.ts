export const profile = {
  name: 'Parham Heydari',
  role: 'Senior Front-End Engineer',
  tagline: 'I build fast, accessible, beautifully engineered web experiences.',
  location: 'Ingolstadt, Germany',
  email: 'heidari1377@gmail.com',
  github: 'https://github.com/ph98',
  linkedin: 'https://linkedin.com/in/parhamheidari',
  summary:
    'A decade of hands-on experience building, optimizing and scaling web applications. I care deeply about clean architecture, maintainable code and seamless user experiences — from fine-tuning Core Web Vitals to mentoring the engineers around me.',
};

export const stats = [
  { value: 10, suffix: '+', label: 'years of engineering' },
  { value: 90, suffix: '%', label: 'load time cut at Peak Capital' },
  { value: 3, suffix: '×', label: 'conversion rate growth' },
  { value: 15, suffix: '+', label: 'engineers mentored & led' },
];

export interface Job {
  company: string;
  role: string;
  period: string;
  place: string;
  blurb: string;
  highlights: string[];
  tags: string[];
}

export const experience: Job[] = [
  {
    company: 'e.solutions',
    role: 'Senior Software Engineer',
    period: '2024 — Now',
    place: 'Ingolstadt, DE',
    blurb:
      'In-car infotainment software for Volkswagen Group vehicles — a joint venture of Audi and Elektrobit.',
    highlights: [
      'Architected an internal documentation tool that eliminated manual data entry end-to-end',
      'Cut core codebase size by 5% with SOLID, reusable component architecture & code splitting',
      'Internationalized a single-language codebase into a multi-locale product (i18n)',
      'Re-architected styling into a theme system — light/dark modes, fully customizable',
      'Drove a11y compliance and engineering process improvements across teams',
    ],
    tags: ['React', 'TypeScript', 'Cypress', 'i18n', 'a11y'],
  },
  {
    company: 'Peak Capital Trading',
    role: 'Senior Full-Stack Developer',
    period: '2022 — 2024',
    place: 'Vancouver, CA · Remote',
    blurb:
      'Fintech — proprietary trading firm offering funded trading programs and trader education.',
    highlights: [
      'Migrated the core platform to React + Next.js, modernizing the entire stack',
      'Cut load times 90% — from 15s to under 2s — via image optimization, lazy loading & caching',
      'Designed a self-updating Redis cache: API latency from 5s down to 0.5s',
      'Tripled conversion rate from 4% to 12% with a complete responsive redesign',
      'Boosted organic traffic 10% through dynamic sitemaps & SEO architecture',
    ],
    tags: ['Next.js', 'React', 'Redis', 'SEO', 'Node.js'],
  },
  {
    company: 'WeBlast',
    role: 'Senior Software Engineer',
    period: '2019 — 2022',
    place: 'Mashhad, IR',
    blurb:
      'Software agency building web and mobile products for international clients.',
    highlights: [
      'Guided a cross-functional team of 15 developers and designers',
      'Drove architecture of React-based platforms for international clients',
      'Established CI/CD infrastructure saving 40 monthly hours of manual work',
      'Coached interns into junior developer roles; mentored React engineers',
    ],
    tags: ['React', 'CI/CD', 'Leadership', 'Mentoring'],
  },
  {
    company: 'WeBlast',
    role: 'Front-End Developer',
    period: '2017 — 2019',
    place: 'Mashhad, IR',
    blurb: 'Shipping mobile and web applications with Ionic and React Native.',
    highlights: [
      'Delivered 6+ mobile and web applications with Ionic & React Native',
      'Led a high-growth mobile app from concept to 10k+ active downloads',
      'Pixel-perfect UI implementation across the full development lifecycle',
    ],
    tags: ['React Native', 'Ionic', 'Mobile'],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2012 — 2017',
    place: 'Mashhad, IR',
    blurb: 'Where it all started — landing pages, themes and custom builds.',
    highlights: [
      'High-performance landing pages for five leading tourism companies',
      'Custom lightweight 360° viewer for a hotel’s main page',
      '15+ WordPress themes/plugins, 10+ responsive web apps',
    ],
    tags: ['JavaScript', 'WordPress', 'AngularJS'],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Front-End',
    items: [
      'TypeScript', 'React', 'Next.js', 'React Native', 'Vue.js', 'Nuxt.js',
      'Redux', 'React Query', 'Tailwind', 'SASS', 'D3.js', 'GSAP', 'PWA',
    ],
  },
  {
    group: 'Back-End',
    items: ['Node.js', 'NestJS', 'Express', 'GraphQL', 'REST', 'Redis', 'MongoDB', 'Strapi', 'Python'],
  },
  {
    group: 'Quality & Ops',
    items: ['Jest', 'Cypress', 'Testing Library', 'AWS', 'Docker', 'Nginx', 'CI/CD', 'Linux'],
  },
  {
    group: 'Craft',
    items: ['Accessibility (a11y)', 'i18n', 'SEO', 'Core Web Vitals', 'Design Systems', 'Agile/Scrum', 'Mentoring'],
  },
];

export const marqueeWords = [
  'React', 'TypeScript', 'Next.js', 'Performance', 'Accessibility',
  'Node.js', 'React Native', 'Architecture', 'Core Web Vitals', 'Mentoring',
];

export const testimonials = [
  {
    quote:
      'He successfully reduced our core codebase size by 5% simply by enforcing SOLID principles and designing highly reusable components. Pragmatic, focused on performance and accessibility — clean, scalable software.',
    name: 'Mouna Ben Manaa',
    title: 'Software Engineer · e.solutions',
  },
  {
    quote:
      'Parham combines speed, accuracy and professionalism, leading our front-end team on many projects with great finesse. His expertise in Linux, deployment and maintenance is remarkable.',
    name: 'Mohammad Ali Zarrin zadeh',
    title: 'Back-End Developer · Ocroform',
  },
  {
    quote:
      'An exceptional full-stack developer. Their expertise in both front-end and back-end ensured seamless project execution — a great team player who contributes innovative solutions.',
    name: 'Mahtab Dehqan',
    title: 'Product Designer · Diaco AI Group',
  },
];
