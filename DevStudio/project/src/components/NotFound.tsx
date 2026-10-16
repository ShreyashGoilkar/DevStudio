import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      <div className="glow-orb w-96 h-96 bg-[#5b8def] top-20 right-10" />

      <div className="relative z-10 text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-[#3ddc97]/10 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-10 h-10 text-[#3ddc97]" />
        </div>
        <h1 className="text-6xl font-extrabold tracking-tight mb-3">404</h1>
        <p className="text-lg text-[#8a8aa0] mb-8 max-w-md mx-auto">
          This page doesn't exist. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3ddc97] text-[#0a0a0f] font-semibold hover:bg-[#3ddc97]/90 transition-all hover:shadow-lg hover:shadow-[#3ddc97]/25"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
