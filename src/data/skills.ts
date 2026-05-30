export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['C', 'Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    label: 'Web',
    skills: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'REST APIs', 'Responsive Design'],
  },
  {
    label: 'Data / DB',
    skills: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'AI / ML',
    skills: ['Deep Learning', 'Computer Vision', 'Transfer Learning', 'PyTorch'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'JWT', 'Socket.io', 'Razorpay', 'Cloudinary', 'Framer Motion'],
  },
  {
    label: 'Design / Analytics',
    skills: ['UI/UX', 'Branding', 'Data Analytics', 'Web Analytics'],
  },
];
