import { useMemo } from 'react';
import { LLM_MODELS } from '@/data/llmModels';

function parseGb(str) {
  if (!str) return 0;
  const match = str.match(/([\d.]+)\s*GB/i);
  return match ? parseFloat(match[1]) : 0;
}

export function useLlmFit(selectedParts) {
  return useMemo(() => {
    const gpuVramGb = parseGb(selectedParts.gpu?.specs?.vram);
    const systemRamGb = parseGb(selectedParts.ram?.specs?.capacity);
    const hasGpu = gpuVramGb > 0;
    const hasRam = systemRamGb > 0;

    if (!hasGpu && !hasRam) {
      return { systemSpecs: { gpuVramGb: 0, systemRamGb: 0 }, fittingModels: [], totalModels: LLM_MODELS.length };
    }

    const classified = [];

    for (const model of LLM_MODELS) {
      let runMode;

      if (hasGpu && model.min_vram_gb <= gpuVramGb) {
        runMode = 'gpu';
      } else if (hasGpu && model.min_ram_gb <= systemRamGb + gpuVramGb) {
        runMode = 'cpuOffload';
      } else if (!hasGpu && hasRam && model.min_ram_gb <= systemRamGb) {
        runMode = 'cpuOnly';
      } else {
        continue;
      }

      classified.push({ ...model, runMode });
    }

    const modeOrder = { gpu: 0, cpuOffload: 1, cpuOnly: 2 };
    classified.sort((a, b) => {
      const modeDiff = modeOrder[a.runMode] - modeOrder[b.runMode];
      if (modeDiff !== 0) return modeDiff;
      return (b.hf_downloads || 0) - (a.hf_downloads || 0);
    });

    return {
      systemSpecs: { gpuVramGb, systemRamGb },
      fittingModels: classified,
      totalModels: LLM_MODELS.length,
    };
  }, [selectedParts]);
}
