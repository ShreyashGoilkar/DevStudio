import { Code2, ArrowUp, Github } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-[#2a2a3a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ddc97] to-[#5b8def] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-[#0a0a0f]" strokeWidth={2.5} />
            </div>
            <span className="font-bold">DevStudio</span>
            <span className="text-sm text-[#8a8aa0] ml-2">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#8a8aa0] hover:text-[#3ddc97] transition-all hover:scale-110">
              <Github className="w-4 h-4" />
            </a>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#8a8aa0] hover:text-[#3ddc97] transition-all hover:scale-110" aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#5a5a6e]">
          Built with React, TypeScript, Tailwind CSS, and Vite. An open-source developer workspace.
        </p>
      </div>
    </footer>
  );
}
