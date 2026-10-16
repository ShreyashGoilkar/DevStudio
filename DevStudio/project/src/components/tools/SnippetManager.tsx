import { useState, useMemo } from 'react';
import { Code2, Search, Plus, Copy, Edit2, Trash2, X, Save, FileCode } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import { snippetLanguages, sampleSnippets } from '@/data';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

export default function SnippetManager() {
  const [snippets, setSnippets] = useLocalStorage<Snippet[]>('devstudio_snippets', sampleSnippets);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const toast = useToast();

  const [formData, setFormData] = useState({ title: '', language: 'JavaScript', code: '' });

  const filtered = useMemo(() => {
    return snippets.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
      const matchesLang = langFilter === 'all' || s.language === langFilter;
      return matchesSearch && matchesLang;
    });
  }, [snippets, search, langFilter]);

  const openNew = () => {
    setEditing(null);
    setFormData({ title: '', language: 'JavaScript', code: '' });
    setShowForm(true);
  };

  const openEdit = (snippet: Snippet) => {
    setEditing(snippet);
    setFormData({ title: snippet.title, language: snippet.language, code: snippet.code });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast('Title is required', 'error');
      return;
    }
    if (!formData.code.trim()) {
      toast('Code is required', 'error');
      return;
    }
    if (editing) {
      setSnippets(prev => prev.map(s => s.id === editing.id ? { ...s, ...formData } : s));
      toast('Snippet updated', 'success');
    } else {
      const newSnippet: Snippet = { id: crypto.randomUUID(), ...formData };
      setSnippets(prev => [newSnippet, ...prev]);
      toast('Snippet created', 'success');
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
    setConfirmDelete(null);
    toast('Snippet deleted', 'success');
  };

  const handleCopy = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast(`Copied "${title}"`, 'success');
    } catch {
      toast('Failed to copy', 'error');
    }
  };

  const usedLanguages = useMemo(() => {
    const langs = new Set(snippets.map(s => s.language));
    return snippetLanguages.filter(l => langs.has(l));
  }, [snippets]);

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f9a826]/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-[#f9a826]" />
          </div>
          <div>
            <h3 className="font-semibold">Code Snippet Manager</h3>
            <p className="text-xs text-[#8a8aa0]">{snippets.length} snippet{snippets.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all whitespace-nowrap">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a6e]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search snippets..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
          />
        </div>
        <select
          value={langFilter}
          onChange={e => setLangFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#3ddc97]/40 transition-all"
        >
          <option value="all">All Languages</option>
          {usedLanguages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Snippet list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <FileCode className="w-10 h-10 text-[#2a2a3a] mx-auto mb-3" />
            <p className="text-[#8a8aa0] text-sm">{search || langFilter !== 'all' ? 'No snippets match your filters.' : 'No snippets yet. Create your first one!'}</p>
          </div>
        ) : (
          filtered.map(snippet => (
            <div key={snippet.id} className="rounded-xl bg-[#0f0f17] border border-[#2a2a3a] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a3a]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2a2a3a] text-[#8a8aa0] shrink-0">{snippet.language}</span>
                  <span className="font-medium text-sm truncate">{snippet.title}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleCopy(snippet.code, snippet.title)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#8a8aa0] hover:text-[#3ddc97] transition-colors" aria-label="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => openEdit(snippet)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#8a8aa0] hover:text-[#5b8def] transition-colors" aria-label="Edit">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {confirmDelete === snippet.id ? (
                    <button onClick={() => handleDelete(snippet.id)} className="px-2 h-8 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors">
                      Confirm
                    </button>
                  ) : (
                    <button onClick={() => setConfirmDelete(snippet.id)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#8a8aa0] hover:text-red-400 transition-colors" aria-label="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <pre className="px-4 py-3 text-xs font-mono text-[#e4e4ef] overflow-x-auto max-h-32"><code>{snippet.code}</code></pre>
            </div>
          ))
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative glass rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{editing ? 'Edit Snippet' : 'New Snippet'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Title</label>
                <input
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Debounce function"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Language</label>
                <select
                  value={formData.language}
                  onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#3ddc97]/40 transition-all"
                >
                  {snippetLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Code</label>
                <textarea
                  value={formData.code}
                  onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Write your code here..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm font-mono text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all resize-none"
                  spellCheck={false}
                />
              </div>
              <button onClick={handleSave} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#3ddc97] text-[#0a0a0f] font-semibold hover:bg-[#3ddc97]/90 transition-all">
                <Save className="w-4 h-4" /> {editing ? 'Update Snippet' : 'Save Snippet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
