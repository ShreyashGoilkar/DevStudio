export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'ai';
  features: string[];
  status: 'shipped' | 'in-progress';
  year: string;
  links: { live?: string; source?: string };
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'DevStudio Portfolio',
    tagline: 'This very website — a developer workspace and portfolio',
    description: 'An interactive developer portfolio with built-in tools, project manager, and project showcase.',
    longDescription: 'DevStudio is the project you are looking at right now. It combines a portfolio showcase with a functional developer workspace including a JSON formatter, color palette generator, snippet manager, and mini project manager. Built as a competition entry to demonstrate production-quality front-end engineering.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    category: 'web',
    features: [
      'Interactive project pitch deck with category filtering',
      'Four working developer tools (JSON, palette, snippets, resources)',
      'Mini project manager with localStorage persistence',
      'Responsive design with dark theme and reduced-motion support',
    ],
    status: 'shipped',
    year: '2026',
    links: { source: 'https://github.com' },
  },
  {
    id: 2,
    title: 'NebulaDash',
    tagline: 'Real-time analytics dashboard template',
    description: 'A dashboard UI kit with WebSocket-driven charts and a configurable widget grid.',
    longDescription: 'NebulaDash is an open-source dashboard UI kit demonstrating real-time data visualization. It includes a draggable widget grid, WebSocket integration for live updates, and a set of reusable chart components. Intended as a starting point for teams building internal analytics tools.',
    techStack: ['React', 'TypeScript', 'D3.js', 'WebSockets', 'Vite'],
    category: 'fullstack',
    features: [
      'Draggable and resizable widget grid layout',
      'WebSocket-driven live chart components',
      'Configurable dashboard presets with JSON config',
      'Dark/light theme with system preference detection',
    ],
    status: 'shipped',
    year: '2025',
    links: { source: 'https://github.com' },
  },
  {
    id: 3,
    title: 'PixelForge',
    tagline: 'Design token generator from a seed color',
    description: 'Drop in a brand color and PixelForge builds a complete, accessible color ramp.',
    longDescription: 'PixelForge takes a single seed color and generates a full color ramp with WCAG-compliant contrast ratios. It outputs CSS custom properties, Tailwind config snippets, and a JSON token file. Useful for design systems that need consistent color scales.',
    techStack: ['React', 'TypeScript', 'Canvas API', 'Vite'],
    category: 'ai',
    features: [
      'Perceptually-uniform color ramp generation',
      'Automatic WCAG contrast checking across all shades',
      'Live preview with sample component mockups',
      'Export to CSS variables, Tailwind config, and JSON',
    ],
    status: 'shipped',
    year: '2025',
    links: { source: 'https://github.com' },
  },
  {
    id: 4,
    title: 'CodeCanvas',
    tagline: 'Collaborative code editor in the browser',
    description: 'Real-time pair programming with shared cursors and live preview — no setup required.',
    longDescription: 'CodeCanvas is a browser-based collaborative code editor. It uses CRDT-based sync for conflict-free editing, WebRTC for low-latency voice, and an integrated preview pane. Create a room, share a link, and start pair programming instantly.',
    techStack: ['React', 'TypeScript', 'Yjs', 'Monaco Editor', 'WebRTC'],
    category: 'web',
    features: [
      'CRDT-based collaborative editing with no conflicts',
      'WebRTC voice chat with echo cancellation',
      'Live preview with hot module replacement',
      'Shareable session links with optional passcode',
    ],
    status: 'in-progress',
    year: '2024',
    links: { source: 'https://github.com' },
  },
  {
    id: 5,
    title: 'TrailMate',
    tagline: 'Offline-first hiking companion PWA',
    description: 'Plan trails, track progress, and navigate offline with cached topo maps.',
    longDescription: 'TrailMate is a progressive web app for hikers. Download topo maps before you go, track your route with GPS breadcrumbs, and get turn-by-turn guidance even with no signal. Trip data syncs when connectivity returns.',
    techStack: ['React', 'TypeScript', 'IndexedDB', 'Mapbox', 'Service Workers'],
    category: 'mobile',
    features: [
      'Offline topo maps with contour lines and elevation',
      'GPS breadcrumb tracking with battery-efficient sampling',
      'Background sync when connectivity is restored',
      'Export trips as GPX files',
    ],
    status: 'shipped',
    year: '2024',
    links: { source: 'https://github.com' },
  },
  {
    id: 6,
    title: 'SynthScope',
    tagline: 'Audio visualization studio for musicians',
    description: 'Transform any audio track into real-time visual art for live shows and recordings.',
    longDescription: 'SynthScope is a browser-based audio visualization studio. Load a track or capture live audio, choose from reactive visual scenes, and project to external displays. Built for indie musicians who want visual backing for live performances.',
    techStack: ['React', 'Web Audio API', 'Three.js', 'WebGL', 'Canvas'],
    category: 'ai',
    features: [
      'Real-time FFT analysis driving WebGL shaders',
      'MIDI controller support for live scene switching',
      'External display output with dual-monitor mode',
      'Record visualizations as video with audio sync',
    ],
    status: 'shipped',
    year: '2023',
    links: { source: 'https://github.com' },
  },
];

export interface TechCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  technologies: { name: string; description: string }[];
}

export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'Layout',
    description: 'Building responsive, accessible user interfaces',
    technologies: [
      { name: 'React', description: 'Component-based UI architecture' },
      { name: 'TypeScript', description: 'Type-safe JavaScript at scale' },
      { name: 'Tailwind CSS', description: 'Utility-first styling system' },
      { name: 'Vite', description: 'Fast build tooling and dev server' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    description: 'Server-side logic and API design',
    technologies: [
      { name: 'Node.js', description: 'JavaScript runtime for servers' },
      { name: 'Express', description: 'Minimal web framework for Node' },
      { name: 'Python', description: 'General-purpose scripting and data' },
      { name: 'GraphQL', description: 'Query language for APIs' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: 'Database',
    description: 'Data modeling and persistence',
    technologies: [
      { name: 'PostgreSQL', description: 'Relational database with JSON support' },
      { name: 'Redis', description: 'In-memory cache and message broker' },
      { name: 'IndexedDB', description: 'Browser-side structured storage' },
      { name: 'SQLite', description: 'Embedded relational database' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    icon: 'Cloud',
    description: 'Deployment, automation, and infrastructure',
    technologies: [
      { name: 'Docker', description: 'Containerized development and deployment' },
      { name: 'AWS', description: 'Cloud hosting and managed services' },
      { name: 'GitHub Actions', description: 'CI/CD pipeline automation' },
      { name: 'Vercel', description: 'Frontend deployment platform' },
    ],
  },
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile / PWA' },
  { id: 'ai', label: 'AI / Creative' },
] as const;

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
  category: 'docs' | 'learning' | 'tools' | 'apis';
}

export const resources: ResourceLink[] = [
  { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Comprehensive web platform documentation — HTML, CSS, JavaScript, and APIs.', category: 'docs' },
  { title: 'React Documentation', url: 'https://react.dev', description: 'Official React docs with tutorials, API reference, and best practices.', category: 'docs' },
  { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', description: 'Complete guide to TypeScript types, generics, and configuration.', category: 'docs' },
  { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', description: 'Utility-first CSS framework documentation and examples.', category: 'docs' },
  { title: 'Vite Guide', url: 'https://vitejs.dev/guide/', description: 'Modern build tool documentation with configuration and plugins.', category: 'docs' },
  { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: 'Free coding curriculum covering full-stack development and more.', category: 'learning' },
  { title: 'The Odin Project', url: 'https://www.theodinproject.com', description: 'Open-source full-stack curriculum with project-based learning.', category: 'learning' },
  { title: 'Frontend Masters', url: 'https://frontendmasters.com', description: 'In-depth video courses on front-end and JavaScript engineering.', category: 'learning' },
  { title: 'JavaScript.info', url: 'https://javascript.info', description: 'Detailed JavaScript tutorial from basics to advanced topics.', category: 'learning' },
  { title: 'CSS Tricks', url: 'https://css-tricks.com', description: 'Practical CSS techniques, flexbox/grid guides, and snippets.', category: 'learning' },
  { title: 'GitHub', url: 'https://github.com', description: 'Host and collaborate on Git repositories with issue tracking.', category: 'tools' },
  { title: 'CodeSandbox', url: 'https://codesandbox.io', description: 'Online IDE for rapid prototyping and sharing web projects.', category: 'tools' },
  { title: 'StackBlitz', url: 'https://stackblitz.com', description: 'Browser-based IDE powered by WebContainers for Node.js projects.', category: 'tools' },
  { title: 'Esbuild', url: 'https://esbuild.github.io', description: 'Extremely fast JavaScript bundler and minifier.', category: 'tools' },
  { title: 'Can I Use', url: 'https://caniuse.com', description: 'Browser support tables for modern web platform features.', category: 'tools' },
  { title: 'Postman', url: 'https://www.postman.com', description: 'API development and testing platform with collaboration features.', category: 'apis' },
  { title: 'Public APIs Directory', url: 'https://github.com/public-apis/public-apis', description: 'Curated list of free APIs for development and prototyping.', category: 'apis' },
  { title: 'REST API Tutorial', url: 'https://restfulapi.net', description: 'REST API design guide with examples and best practices.', category: 'apis' },
  { title: 'Supabase Docs', url: 'https://supabase.com/docs', description: 'Open-source backend-as-a-service with database, auth, and storage.', category: 'apis' },
  { title: 'GraphQL Foundation', url: 'https://graphql.org/learn/', description: 'Learn GraphQL query language, schema design, and ecosystem tools.', category: 'apis' },
];

export const resourceCategories = [
  { id: 'all', label: 'All' },
  { id: 'docs', label: 'Documentation' },
  { id: 'learning', label: 'Learning' },
  { id: 'tools', label: 'Tools' },
  { id: 'apis', label: 'APIs' },
] as const;

export const snippetLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'SQL', 'CSS', 'HTML', 'Bash', 'JSON',
] as const;

export const sampleSnippets = [
  {
    id: 'sample-1',
    title: 'Debounce function',
    language: 'JavaScript' as const,
    code: 'function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}',
  },
  {
    id: 'sample-2',
    title: 'React useFetch hook',
    language: 'TypeScript' as const,
    code: 'function useFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(d => { setData(d); setLoading(false); });\n  }, [url]);\n  return { data, loading };\n}',
  },
  {
    id: 'sample-3',
    title: 'Python list comprehension',
    language: 'Python' as const,
    code: 'squares = [x ** 2 for x in range(10) if x % 2 == 0]\nprint(squares)  # [0, 4, 16, 36, 64]',
  },
];

export interface MiniProject {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  createdAt: string;
  isSample?: boolean;
}

export const sampleMiniProjects: MiniProject[] = [
  { id: 'mp-sample-1', name: 'Portfolio Redesign', description: 'Refresh the portfolio with new tools and improved navigation.', status: 'completed', createdAt: '2026-09-01T00:00:00.000Z', isSample: true },
  { id: 'mp-sample-2', name: 'Blog Engine', description: 'Build a lightweight Markdown-based blog with syntax highlighting.', status: 'in-progress', createdAt: '2026-09-15T00:00:00.000Z', isSample: true },
  { id: 'mp-sample-3', name: 'CLI Task Manager', description: 'A terminal-based task manager with priority levels and due dates.', status: 'planned', createdAt: '2026-10-01T00:00:00.000Z', isSample: true },
];
