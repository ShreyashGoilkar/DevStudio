import { useState, useMemo } from 'react';
import { BookOpen, Search, ExternalLink } from 'lucide-react';
import { resources, resourceCategories } from '@/data';

export default function ResourceDirectory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || r.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#5b8def]/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#5b8def]" />
        </div>
        <div>
          <h3 className="font-semibold">Developer Resource Directory</h3>
          <p className="text-xs text-[#8a8aa0]">{resources.length} curated resources</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a6e]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {resourceCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter === cat.id ? 'bg-[#3ddc97] text-[#0a0a0f]' : 'bg-[#0f0f17] border border-[#2a2a3a] text-[#8a8aa0] hover:text-white'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <BookOpen className="w-10 h-10 text-[#2a2a3a] mx-auto mb-3" />
            <p className="text-[#8a8aa0] text-sm">No resources match your search.</p>
          </div>
        ) : (
          filtered.map(r => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-[#0f0f17] border border-[#2a2a3a] p-4 hover:border-[#3ddc97]/30 transition-all card-hover"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-sm group-hover:text-[#3ddc97] transition-colors">{r.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5a5a6e] group-hover:text-[#3ddc97] transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="mt-1.5 text-xs text-[#8a8aa0] leading-relaxed">{r.description}</p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#2a2a3a] text-[#8a8aa0]">{r.category}</span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
