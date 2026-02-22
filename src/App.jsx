import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Cpu } from 'lucide-react';
import StepProgressBar from './components/StepProgressBar';
import BuildCanvas from './components/BuildCanvas';
import PartsTray from './components/PartsTray';
import StatsPanel from './components/StatsPanel';
import PresetBuilds from './components/PresetBuilds';
import DragOverlayCard from './components/DragOverlayCard';
import PartDetailDialog from './components/PartDetailDialog';
import { useBuildFlow } from './hooks/useBuildFlow';

const INITIAL_STATE = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  psu: null,
  case: null,
  cooler: null,
};

export default function App() {
  const [selectedParts, setSelectedParts] = useState(INITIAL_STATE);
  const [activeDrag, setActiveDrag] = useState(null);
  const [detailDialog, setDetailDialog] = useState({ open: false, category: null, part: null });

  const {
    currentStepIndex,
    currentCategory,
    slotStates,
    goToStep,
    goToCategory,
    scheduleAutoAdvance,
    canDrop,
    completedCount,
    totalSteps,
  } = useBuildFlow(selectedParts);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragStart = useCallback((event) => {
    const { part, category } = event.active.data.current;
    setActiveDrag({ part, category });
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (!over) return;

    const dropCategory = over.data?.current?.category;
    const dragCategory = active.data?.current?.category;
    const dragPart = active.data?.current?.part;

    if (dropCategory && dragCategory === dropCategory && dragPart) {
      // Check if the slot is not locked
      if (canDrop(dragCategory, dropCategory)) {
        setSelectedParts((prev) => ({
          ...prev,
          [dropCategory]: prev[dropCategory]?.id === dragPart.id ? null : dragPart,
        }));
        scheduleAutoAdvance();
      }
    }
  }, [canDrop, scheduleAutoAdvance]);

  const handleRemovePart = useCallback((category) => {
    setSelectedParts((prev) => ({ ...prev, [category]: null }));
    goToCategory(category);
  }, [goToCategory]);

  const handleReset = useCallback(() => {
    setSelectedParts(INITIAL_STATE);
    goToStep(0);
  }, [goToStep]);

  const handleApplyPreset = useCallback((parts) => {
    setSelectedParts(parts);
  }, []);

  const handlePartClick = useCallback((category, part) => {
    setDetailDialog({ open: true, category, part });
  }, []);

  return (
    <TooltipProvider>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="h-screen flex flex-col overflow-hidden bg-background">
          {/* Top bar with logo + step progress + presets */}
          <header className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 h-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-foreground tracking-tight">PartForge</span>
              </div>
              <PresetBuilds onApplyPreset={handleApplyPreset} />
            </div>
            <StepProgressBar
              currentStepIndex={currentStepIndex}
              slotStates={slotStates}
              onStepClick={goToStep}
            />
          </header>

          {/* Main 3-column layout */}
          <main className="flex-1 flex min-h-0">
            {/* Left: Parts Tray */}
            <aside className="w-72 shrink-0 border-r border-border bg-card/30 flex flex-col min-h-0">
              <PartsTray
                currentCategory={currentCategory}
                selectedParts={selectedParts}
                onRemovePart={handleRemovePart}
              />
            </aside>

            {/* Center: Canvas Workbench */}
            <section className="flex-1 min-w-0 min-h-0 flex flex-col">
              <BuildCanvas
                selectedParts={selectedParts}
                slotStates={slotStates}
                onPartClick={handlePartClick}
                activeDragCategory={activeDrag?.category}
              />
            </section>

            {/* Right: Stats Panel */}
            <aside className="w-56 shrink-0 border-l border-border bg-card/30 flex flex-col min-h-0">
              <StatsPanel
                selectedParts={selectedParts}
                completedCount={completedCount}
                totalSteps={totalSteps}
                onReset={handleReset}
              />
            </aside>
          </main>

          {/* Footer */}
          <footer className="shrink-0 border-t border-border px-4 py-1.5 flex items-center justify-between text-[10px] text-muted-foreground bg-card/30">
            <p>
              PartForge &middot; Prices & specs from{' '}
              <a
                href="https://www.pcpartpicker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                PCPartPicker.com
              </a>
            </p>
            <p>For educational / demo purposes only</p>
          </footer>
        </div>

        {/* Drag overlay */}
        <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
          {activeDrag ? (
            <DragOverlayCard part={activeDrag.part} category={activeDrag.category} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Part detail dialog */}
      <PartDetailDialog
        open={detailDialog.open}
        onOpenChange={(open) => setDetailDialog((prev) => ({ ...prev, open }))}
        category={detailDialog.category}
        part={detailDialog.part}
        onRemove={handleRemovePart}
      />
    </TooltipProvider>
  );
}
