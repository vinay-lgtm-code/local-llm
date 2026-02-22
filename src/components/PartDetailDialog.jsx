import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2 } from 'lucide-react';
import { CATEGORY_META } from '@/data/parts';

export default function PartDetailDialog({ open, onOpenChange, category, part, onRemove }) {
  if (!part || !category) return null;

  const meta = CATEGORY_META[category];
  const specs = part.specs || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-xl">{meta.icon}</span>
            <div>
              <DialogTitle className="text-base">{part.name}</DialogTitle>
              <DialogDescription className="text-xs">
                {part.brand} &middot; {meta.label}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold" style={{ color: meta.color }}>
              ${part.price}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-foreground">{part.rating}</span>
              <span className="text-xs text-muted-foreground">({part.reviews?.toLocaleString()})</span>
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 p-3 rounded-lg bg-muted/30 border border-border/30">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key}>
                <span className="text-[9px] text-muted-foreground uppercase">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <p className="text-xs font-medium text-foreground">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onRemove(category);
              onOpenChange(false);
            }}
            className="gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove Part
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
