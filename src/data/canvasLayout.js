// Build step order matching physical PC assembly sequence
export const BUILD_STEPS = [
  { category: 'case',        label: 'Case',        icon: '1' },
  { category: 'psu',         label: 'PSU',         icon: '2' },
  { category: 'motherboard', label: 'Mobo',        icon: '3' },
  { category: 'cpu',         label: 'CPU',         icon: '4' },
  { category: 'cooler',      label: 'Cooler',      icon: '5' },
  { category: 'ram',         label: 'RAM',         icon: '6' },
  { category: 'storage',     label: 'Storage',     icon: '7' },
  { category: 'gpu',         label: 'GPU',         icon: '8' },
];

// Slot positions as percentages of the canvas container
// Modeled after a bird's-eye view of an open ATX mid-tower case
export const SLOT_POSITIONS = {
  case: {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    label: 'Case Boundary',
  },
  psu: {
    top: 78,
    left: 4,
    width: 28,
    height: 18,
    label: 'PSU Bay',
  },
  motherboard: {
    top: 6,
    left: 30,
    width: 52,
    height: 68,
    label: 'Motherboard',
  },
  cpu: {
    top: 14,
    left: 44,
    width: 16,
    height: 18,
    label: 'CPU Socket',
  },
  cooler: {
    top: 12,
    left: 42,
    width: 20,
    height: 22,
    label: 'CPU Cooler',
  },
  ram: {
    top: 10,
    left: 68,
    width: 10,
    height: 42,
    label: 'DIMM Slots',
  },
  storage: {
    top: 50,
    left: 44,
    width: 20,
    height: 10,
    label: 'M.2 Slot',
  },
  gpu: {
    top: 42,
    left: 32,
    width: 48,
    height: 16,
    label: 'PCIe Slot',
  },
};

// Category colors for slot borders and effects
export const SLOT_COLORS = {
  case:        { border: '#a78bfa', bg: 'rgba(167,139,250,0.08)', glow: 'rgba(167,139,250,0.4)' },
  psu:         { border: '#ef4444', bg: 'rgba(239,68,68,0.08)',   glow: 'rgba(239,68,68,0.4)' },
  motherboard: { border: '#10b981', bg: 'rgba(16,185,129,0.08)', glow: 'rgba(16,185,129,0.4)' },
  cpu:         { border: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', glow: 'rgba(139,92,246,0.4)' },
  cooler:      { border: '#34d399', bg: 'rgba(52,211,153,0.08)', glow: 'rgba(52,211,153,0.4)' },
  ram:         { border: '#f59e0b', bg: 'rgba(245,158,11,0.08)', glow: 'rgba(245,158,11,0.4)' },
  storage:     { border: '#3b82f6', bg: 'rgba(59,130,246,0.08)', glow: 'rgba(59,130,246,0.4)' },
  gpu:         { border: '#ec4899', bg: 'rgba(236,72,153,0.08)', glow: 'rgba(236,72,153,0.4)' },
};
