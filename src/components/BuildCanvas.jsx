import CaseOutline from './CaseOutline';
import CanvasSlot from './CanvasSlot';
import { BUILD_STEPS } from '@/data/canvasLayout';

export default function BuildCanvas({ selectedParts, slotStates, onPartClick, activeDragCategory }) {
  const hasCase = !!selectedParts.case;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Canvas container with 4:3 aspect ratio */}
      <div className="relative w-full max-w-[720px] aspect-[4/3] canvas-grid rounded-xl overflow-hidden border border-border/50 bg-card/30">
        {/* SVG decorative layer */}
        <CaseOutline hasPart={hasCase} />

        {/* Interactive HTML slot layer */}
        {BUILD_STEPS.map((step) => (
          <CanvasSlot
            key={step.category}
            category={step.category}
            state={slotStates[step.category]}
            part={selectedParts[step.category]}
            onPartClick={onPartClick}
            activeDragCategory={activeDragCategory}
          />
        ))}

        {/* Empty state hint */}
        {!hasCase && slotStates.case !== 'active' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground/30 font-medium">
              Select a case to start building
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
