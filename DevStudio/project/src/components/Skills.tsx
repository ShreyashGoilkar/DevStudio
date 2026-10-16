import { Layout, Server, Database, Cloud, BookOpen, ExternalLink } from 'lucide-react';
import { techCategories } from '@/data';

const icons: Record<string, typeof Layout> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  devops: Cloud,
};

const learningResources = [
  { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
  { title: 'React Docs', url: 'https://react.dev' },
  { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
  { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
  { title: 'The Odin Project', url: 'https://www.theodinproject.com' },
  { title: 'JavaScript.info', url: 'https://javascript.info' },
];

export default function Skills() {
  return (
    <section className="relative min-h-screen py-24 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-[#5b8def] bottom-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#3ddc97] font-mono text-sm">{'// 04. Skills & Tech'}</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">Technology Stack</h2>
          <p className="mt-4 text-[#8a8aa0] max-w-2xl mx-auto">
            The technologies used to build DevStudio and its showcased projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {techCategories.map(cat => {
            const Icon = icons[cat.icon] ?? Layout;
            return (
              <div key={cat.id} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3ddc97]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#3ddc97]" />
                  </div>
                  <div>
                    <h3 className="font-bold">{cat.label}</h3>
                    <p className="text-xs text-[#8a8aa0]">{cat.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {cat.technologies.map(tech => (
                    <div key={tech.name} className="flex items-start gap-3 p-3 rounded-lg bg-[#0f0f17] border border-[#2a2a3a]">
                      <span className="px-2.5 py-1 rounded-md bg-[#2a2a3a] text-xs font-mono font-medium text-[#3ddc97] shrink-0">{tech.name}</span>
                      <span className="text-sm text-[#8a8aa0]">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning resources */}
        <div className="mt-10 glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#5b8def]/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#5b8def]" />
            </div>
            <div>
              <h3 className="font-semibold">Learning Resources</h3>
              <p className="text-xs text-[#8a8aa0]">Recommended documentation and courses</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {learningResources.map(r => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] hover:border-[#3ddc97]/30 transition-all text-sm"
              >
                <span className="group-hover:text-[#3ddc97] transition-colors">{r.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5a5a6e] group-hover:text-[#3ddc97] transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
