import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { SLOT_POSITIONS, SLOT_COLORS } from '@/data/canvasLayout';
import { CATEGORY_META } from '@/data/parts';
import PlacedPart from './PlacedPart';

export default function CanvasSlot({ category, state, part, onPartClick, activeDragCategory }) {
  const pos = SLOT_POSITIONS[category];
  const colors = SLOT_COLORS[category];
  const meta = CATEGORY_META[category];

  const { setNodeRef, isOver } = useDroppable({
    id: `canvas-${category}`,
    data: { category },
  });

  // Don't render a visible slot for "case" — it's the outer boundary
  if (category === 'case') {
    return (
      <div
        ref={setNodeRef}
        className={cn(
          'absolute inset-0 rounded-xl transition-all duration-300',
          state === 'active' && 'ring-2 ring-primary/40 slot-pulse',
          state === 'active' && isOver && 'ring-primary bg-primary/5',
        )}
        style={{ zIndex: 0 }}
      >
        {state === 'active' && !part && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/60 font-medium animate-pulse">
              Drop a case here to begin
            </span>
          </div>
        )}
        {part && (
          <div
            className="absolute top-2 left-2 cursor-pointer"
            onClick={() => onPartClick(category, part)}
          >
            <span className="text-[10px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors">
              {part.name}
            </span>
          </div>
        )}
      </div>
    );
  }

  const isMatchingDrag = activeDragCategory === category;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'absolute rounded-lg transition-all duration-300 overflow-hidden',
        // Active (current step)
        state === 'active' && 'slot-pulse',
        state === 'active' && isOver && 'scale-105',
        // Filled
        state === 'filled' && 'breathe',
        // Available (not current step, no part)
        state === 'available' && 'opacity-60 hover:opacity-80',
        state === 'available' && isOver && 'opacity-100 scale-105',
      )}
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        width: `${pos.width}%`,
        height: `${pos.height}%`,
        borderWidth: '1.5px',
        borderStyle: state === 'locked' ? 'dashed' : state === 'filled' ? 'solid' : 'dashed',
        borderColor: state === 'active' || state === 'filled'
          ? colors.border
          : state === 'available'
            ? colors.border + '60'
            : colors.border + '30',
        backgroundColor: isOver && isMatchingDrag
          ? colors.bg.replace('0.08', '0.2')
          : state === 'filled'
            ? colors.bg
            : state === 'active'
              ? colors.bg
              : 'transparent',
        boxShadow: state === 'active'
          ? `0 0 12px ${colors.glow}, inset 0 0 8px ${colors.glow.replace('0.4', '0.1')}`
          : state === 'filled'
            ? `0 0 6px ${colors.glow.replace('0.4', '0.15')}`
            : 'none',
        zIndex: state === 'active' ? 10 : state === 'filled' ? 5 : 1,
      }}
    >
      {/* Slot label */}
      {!part && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1">
          <span className="text-lg leading-none">{meta.icon}</span>
          <span className={cn(
            'text-[9px] font-semibold uppercase tracking-wider text-center leading-tight',
            state === 'active' ? 'text-foreground/70' : 'text-muted-foreground/40'
          )}>
            {state === 'active' ? `Drop ${meta.label}` : pos.label}
          </span>
        </div>
      )}

      {/* Placed part */}
      {part && (
        <PlacedPart
          category={category}
          part={part}
          onClick={() => onPartClick(category, part)}
        />
      )}
    </div>
  );
}
