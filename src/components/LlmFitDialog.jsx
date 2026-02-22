import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cpu, Monitor, Layers } from 'lucide-react';

const RUN_MODE_CONFIG = {
  gpu: { label: 'GPU Inference', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: Monitor, sectionTitle: 'GPU Inference' },
  cpuOffload: { label: 'CPU + GPU', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: Layers, sectionTitle: 'CPU + GPU Offload' },
  cpuOnly: { label: 'CPU Only', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: Cpu, sectionTitle: 'CPU Only' },
};

function ModelRow({ model }) {
  const config = RUN_MODE_CONFIG[model.runMode];
  const shortName = model.name.split('/').pop();

  return (
    <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-medium text-foreground truncate">{shortName}</span>
          <Badge variant="outline" className={`text-[8px] px-1 py-0 ${config.color}`}>
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] text-muted-foreground">{model.provider}</span>
          <span className="text-[9px] text-muted-foreground/50">|</span>
          <span className="text-[9px] text-muted-foreground">{model.parameter_count}</span>
          <span className="text-[9px] text-muted-foreground/50">|</span>
          <span className="text-[9px] text-muted-foreground">{model.quantization}</span>
        </div>
        <p className="text-[9px] text-muted-foreground/70 mt-0.5">{model.use_case}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[9px] text-muted-foreground">VRAM: {model.min_vram_gb} GB</p>
        <p className="text-[9px] text-muted-foreground">RAM: {model.min_ram_gb} GB</p>
      </div>
    </div>
  );
}

function ModeSection({ mode, models }) {
  if (models.length === 0) return null;
  const config = RUN_MODE_CONFIG[mode];
  const Icon = config.icon;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 px-1 pt-2 pb-1 sticky top-0 bg-background z-10">
        <Icon className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] font-medium text-muted-foreground uppercase">{config.sectionTitle}</span>
        <span className="text-[9px] text-muted-foreground/60">({models.length})</span>
      </div>
      {models.map((model) => (
        <ModelRow key={model.name} model={model} />
      ))}
    </div>
  );
}

export default function LlmFitDialog({ open, onOpenChange, systemSpecs, fittingModels, totalModels }) {
  const grouped = { gpu: [], cpuOffload: [], cpuOnly: [] };
  for (const model of fittingModels) {
    grouped[model.runMode].push(model);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base">LLM Compatibility</DialogTitle>
          <DialogDescription className="text-xs">
            {fittingModels.length} of {totalModels} models can run on your build
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 p-2 rounded-lg bg-muted/30 border border-border/30 text-[10px]">
          <div>
            <span className="text-muted-foreground uppercase font-medium">GPU VRAM</span>
            <p className="text-sm font-bold text-foreground">{systemSpecs.gpuVramGb > 0 ? `${systemSpecs.gpuVramGb} GB` : 'None'}</p>
          </div>
          <div className="border-l border-border/30 pl-3">
            <span className="text-muted-foreground uppercase font-medium">System RAM</span>
            <p className="text-sm font-bold text-foreground">{systemSpecs.systemRamGb > 0 ? `${systemSpecs.systemRamGb} GB` : 'None'}</p>
          </div>
        </div>

        {fittingModels.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xs text-muted-foreground">No compatible models found for your current specs.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 -mx-6 px-6 overflow-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
            <div className="space-y-1 pb-2">
              <ModeSection mode="gpu" models={grouped.gpu} />
              <ModeSection mode="cpuOffload" models={grouped.cpuOffload} />
              <ModeSection mode="cpuOnly" models={grouped.cpuOnly} />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
