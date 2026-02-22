// Compatibility engine for PC part validation

export function checkCompatibility(selectedParts) {
  const issues = [];
  const warnings = [];
  const { cpu, gpu, motherboard, ram, psu, cooler } = selectedParts;

  // CPU + Motherboard socket check
  if (cpu && motherboard) {
    if (cpu.specs.socket !== motherboard.specs.socket) {
      issues.push({
        type: 'error',
        category: 'Socket Mismatch',
        message: `${cpu.name} uses socket ${cpu.specs.socket}, but ${motherboard.name} uses socket ${motherboard.specs.socket}. These are incompatible.`,
        parts: ['cpu', 'motherboard'],
      });
    }
  }

  // RAM + Motherboard type check
  if (ram && motherboard) {
    if (ram.specs.type !== motherboard.specs.ramType) {
      issues.push({
        type: 'error',
        category: 'RAM Incompatible',
        message: `${ram.name} is ${ram.specs.type}, but ${motherboard.name} requires ${motherboard.specs.ramType}.`,
        parts: ['ram', 'motherboard'],
      });
    }
  }

  // Power budget check
  if (psu) {
    let totalTdp = 0;
    if (cpu) totalTdp += cpu.specs.tdp;
    if (gpu) totalTdp += gpu.specs.tdp;
    totalTdp += 50; // base system draw (fans, mobo, ram, storage)

    const headroom = psu.specs.wattage - totalTdp;
    const ratio = totalTdp / psu.specs.wattage;

    if (ratio > 1) {
      issues.push({
        type: 'error',
        category: 'Insufficient Power',
        message: `Estimated system draw is ~${totalTdp}W, but the ${psu.name} only provides ${psu.specs.wattage}W. You need a larger PSU.`,
        parts: ['psu'],
      });
    } else if (ratio > 0.85) {
      warnings.push({
        type: 'warning',
        category: 'Tight Power Budget',
        message: `Estimated draw ~${totalTdp}W with a ${psu.specs.wattage}W PSU leaves only ${headroom}W headroom. Consider a larger PSU for overclocking or future upgrades.`,
        parts: ['psu'],
      });
    }
  }

  // Cooler TDP check
  if (cpu && cooler) {
    if (cooler.specs.tdp < cpu.specs.tdp) {
      warnings.push({
        type: 'warning',
        category: 'Cooler May Be Insufficient',
        message: `${cooler.name} is rated for ${cooler.specs.tdp}W TDP, but ${cpu.name} draws ${cpu.specs.tdp}W. Consider a beefier cooler.`,
        parts: ['cpu', 'cooler'],
      });
    }
  }

  // GPU length + Case clearance
  if (gpu && selectedParts.case) {
    const gpuLength = parseInt(gpu.specs.length);
    const maxGpuLength = parseInt(selectedParts.case.specs.maxGpuLength);
    if (gpuLength > maxGpuLength) {
      issues.push({
        type: 'error',
        category: 'GPU Too Long',
        message: `${gpu.name} is ${gpu.specs.length} long, but ${selectedParts.case.name} only supports up to ${selectedParts.case.specs.maxGpuLength}.`,
        parts: ['gpu', 'case'],
      });
    }
  }

  // Cooler height + Case clearance
  if (cooler && selectedParts.case) {
    const coolerHeight = parseInt(cooler.specs.height || '0');
    const maxCoolerHeight = parseInt(selectedParts.case.specs.maxCoolerHeight);
    if (coolerHeight > 0 && coolerHeight > maxCoolerHeight) {
      issues.push({
        type: 'error',
        category: 'Cooler Too Tall',
        message: `${cooler.name} is ${cooler.specs.height} tall, but ${selectedParts.case.name} only supports up to ${selectedParts.case.specs.maxCoolerHeight}.`,
        parts: ['cooler', 'case'],
      });
    }
  }

  // Motherboard form factor + Case
  if (motherboard && selectedParts.case) {
    const moboFF = motherboard.specs.formFactor;
    const caseFF = selectedParts.case.specs.formFactor;
    if (!caseFF.includes(moboFF) && !caseFF.includes(moboFF.replace('-', ' '))) {
      // Try loose match
      const moboSize = moboFF.toLowerCase();
      const caseSizes = caseFF.toLowerCase();
      if (
        !caseSizes.includes(moboSize) &&
        !(moboSize === 'micro-atx' && caseSizes.includes('micro-atx')) &&
        !(moboSize === 'mini-itx' && (caseSizes.includes('mini-itx') || caseSizes.includes('atx')))
      ) {
        warnings.push({
          type: 'warning',
          category: 'Form Factor Check',
          message: `Verify ${motherboard.name} (${moboFF}) fits in ${selectedParts.case.name} (supports ${caseFF}).`,
          parts: ['motherboard', 'case'],
        });
      }
    }
  }

  return { issues, warnings };
}

export function getEstimatedWattage(selectedParts) {
  let total = 50; // base system
  if (selectedParts.cpu) total += selectedParts.cpu.specs.tdp;
  if (selectedParts.gpu) total += selectedParts.gpu.specs.tdp;
  return total;
}

export function getTotalPrice(selectedParts) {
  return Object.values(selectedParts)
    .filter(Boolean)
    .reduce((sum, part) => sum + part.price, 0);
}

export function getPartsCount(selectedParts) {
  return Object.values(selectedParts).filter(Boolean).length;
}

export function getBuildTier(totalPrice) {
  if (totalPrice < 600) return { name: 'Budget', color: '#00b894', icon: '🟢' };
  if (totalPrice < 1000) return { name: 'Mid-Range', color: '#fdcb6e', icon: '🟡' };
  if (totalPrice < 1800) return { name: 'High-End', color: '#e17055', icon: '🟠' };
  if (totalPrice < 3000) return { name: 'Enthusiast', color: '#fd79a8', icon: '🔴' };
  return { name: 'Ultimate', color: '#6c5ce7', icon: '💎' };
}
