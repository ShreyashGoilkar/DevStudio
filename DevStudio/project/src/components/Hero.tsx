import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Sparkles, Layers, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      <div className="glow-orb w-96 h-96 bg-[#3ddc97] top-20 left-10" />
      <div className="glow-orb w-96 h-96 bg-[#5b8def] bottom-20 right-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4 text-[#3ddc97]" />
            <span className="text-sm text-[#8a8aa0]">Open-source developer workspace</span>
            <span className="w-2 h-2 rounded-full bg-[#3ddc97] animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Turning Ideas Into
            <br />
            <span className="gradient-text">Digital Experiences</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#8a8aa0] max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            DevStudio is a creative development workspace for building, organizing,
            and showcasing digital projects — with built-in tools developers actually use.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3ddc97] text-[#0a0a0f] font-semibold hover:bg-[#3ddc97]/90 transition-all hover:shadow-lg hover:shadow-[#3ddc97]/25 hover:scale-105"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/tools"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-white font-semibold hover:border-[#3ddc97]/40 transition-all hover:scale-105"
            >
              <Wrench className="w-4 h-4" />
              Explore Developer Tools
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { Icon: Layers, title: 'Project Showcase', desc: 'Browse an interactive gallery of demo projects with filtering and detail views.', link: '/projects' },
              { Icon: Wrench, title: 'Built-in Tools', desc: 'JSON formatter, palette generator, snippet manager, and resource directory.', link: '/tools' },
              { Icon: Zap, title: 'Project Manager', desc: 'Track project ideas with a lightweight board. Data persists in your browser.', link: '/manager' },
            ].map(({ Icon, title, desc, link }) => (
              <Link key={title} to={link} className="glass rounded-xl p-5 card-hover text-left">
                <div className="w-10 h-10 rounded-lg bg-[#3ddc97]/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#3ddc97]" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-[#8a8aa0] leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
