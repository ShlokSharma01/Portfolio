export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Web Systems Engineer & Data Analyst',
    company: 'Coppersmith Creations UK / Vani Crafts',
    period: 'Sep 2025 – Present',
    bullets: [
      'Production web platform development, maintenance & optimisation',
      'Structured data management, analytics & reporting pipelines',
      'UI/UX improvements and performance monitoring',
      'Content & digital-asset management, Google Ads support',
    ],
    tags: ['E-commerce', 'Data Analytics', 'Production Platforms', 'International Ops'],
  },
  {
    role: 'Social Media Handler',
    company: 'LocalVibez LLP',
    period: 'Oct 2025 – Nov 2025',
    bullets: [
      'Social account management, content creation & scheduling',
      'Brand strategy, community engagement, performance tracking',
    ],
    tags: ['Social Media', 'Content', 'Branding'],
  },
];
