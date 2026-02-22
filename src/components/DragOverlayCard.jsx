import { CATEGORY_META } from '@/data/parts';

export default function DragOverlayCard({ part, category }) {
  const meta = CATEGORY_META[category];

  return (
    <div className="dragging-overlay flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/50 bg-card/95 backdrop-blur-sm shadow-2xl max-w-[200px]">
      <span className="text-lg shrink-0">{meta.icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground truncate">{part.name}</p>
        <p className="text-xs font-bold" style={{ color: meta.color }}>${part.price}</p>
      </div>
    </div>
  );
}
