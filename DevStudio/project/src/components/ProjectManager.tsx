import { useState, useMemo } from 'react';
import { FolderKanban, Plus, Search, Edit2, Trash2, X, Save, CircleDot, Clock, CheckCircle2, Layers } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import { sampleMiniProjects, type MiniProject } from '@/data';

const statuses = [
  { id: 'planned', label: 'Planned', Icon: CircleDot, color: '#8a8aa0', bg: 'bg-[#8a8aa0]/10 text-[#8a8aa0] border-[#8a8aa0]/20' },
  { id: 'in-progress', label: 'In Progress', Icon: Clock, color: '#f9a826', bg: 'bg-[#f9a826]/10 text-[#f9a826] border-[#f9a826]/20' },
  { id: 'completed', label: 'Completed', Icon: CheckCircle2, color: '#3ddc97', bg: 'bg-[#3ddc97]/10 text-[#3ddc97] border-[#3ddc97]/20' },
] as const;

type StatusId = (typeof statuses)[number]['id'];

export default function ProjectManager() {
  const [projects, setProjects] = useLocalStorage<MiniProject[]>('devstudio_mini_projects', sampleMiniProjects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MiniProject | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'planned' as StatusId });
  const toast = useToast();

  const counts = useMemo(() => ({
    total: projects.length,
    planned: projects.filter(p => p.status === 'planned').length,
    'in-progress': projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
  }), [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const openNew = () => {
    setEditing(null);
    setFormData({ name: '', description: '', status: 'planned' });
    setShowForm(true);
  };

  const openEdit = (p: MiniProject) => {
    setEditing(p);
    setFormData({ name: p.name, description: p.description, status: p.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast('Project name is required', 'error');
      return;
    }
    if (!formData.description.trim()) {
      toast('Description is required', 'error');
      return;
    }
    if (editing) {
      setProjects(prev => prev.map(p => p.id === editing.id ? { ...p, ...formData } : p));
      toast('Project updated', 'success');
    } else {
      const newProject: MiniProject = {
        id: crypto.randomUUID(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
        createdAt: new Date().toISOString(),
      };
      setProjects(prev => [newProject, ...prev]);
      toast('Project created', 'success');
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setConfirmDelete(null);
    toast('Project deleted', 'success');
  };

  const handleStatusChange = (id: string, status: StatusId) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const clearSamples = () => {
    setProjects(prev => prev.filter(p => !p.isSample));
    toast('Sample projects removed', 'success');
  };

  const getStatusMeta = (status: string) => statuses.find(s => s.id === status) ?? statuses[0];

  return (
    <section className="relative min-h-screen py-24 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-[#f9a826] bottom-0 left-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#3ddc97] font-mono text-sm">{'// 03. Project Manager'}</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">Mini Project Manager</h2>
          <p className="mt-4 text-[#8a8aa0] max-w-2xl mx-auto">
            Track your project ideas with a lightweight board. Add, edit, and organize by status — all saved in your browser.
          </p>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-[#8a8aa0]" />
              <span className="text-xs text-[#8a8aa0] uppercase tracking-wider">Total</span>
            </div>
            <div className="text-2xl font-bold">{counts.total}</div>
          </div>
          {statuses.map(s => {
            const Icon = s.Icon;
            return (
              <div key={s.id} className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                  <span className="text-xs text-[#8a8aa0] uppercase tracking-wider">{s.label}</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{counts[s.id]}</div>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a6e]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#3ddc97]/40 transition-all"
          >
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button onClick={openNew} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all whitespace-nowrap">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* Sample data banner */}
        {projects.some(p => p.isSample) && (
          <div className="flex items-center justify-between gap-2 mb-4 px-4 py-3 rounded-xl bg-[#5b8def]/5 border border-[#5b8def]/15 text-sm">
            <span className="text-[#8a8aa0]">
              <span className="text-[#5b8def] font-medium">Sample projects</span> are shown as examples. You can remove them anytime.
            </span>
            <button onClick={clearSamples} className="text-[#8a8aa0] hover:text-red-400 transition-colors text-xs font-medium whitespace-nowrap">
              Remove samples
            </button>
          </div>
        )}

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <FolderKanban className="w-12 h-12 text-[#2a2a3a] mx-auto mb-4" />
              <p className="text-[#8a8aa0]">{search || statusFilter !== 'all' ? 'No projects match your filters.' : 'No projects yet. Create your first one!'}</p>
            </div>
          ) : (
            filtered.map(p => {
              const meta = getStatusMeta(p.status);
              const Icon = meta.Icon;
              return (
                <div key={p.id} className="glass rounded-xl p-5 card-hover">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${meta.bg} flex items-center gap-1`}>
                        <Icon className="w-2.5 h-2.5" /> {meta.label}
                      </span>
                      {p.isSample && <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#5b8def]/10 text-[#5b8def] border border-[#5b8def]/20">Sample</span>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openEdit(p)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#8a8aa0] hover:text-[#5b8def] transition-colors" aria-label="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {confirmDelete === p.id ? (
                        <button onClick={() => handleDelete(p.id)} className="px-2 h-7 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors">
                          Confirm
                        </button>
                      ) : (
                        <button onClick={() => setConfirmDelete(p.id)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#8a8aa0] hover:text-red-400 transition-colors" aria-label="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{p.name}</h3>
                  <p className="text-sm text-[#8a8aa0] leading-relaxed mb-3">{p.description}</p>
                  <select
                    value={p.status}
                    onChange={e => handleStatusChange(p.id, e.target.value as StatusId)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-xs text-white focus:outline-none focus:border-[#3ddc97]/40 transition-all"
                  >
                    {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative glass rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{editing ? 'Edit Project' : 'New Project'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Portfolio Redesign"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the project..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8a8aa0] mb-1.5 uppercase tracking-wider">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as StatusId }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f17] border border-[#2a2a3a] text-sm text-white focus:outline-none focus:border-[#3ddc97]/40 transition-all"
                >
                  {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <button onClick={handleSave} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#3ddc97] text-[#0a0a0f] font-semibold hover:bg-[#3ddc97]/90 transition-all">
                <Save className="w-4 h-4" /> {editing ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
