import { PARTS } from '@/data/parts';
import { Sparkles } from 'lucide-react';

const PRESETS = [
  {
    name: 'Budget Gaming',
    desc: '1080p ~$800',
    color: '#10b981',
    parts: { cpu: 'cpu-3', gpu: 'gpu-7', motherboard: 'mobo-2', ram: 'ram-6', storage: 'storage-2', psu: 'psu-4', case: 'case-5', cooler: 'cooler-6' },
  },
  {
    name: 'Mid-Range Beast',
    desc: '1440p ~$1.8k',
    color: '#f59e0b',
    parts: { cpu: 'cpu-2', gpu: 'gpu-3', motherboard: 'mobo-2', ram: 'ram-1', storage: 'storage-1', psu: 'psu-2', case: 'case-4', cooler: 'cooler-4' },
  },
  {
    name: 'Ultimate 4K',
    desc: 'No limits',
    color: '#8b5cf6',
    parts: { cpu: 'cpu-7', gpu: 'gpu-1', motherboard: 'mobo-1', ram: 'ram-4', storage: 'storage-3', psu: 'psu-1', case: 'case-1', cooler: 'cooler-2' },
  },
  {
    name: 'Intel Workhorse',
    desc: 'Productivity',
    color: '#3b82f6',
    parts: { cpu: 'cpu-5', gpu: 'gpu-2', motherboard: 'mobo-5', ram: 'ram-5', storage: 'storage-1', psu: 'psu-2', case: 'case-2', cooler: 'cooler-3' },
  },
];

function resolvePreset(preset) {
  const resolved = {};
  for (const [category, partId] of Object.entries(preset.parts)) {
    const partList = PARTS[category];
    if (partList) {
      resolved[category] = partList.find((p) => p.id === partId) || null;
    }
  }
  return resolved;
}

export default function PresetBuilds({ onApplyPreset }) {
  return (
    <div className="flex items-center gap-1.5">
      <Sparkles className="w-3 h-3 text-primary shrink-0" />
      <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0 hidden lg:inline">
        Presets
      </span>
      <div className="flex gap-1 overflow-x-auto">
        {PRESETS.map((preset) => {
          const resolved = resolvePreset(preset);
          return (
            <button
              key={preset.name}
              onClick={() => onApplyPreset(resolved)}
              className="shrink-0 text-left px-2 py-1 rounded-md border border-border/50 bg-card/50 hover:bg-secondary/50 hover:border-primary/30 transition-all text-[10px]"
              title={preset.desc}
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: preset.color }} />
                <span className="font-semibold text-foreground whitespace-nowrap">{preset.name}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
