import { useState, useCallback } from 'react';
import { Palette, Copy, RefreshCw, Check } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Swatch {
  hex: string;
  copied: boolean;
}

function generatePalette(): Swatch[] {
  const baseHue = randomInt(0, 360);
  const saturation = randomInt(45, 85);
  const lightnesses = [20, 35, 50, 65, 80];
  return lightnesses.map(l => ({ hex: hslToHex(baseHue, saturation, l), copied: false }));
}

export default function ColorPalette() {
  const [palette, setPalette] = useState<Swatch[]>(() => generatePalette());
  const toast = useToast();

  const regenerate = useCallback(() => {
    setPalette(generatePalette());
    toast('New palette generated', 'success');
  }, [toast]);

  const copyHex = async (index: number) => {
    const hex = palette[index].hex;
    try {
      await navigator.clipboard.writeText(hex);
      setPalette(prev => prev.map((s, i) => ({ ...s, copied: i === index })));
      toast(`Copied ${hex}`, 'success');
      setTimeout(() => {
        setPalette(prev => prev.map((s, i) => ({ ...s, copied: i === index ? false : s.copied })));
      }, 1500);
    } catch {
      toast('Failed to copy', 'error');
    }
  };

  const copyAll = async () => {
    const hexes = palette.map(s => s.hex).join(', ');
    try {
      await navigator.clipboard.writeText(hexes);
      toast('Full palette copied', 'success');
    } catch {
      toast('Failed to copy', 'error');
    }
  };

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#5b8def]/10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-[#5b8def]" />
        </div>
        <div>
          <h3 className="font-semibold">Color Palette Generator</h3>
          <p className="text-xs text-[#8a8aa0]">Generate coordinated color schemes</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
        {palette.map((swatch, i) => (
          <button
            key={i}
            onClick={() => copyHex(i)}
            className="group relative rounded-xl overflow-hidden aspect-[3/4] sm:aspect-square transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ddc97]/40"
            style={{ backgroundColor: swatch.hex }}
            aria-label={`Copy ${swatch.hex}`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/0 group-hover:bg-black/30 transition-colors">
              <span className="text-[10px] sm:text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: swatch.hex > '#888888' ? '#0a0a0f' : '#fff' }}>
                {swatch.copied ? <Check className="w-3 h-3" /> : swatch.hex}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={regenerate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3ddc97] text-[#0a0a0f] text-sm font-semibold hover:bg-[#3ddc97]/90 transition-all">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
        <button onClick={copyAll} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-medium hover:border-[#3ddc97]/30 transition-all">
          <Copy className="w-4 h-4" /> Copy All
        </button>
      </div>
    </div>
  );
}
