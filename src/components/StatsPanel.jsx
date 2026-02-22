import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, Zap, AlertTriangle, AlertCircle, RotateCcw, Brain } from 'lucide-react';
import { getTotalPrice, getEstimatedWattage, getBuildTier, checkCompatibility } from '@/data/compatibility';
import { Badge } from '@/components/ui/badge';
import { useLlmFit } from '@/hooks/useLlmFit';
import LlmFitDialog from '@/components/LlmFitDialog';

export default function StatsPanel({ selectedParts, completedCount, totalSteps, onReset }) {
  const total = getTotalPrice(selectedParts);
  const wattage = getEstimatedWattage(selectedParts);
  const tier = getBuildTier(total);
  const { issues, warnings } = useMemo(() => checkCompatibility(selectedParts), [selectedParts]);
  const { systemSpecs, fittingModels, totalModels } = useLlmFit(selectedParts);
  const [llmDialogOpen, setLlmDialogOpen] = useState(false);
  const showLlmSection = systemSpecs.gpuVramGb > 0 || systemSpecs.systemRamGb > 0;
  const gpuModelCount = fittingModels.filter(m => m.runMode === 'gpu').length;

  const psuWattage = selectedParts.psu?.specs?.wattage || 0;
  const psuLoad = psuWattage > 0 ? Math.round((wattage / psuWattage) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-3 pt-3 pb-2 border-b border-border/50">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-foreground">Build Stats</h2>
          {completedCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive transition-colors"
              title="Reset build"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground">
          {completedCount} part{completedCount !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {/* Total Price */}
        <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase">Total Price</span>
          </div>
          <p className="text-xl font-bold text-foreground">${total.toLocaleString()}</p>
          {total > 0 && (
            <Badge
              variant="outline"
              className="mt-1 text-[9px]"
              style={{ borderColor: tier.color + '50', color: tier.color }}
            >
              {tier.icon} {tier.name} Build
            </Badge>
          )}
        </div>

        {/* Wattage */}
        <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase">Power Draw</span>
          </div>
          <p className="text-lg font-bold text-foreground">{wattage}W</p>

          {/* PSU Load Bar */}
          {psuWattage > 0 && (
            <div className="mt-1.5">
              <div className="flex justify-between text-[9px] text-muted-foreground mb-0.5">
                <span>PSU Load</span>
                <span>{psuLoad}% of {psuWattage}W</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    psuLoad > 90 ? 'bg-red-500' : psuLoad > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  )}
                  style={{ width: `${Math.min(psuLoad, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* LLM Ready */}
        {showLlmSection && (
          <div className="p-2 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-1.5 mb-1">
              <Brain className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase">LLM Ready</span>
            </div>
            <p className="text-lg font-bold text-foreground">{fittingModels.length} models</p>
            <p className="text-[9px] text-muted-foreground mb-1.5">
              {gpuModelCount > 0
                ? `${gpuModelCount} can run on GPU`
                : 'CPU inference available'}
            </p>
            <button
              onClick={() => setLlmDialogOpen(true)}
              className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all →
            </button>
          </div>
        )}

        <LlmFitDialog
          open={llmDialogOpen}
          onOpenChange={setLlmDialogOpen}
          systemSpecs={systemSpecs}
          fittingModels={fittingModels}
          totalModels={totalModels}
        />

        {/* Compatibility Issues */}
        {issues.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[10px] font-medium text-red-400 uppercase">
              <AlertCircle className="w-3 h-3" />
              <span>Issues ({issues.length})</span>
            </div>
            {issues.map((issue, i) => (
              <div key={i} className="p-2 rounded-md bg-red-500/10 border border-red-500/20">
                <p className="text-[10px] font-semibold text-red-400 mb-0.5">{issue.category}</p>
                <p className="text-[9px] text-red-300/80 leading-relaxed">{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[10px] font-medium text-amber-400 uppercase">
              <AlertTriangle className="w-3 h-3" />
              <span>Warnings ({warnings.length})</span>
            </div>
            {warnings.map((warning, i) => (
              <div key={i} className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                <p className="text-[10px] font-semibold text-amber-400 mb-0.5">{warning.category}</p>
                <p className="text-[9px] text-amber-300/80 leading-relaxed">{warning.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {total === 0 && (
          <div className="py-4 text-center">
            <p className="text-[10px] text-muted-foreground/50">
              Start dragging parts to see stats
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
