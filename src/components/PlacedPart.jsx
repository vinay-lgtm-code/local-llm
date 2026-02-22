import { PART_ICONS } from '@/data/partIcons';
import { SLOT_COLORS } from '@/data/canvasLayout';

export default function PlacedPart({ category, part, onClick }) {
  const IconComponent = PART_ICONS[category];
  const colors = SLOT_COLORS[category];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group part-placed"
      onClick={onClick}
      title={`${part.name} — $${part.price}\nClick to view details`}
    >
      {/* Part icon */}
      <div className="relative w-3/4 h-3/4 flex items-center justify-center">
        <IconComponent
          className="w-full h-full max-w-[48px] max-h-[48px]"
          style={{ color: colors.border }}
        />
      </div>

      {/* Part name - shown on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-[8px] font-semibold text-foreground text-center leading-tight truncate">
          {part.name}
        </p>
        <p className="text-[8px] font-bold text-center" style={{ color: colors.border }}>
          ${part.price}
        </p>
      </div>
    </div>
  );
}
