// ============================================
//  BUILDIT — COMPATIBILITY ENGINE
// ============================================

const CompatEngine = (() => {

  // Check full build compatibility
  function check(build) {
    const issues   = [];
    const warnings = [];

    const cpu = build.cpu;
    const mb  = build.motherboard;
    const ram = build.ram;
    const gpu = build.gpu;
    const psu = build.psu;
    const cas = build.case;

    // ---- CPU ↔ Motherboard ----
    if (cpu && mb) {
      if (cpu.compat.socket !== mb.compat.socket) {
        issues.push(`Socket غير متوافق: المعالج يحتاج ${cpu.compat.socket} بينما اللوحة هي ${mb.compat.socket}`);
      }
    }

    // ---- CPU+MB ↔ RAM type ----
    if (ram) {
      if (cpu && ram.compat.ramType !== cpu.compat.ramType) {
        issues.push(`الذاكرة ${ram.compat.ramType} غير متوافقة مع المعالج الذي يدعم ${cpu.compat.ramType}`);
      }
      if (mb && ram.compat.ramType !== mb.compat.ramType) {
        issues.push(`الذاكرة ${ram.compat.ramType} غير متوافقة مع اللوحة التي تدعم ${mb.compat.ramType}`);
      }
      if (mb && ram.compat.capacity > mb.compat.maxRam) {
        warnings.push(`اللوحة تدعم حداً أقصى ${mb.compat.maxRam}GB لكن الذاكرة المختارة ${ram.compat.capacity}GB`);
      }
    }

    // ---- Case ↔ Motherboard form factor ----
    if (cas && mb) {
      const supported = cas.compat.formFactor;
      if (!supported.includes(mb.compat.formFactor)) {
        issues.push(`الكيس لا يدعم اللوحة ${mb.compat.formFactor} (يدعم ${supported.join('/')} فقط)`);
      }
    }

    // ---- Power ----
    const powerResult = calcPower(build);
    if (psu) {
      if (powerResult.total > psu.compat.wattage) {
        issues.push(`مصدر الطاقة ${psu.compat.wattage}W غير كافٍ. الجهاز يحتاج ~${powerResult.total}W`);
      } else if (powerResult.total > psu.compat.wattage * 0.8) {
        warnings.push(`مصدر الطاقة يعمل بأكثر من 80% من طاقته (${powerResult.total}W / ${psu.compat.wattage}W) — يُنصح بمصدر أقوى`);
      }
    }

    return { issues, warnings, power: powerResult };
  }

  // Calculate total system power draw
  function calcPower(build) {
    let total = 50; // base system overhead (fans, motherboard, etc.)
    const breakdown = [];

    if (build.cpu) {
      total += build.cpu.compat.tdp;
      breakdown.push({ label: 'المعالج', watt: build.cpu.compat.tdp });
    }
    if (build.gpu) {
      total += build.gpu.compat.watt;
      breakdown.push({ label: 'GPU', watt: build.gpu.compat.watt });
    }
    if (build.ram) {
      total += build.ram.compat.watt;
      breakdown.push({ label: 'الذاكرة', watt: build.ram.compat.watt });
    }
    if (build.storage) {
      total += build.storage.compat.watt;
      breakdown.push({ label: 'التخزين', watt: build.storage.compat.watt });
    }

    breakdown.push({ label: 'النظام', watt: 50 });

    const psuWattage = build.psu ? build.psu.compat.wattage : 0;
    const percentage = psuWattage ? Math.round((total / psuWattage) * 100) : 0;

    return { total, breakdown, psuWattage, percentage };
  }

  // Check if a single part is compatible with current build
  function isPartCompatible(part, category, build) {
    const cpu = build.cpu;
    const mb  = build.motherboard;
    const ram = build.ram;
    const cas = build.case;

    switch (category) {
      case 'motherboard':
        if (cpu && part.compat.socket !== cpu.compat.socket) return false;
        if (ram && part.compat.ramType !== ram.compat.ramType) return false;
        if (cas && !cas.compat.formFactor.includes(part.compat.formFactor)) return false;
        break;

      case 'cpu':
        if (mb && part.compat.socket !== mb.compat.socket) return false;
        if (ram && part.compat.ramType !== ram.compat.ramType) return false;
        break;

      case 'ram':
        if (cpu && part.compat.ramType !== cpu.compat.ramType) return false;
        if (mb && part.compat.ramType !== mb.compat.ramType) return false;
        if (mb && part.compat.capacity > mb.compat.maxRam) return false;
        break;

      case 'case':
        if (mb && !part.compat.formFactor.includes(mb.compat.formFactor)) return false;
        break;

      case 'psu':
        // warn but don't hard-block (user can proceed with warning)
        break;
    }

    return true;
  }

  return { check, calcPower, isPartCompatible };
})();
