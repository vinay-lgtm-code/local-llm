// Stylized top-down SVG icons for each PC component category
// These render inside placed slots on the canvas

export function CaseIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="2" width="56" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="8" y="6" width="48" height="52" rx="2" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.3" />
      {/* Ventilation holes */}
      <circle cx="14" cy="54" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="20" cy="54" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="26" cy="54" r="1.5" fill="currentColor" opacity="0.3" />
      {/* Front panel */}
      <rect x="50" y="8" width="4" height="6" rx="1" fill="currentColor" opacity="0.2" />
      <circle cx="52" cy="18" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function PsuIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="12" width="56" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Fan grille */}
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Fan blades */}
      <line x1="32" y1="18" x2="32" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="18" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="22" y1="22" x2="42" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="42" y1="22" x2="22" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Power label */}
      <rect x="8" y="48" width="12" height="2" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function MoboIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="2" width="56" height="60" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* PCB traces */}
      <line x1="12" y1="10" x2="12" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="20" y1="10" x2="20" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="28" y1="10" x2="28" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="10" y1="20" x2="54" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="10" y1="36" x2="54" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {/* CPU socket placeholder */}
      <rect x="22" y="14" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 1" opacity="0.3" />
      {/* DIMM slots */}
      <rect x="48" y="10" width="3" height="20" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <rect x="52" y="10" width="3" height="20" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* PCIe slot */}
      <rect x="12" y="40" width="36" height="4" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* M.2 slot */}
      <rect x="30" y="48" width="16" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Mounting holes */}
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="56" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="8" cy="58" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="56" cy="58" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

export function CpuIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* CPU die */}
      <rect x="14" y="14" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Inner die */}
      <rect x="20" y="20" width="24" height="24" rx="1" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      {/* Die marking */}
      <rect x="24" y="24" width="16" height="16" rx="1" fill="currentColor" opacity="0.15" />
      {/* Pins - top */}
      {[18, 24, 30, 36, 42].map((x) => (
        <line key={`t${x}`} x1={x} y1="8" x2={x} y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Pins - bottom */}
      {[18, 24, 30, 36, 42].map((x) => (
        <line key={`b${x}`} x1={x} y1="50" x2={x} y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Pins - left */}
      {[18, 24, 30, 36, 42].map((y) => (
        <line key={`l${y}`} x1="8" y1={y} x2="14" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Pins - right */}
      {[18, 24, 30, 36, 42].map((y) => (
        <line key={`r${y}`} x1="50" y1={y} x2="56" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.3" />
      ))}
      {/* Corner notch */}
      <circle cx="17" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function CoolerIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Heatsink fins */}
      <rect x="8" y="8" width="48" height="48" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Fan circle */}
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.2" />
      {/* Fan blades */}
      <path d="M32 14 C38 20, 38 28, 32 27" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="currentColor" fillOpacity="0.05" />
      <path d="M50 32 C44 38, 36 38, 37 32" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="currentColor" fillOpacity="0.05" />
      <path d="M32 50 C26 44, 26 36, 32 37" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="currentColor" fillOpacity="0.05" />
      <path d="M14 32 C20 26, 28 26, 27 32" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="currentColor" fillOpacity="0.05" />
      {/* Mounting screws */}
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="52" cy="12" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="12" cy="52" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="52" cy="52" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function RamIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* RAM stick body */}
      <rect x="24" y="4" width="16" height="56" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Chips */}
      <rect x="27" y="8" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="27" y="17" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="27" y="26" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="27" y="35" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="27" y="44" width="10" height="6" rx="0.5" fill="currentColor" opacity="0.15" />
      {/* Contact pins at bottom */}
      <rect x="26" y="54" width="12" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Notch */}
      <rect x="30" y="54" width="4" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function StorageIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* M.2 SSD body */}
      <rect x="10" y="24" width="44" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Controller chip */}
      <rect x="14" y="28" width="10" height="8" rx="1" fill="currentColor" opacity="0.15" />
      {/* NAND chips */}
      <rect x="28" y="28" width="8" height="8" rx="0.5" fill="currentColor" opacity="0.1" />
      <rect x="40" y="28" width="8" height="8" rx="0.5" fill="currentColor" opacity="0.1" />
      {/* Connector */}
      <rect x="6" y="28" width="4" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Screw hole */}
      <circle cx="52" cy="32" r="1.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Label */}
      <line x1="16" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

export function GpuIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* GPU PCB */}
      <rect x="4" y="14" width="56" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Fan 1 */}
      <circle cx="22" cy="32" r="12" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <circle cx="22" cy="32" r="3" fill="currentColor" opacity="0.15" />
      {/* Fan 2 */}
      <circle cx="46" cy="32" r="12" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <circle cx="46" cy="32" r="3" fill="currentColor" opacity="0.15" />
      {/* Fan blade suggestions */}
      <line x1="22" y1="20" x2="22" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="10" y1="32" x2="34" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="46" y1="20" x2="46" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="34" y1="32" x2="58" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {/* PCIe connector */}
      <rect x="6" y="50" width="30" height="3" rx="0.5" fill="currentColor" opacity="0.2" />
      {/* Power connector */}
      <rect x="48" y="14" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Video outputs */}
      <rect x="4" y="16" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="4" y="22" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="4" y="28" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// Map category to icon component
export const PART_ICONS = {
  case: CaseIcon,
  psu: PsuIcon,
  motherboard: MoboIcon,
  cpu: CpuIcon,
  cooler: CoolerIcon,
  ram: RamIcon,
  storage: StorageIcon,
  gpu: GpuIcon,
};
