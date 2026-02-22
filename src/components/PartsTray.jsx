import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import { PARTS, CATEGORY_META } from '@/data/parts';
import TrayPartCard from './TrayPartCard';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PartsTray({ currentCategory, selectedParts }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showSort, setShowSort] = useState(false);

  const meta = CATEGORY_META[currentCategory];
  const parts = PARTS[currentCategory] || [];

  const filteredParts = useMemo(() => {
    let result = parts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [parts, search, sortBy]);

  return (
    <div className="flex flex-col h-full">
      {/* Tray header */}
      <div className="shrink-0 px-3 pt-3 pb-2 border-b border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{meta?.icon}</span>
          <div>
            <h2 className="text-sm font-bold text-foreground">{meta?.label || 'Parts'}</h2>
            <p className="text-[10px] text-muted-foreground">
              {filteredParts.length} available &middot; Drag to canvas
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-1.5">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${meta?.label?.toLowerCase() || 'parts'}...`}
            className="w-full h-7 pl-6 pr-2 text-xs bg-muted/50 border border-border/50 rounded-md text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUpDown className="w-2.5 h-2.5" />
            <span>{sortBy === 'popular' ? 'Popular' : sortBy === 'rating' ? 'Rating' : sortBy === 'price-low' ? 'Price: Low' : 'Price: High'}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>
          {showSort && (
            <div className="absolute top-full left-0 mt-1 z-20 bg-popover border border-border rounded-md shadow-lg py-1">
              {[
                { value: 'popular', label: 'Most Popular' },
                { value: 'rating', label: 'Top Rated' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                  className={cn(
                    'block w-full text-left px-3 py-1 text-[10px] hover:bg-accent transition-colors',
                    sortBy === opt.value ? 'text-primary font-semibold' : 'text-foreground'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Parts list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1.5">
          {filteredParts.map((part, index) => (
            <TrayPartCard
              key={part.id}
              part={part}
              category={currentCategory}
              isSelected={selectedParts[currentCategory]?.id === part.id}
              index={index}
            />
          ))}
          {filteredParts.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-xs text-muted-foreground">No matching parts</p>
              <button
                onClick={() => setSearch('')}
                className="text-[10px] text-primary hover:underline mt-1"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
