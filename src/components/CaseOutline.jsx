// SVG decorative case outline with ventilation patterns and circuit traces
export default function CaseOutline({ hasPart }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background grid pattern */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        </pattern>
        <pattern id="smallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.15" opacity="0.05" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill="url(#smallGrid)" />
      <rect width="400" height="300" fill="url(#grid)" />

      {hasPart && (
        <>
          {/* Case outline border */}
          <rect
            x="6" y="6" width="388" height="288" rx="8"
            stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2"
          />

          {/* Inner case boundary */}
          <rect
            x="14" y="14" width="372" height="272" rx="4"
            stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" opacity="0.1"
          />

          {/* Top ventilation holes */}
          {[40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
            <rect key={`vent-t-${x}`} x={x} y="8" width="12" height="2" rx="1" fill="currentColor" opacity="0.08" />
          ))}

          {/* Bottom PSU vent area */}
          <rect x="16" y="230" width="110" height="52" rx="3" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" fill="none" opacity="0.08" />

          {/* Motherboard standoff positions */}
          {[
            [130, 24], [340, 24], [130, 210], [340, 210],
            [235, 24], [235, 210], [130, 120], [340, 120],
          ].map(([cx, cy], i) => (
            <circle key={`standoff-${i}`} cx={cx} cy={cy} r="2" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.1" />
          ))}

          {/* Circuit traces from PSU area to motherboard */}
          <path
            d="M 100 256 L 130 256 L 130 200"
            stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.06"
            strokeDasharray="3 3"
          />

          {/* PCIe slot indicator */}
          <line x1="135" y1="150" x2="310" y2="150" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />

          {/* Drive bay lines */}
          <rect x="16" y="20" width="95" height="130" rx="2" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" fill="none" opacity="0.06" />
        </>
      )}
    </svg>
  );
}
