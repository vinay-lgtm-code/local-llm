import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { GripVertical, Star } from 'lucide-react';
import { CATEGORY_META } from '@/data/parts';

export default function TrayPartCard({ part, category, isSelected, onRemove, index }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: part.id,
    data: { part, category },
  });

  const meta = CATEGORY_META[category];

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  // Get the most important spec for this category
  const keySpec = getKeySpec(part, category);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animationDelay: `${index * 50}ms`,
      }}
      className={cn(
        'relative flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 tray-card-enter',
        isDragging && 'opacity-40 scale-95 z-50',
        isSelected
          ? 'border-primary/50 bg-primary/10 cursor-pointer'
          : 'border-border/60 bg-card/60 hover:bg-card hover:border-border',
      )}
      {...attributes}
      {...listeners}
      onClick={isSelected ? () => onRemove(category) : undefined}
    >
      {/* Drag handle */}
      <div className="shrink-0 text-muted-foreground/30 cursor-grab active:cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      {/* Part info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[9px] font-medium text-muted-foreground uppercase">{part.brand}</span>
          {isSelected && (
            <span className="text-[8px] font-bold text-primary bg-primary/20 px-1 rounded">CLICK TO REMOVE</span>
          )}
        </div>
        <p className="text-xs font-semibold text-foreground leading-tight truncate">{part.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-muted-foreground">{keySpec}</span>
          <div className="flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span className="text-[9px] text-muted-foreground">{part.rating}</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold" style={{ color: meta.color }}>${part.price}</p>
      </div>
    </div>
  );
}

function getKeySpec(part, category) {
  switch (category) {
    case 'cpu': return `${part.specs.cores}C/${part.specs.threads}T ${part.specs.boostClock}`;
    case 'gpu': return `${part.specs.vram} ${part.specs.boostClock}`;
    case 'motherboard': return `${part.specs.socket} ${part.specs.formFactor}`;
    case 'ram': return `${part.specs.capacity} ${part.specs.speed}`;
    case 'storage': return `${part.specs.capacity} ${part.specs.type}`;
    case 'psu': return `${part.specs.wattage}W ${part.specs.efficiency}`;
    case 'case': return `${part.specs.type} ${part.specs.formFactor.split(',')[0]}`;
    case 'cooler': return `${part.specs.type} ${part.specs.tdp}W TDP`;
    default: return '';
  }
}
