import { useState, useMemo } from 'react';
import { Search, ExternalLink, Github, ChevronRight, X, Code2, Smartphone, Brain, Layers } from 'lucide-react';
import { projects, projectCategories, type Project } from '@/data';
import { useToast } from '@/hooks/useToast';

const categoryIcons: Record<string, typeof Code2> = {
  web: Code2,
  mobile: Smartphone,
  fullstack: Layers,
  ai: Brain,
};

export default function ProjectDeck() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const toast = useToast();

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter = filter === 'all' || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase()) || p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const resetFilters = () => {
    setFilter('all');
    setSearch('');
    toast('Filters reset', 'info');
  };

  return (
    <section className="relative min-h-screen py-24 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-[#3ddc97] top-40 -left-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#3ddc97] font-mono text-sm">{'// 01. Projects'}</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">Project Showcase</h2>
          <p className="mt-4 text-[#8a8aa0] max-w-2xl mx-auto">
            A curated gallery of demo projects. Browse by category, search by name or technology,
            and click any card for full details.
          </p>
        </div>

        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a6e]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or technology..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {projectCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat.id
                    ? 'bg-[#3ddc97] text-[#0a0a0f]'
                    : 'glass text-[#8a8aa0] hover:text-white hover:border-[#3ddc97]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => {
            const CatIcon = categoryIcons[p.category] ?? Code2;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="glass rounded-2xl p-5 text-left card-hover group focus:outline-none focus:ring-2 focus:ring-[#3ddc97]/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ddc97]/10 to-[#5b8def]/10 flex items-center justify-center">
                    <CatIcon className="w-6 h-6 text-[#3ddc97]" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${p.status === 'shipped' ? 'bg-[#3ddc97]/15 text-[#3ddc97]' : 'bg-[#f9a826]/15 text-[#f9a826]'}`}>
                    {p.status === 'shipped' ? 'Shipped' : 'In Progress'}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[#3ddc97] transition-colors">{p.title}</h3>
                <p className="text-sm text-[#3ddc97] font-medium mb-2">{p.tagline}</p>
                <p className="text-xs text-[#8a8aa0] leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-[#2a2a3a] text-[10px] font-mono text-[#8a8aa0]">{tech}</span>
                  ))}
                  {p.techStack.length > 3 && <span className="px-2 py-0.5 rounded-md bg-[#2a2a3a] text-[10px] font-mono text-[#8a8aa0]">+{p.techStack.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5a5a6e] font-mono">{p.year}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#3ddc97] group-hover:gap-2 transition-all">
                    View details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Code2 className="w-12 h-12 text-[#2a2a3a] mx-auto mb-4" />
            <p className="text-[#8a8aa0] mb-4">No projects match your filters.</p>
            <button onClick={resetFilters} className="px-4 py-2 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative glass rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 lg:p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${selected.status === 'shipped' ? 'bg-[#3ddc97]/15 text-[#3ddc97]' : 'bg-[#f9a826]/15 text-[#f9a826]'}`}>
              {selected.status === 'shipped' ? 'Shipped' : 'In Progress'} · {selected.year}
            </span>
            <h3 className="mt-4 text-2xl lg:text-3xl font-bold">{selected.title}</h3>
            <p className="text-[#3ddc97] text-sm font-medium mt-1">{selected.tagline}</p>
            <p className="mt-4 text-[#e4e4ef] leading-relaxed">{selected.longDescription}</p>

            <h4 className="mt-6 text-sm font-semibold text-[#8a8aa0] uppercase tracking-wider">Key Features</h4>
            <div className="mt-3 space-y-2.5">
              {selected.features.map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-[#3ddc97] mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>

            <h4 className="mt-6 text-sm font-semibold text-[#8a8aa0] uppercase tracking-wider">Tech Stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#2a2a3a] text-xs font-mono">{tech}</span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {selected.links.live && (
                <a href={selected.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {selected.links.source ? (
                <a href={selected.links.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-[#3ddc97]/30 transition-all">
                  <Github className="w-4 h-4" /> Source Code
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-[#5a5a6e]">
                  <Github className="w-4 h-4" /> Source not available
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
