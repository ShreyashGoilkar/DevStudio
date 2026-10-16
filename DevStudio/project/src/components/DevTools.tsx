import { Wrench } from 'lucide-react';
import JsonFormatter from '@/components/tools/JsonFormatter';
import ColorPalette from '@/components/tools/ColorPalette';
import SnippetManager from '@/components/tools/SnippetManager';
import ResourceDirectory from '@/components/tools/ResourceDirectory';

export default function DevTools() {
  return (
    <section className="relative min-h-screen py-24 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="glow-orb w-80 h-80 bg-[#5b8def] top-20 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#3ddc97] font-mono text-sm">{'// 02. Developer Tools'}</span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">Developer Workspace</h2>
          <p className="mt-4 text-[#8a8aa0] max-w-2xl mx-auto">
            A set of practical tools built right into the browser. Format JSON, generate palettes,
            manage code snippets, and discover developer resources.
          </p>
        </div>

        <div className="space-y-6">
          <JsonFormatter />
          <div className="grid lg:grid-cols-2 gap-6">
            <ColorPalette />
            <ResourceDirectory />
          </div>
          <SnippetManager />
        </div>
      </div>
    </section>
  );
}
