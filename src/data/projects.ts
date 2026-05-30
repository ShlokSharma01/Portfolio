export interface Project {
  id: string;
  title: string;
  hook: string;
  tech: string[];
  repo: string;
  live: string | null;
  image: string;
  fallbackImage: string;
}

export const projects: Project[] = [
  {
    id: 'hotel-os',
    title: 'Hotel OS',
    hook: 'AI-powered hotel ops: digital check-in, AI concierge, real-time staff dashboard, payments, analytics.',
    tech: ['React', 'Node', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Razorpay', 'Framer Motion'],
    repo: 'https://github.com/ShlokSharma01/Hotel-OS',
    live: 'https://hotel-os-rpvw.vercel.app/',
    image: '/projects/hotel-os.png',
    fallbackImage: '/about-abstract.png',
  },
  {
    id: 'asl',
    title: 'Real-Time ASL Fingerspelling Detection',
    hook: 'Deep-learning computer vision that recognises ASL alphabet gestures live from webcam.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'Torchvision', 'ResNet50'],
    repo: 'https://github.com/ShlokSharma01/ASL-Fingerspelling',
    live: null,
    image: '/projects/asl.png',
    fallbackImage: '/about-abstract.png',
  },
  {
    id: 'scheduling',
    title: 'Project Scheduling System',
    hook: 'Greedy-algorithm scheduler that optimises project allocation against deadlines, with PostgreSQL.',
    tech: ['Java', 'PostgreSQL', 'JDBC'],
    // TODO: replace with real repo URL when public
    repo: 'https://github.com/ShlokSharma01',
    live: null,
    image: '/projects/scheduling.png',
    fallbackImage: '/about-abstract.png',
  },
];
