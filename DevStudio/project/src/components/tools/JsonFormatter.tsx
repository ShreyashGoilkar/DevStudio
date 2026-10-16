import { useState } from 'react';
import { Braces, Copy, Minimize2, Maximize2, Trash2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const exampleJson = `{
  "project": "DevStudio",
  "version": "1.0.0",
  "features": ["portfolio", "devtools", "project-manager"],
  "config": {
    "theme": "dark",
    "language": "typescript",
    "tools": 4
  }
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
      toast('JSON formatted successfully', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setOutput('');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify.');
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
      toast('JSON minified successfully', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) {
      toast('Nothing to copy yet', 'info');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      toast('Copied to clipboard', 'success');
    } catch {
      toast('Failed to copy', 'error');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleExample = () => {
    setInput(exampleJson);
    setError(null);
  };

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#3ddc97]/10 flex items-center justify-center">
          <Braces className="w-5 h-5 text-[#3ddc97]" />
        </div>
        <div>
          <h3 className="font-semibold">JSON Formatter & Validator</h3>
          <p className="text-xs text-[#8a8aa0]">Validate, format, and minify JSON</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#8a8aa0] mb-2 uppercase tracking-wider">Input</label>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setError(null); }}
            placeholder='{"key": "value"}'
            rows={10}
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f17] border border-[#2a2a3a] text-sm font-mono text-white placeholder:text-[#5a5a6e] focus:outline-none focus:border-[#3ddc97]/40 focus:ring-2 focus:ring-[#3ddc97]/15 transition-all resize-none"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#8a8aa0] mb-2 uppercase tracking-wider">Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here"
            rows={10}
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f17] border border-[#2a2a3a] text-sm font-mono text-[#3ddc97] placeholder:text-[#5a5a6e] focus:outline-none resize-none"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {!error && output && (
        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-[#3ddc97]/10 border border-[#3ddc97]/20 text-[#3ddc97] text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Valid JSON</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={handleFormat} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all">
          <Maximize2 className="w-4 h-4" /> Format
        </button>
        <button onClick={handleMinify} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-[#3ddc97]/30 transition-all">
          <Minimize2 className="w-4 h-4" /> Minify
        </button>
        <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-[#3ddc97]/30 transition-all">
          <Copy className="w-4 h-4" /> Copy
        </button>
        <button onClick={handleExample} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-[#3ddc97]/30 transition-all">
          <FileText className="w-4 h-4" /> Example
        </button>
        <button onClick={handleClear} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-red-500/30 hover:text-red-400 transition-all">
          <Trash2 className="w-4 h-4" /> Clear
        </button>
      </div>
    </div>
  );
}
