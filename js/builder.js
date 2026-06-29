// ============================================
//  BUILDIT — BUILDER UI ENGINE
// ============================================

const Builder = (() => {

  // State
  let state = {
    build:   {},        // { cpu: part, motherboard: part, ... }
    activeCategory: 'cpu',
    service: 'self',    // 'self' | 'pro'
    searchQuery: ''
  };

  // ---- INIT ----
  function init() {
    renderTabs();
    renderSlots();
    renderPartsList(state.activeCategory);
    bindSearch();
    updateSummary();
  }

  // ---- TABS ----
  function renderTabs() {
    document.querySelectorAll('#panelTabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.searchQuery = '';
        document.getElementById('searchInput').value = '';
        setActiveCategory(tab.dataset.cat);
      });
    });
  }

  function setActiveCategory(cat) {
    state.activeCategory = cat;
    document.querySelectorAll('#panelTabs .tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
    });
    renderPartsList(cat);
  }

  // ---- PARTS LIST ----
  function renderPartsList(category) {
    const list  = document.getElementById('partsList');
    const parts = PARTS_DB[category] || [];
    const query = state.searchQuery.trim().toLowerCase();

    const filtered = query
      ? parts.filter(p => p.name.toLowerCase().includes(query) || p.specs.toLowerCase().includes(query))
      : parts;

    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:32px;text-align:center;color:var(--text-muted);font-size:0.875rem;">لا توجد نتائج</div>`;
      return;
    }

    list.innerHTML = filtered.map(part => {
      const isSelected     = state.build[category]?.id === part.id;
      const isCompatible   = CompatEngine.isPartCompatible(part, category, state.build);
      const incompatClass  = (!isCompatible && !isSelected) ? 'incompatible' : '';
      const selectedClass  = isSelected ? 'selected' : '';

      return `
        <div class="part-card ${selectedClass} ${incompatClass}"
             onclick="Builder.togglePart('${category}', '${part.id}')">
          <div class="part-icon">${part.icon}</div>
          <div class="part-info">
            <div class="part-name">${part.name}</div>
            <div class="part-specs">${part.specs}</div>
          </div>
          <div class="part-price">$${part.price.toLocaleString('en-US')}</div>
          <button class="part-add-btn" title="${isSelected ? 'إزالة' : 'إضافة'}">
            ${isSelected ? '✕' : '+'}
          </button>
        </div>
      `;
    }).join('');
  }

  // ---- SELECT / DESELECT PART ----
  function togglePart(category, partId) {
    const part = PARTS_DB[category].find(p => p.id === partId);
    if (!part) return;

    const isSelected = state.build[category]?.id === partId;

    if (isSelected) {
      delete state.build[category];
    } else {
      state.build[category] = part;
    }

    renderPartsList(category);
    renderSlots();
    updateSummary();
    updateCompatBar();
    updateHeroVisual();
  }

  // ---- BUILD SLOTS ----
  function renderSlots() {
    const container = document.getElementById('buildSlots');
    container.innerHTML = CATEGORY_ORDER.map(cat => {
      const part  = state.build[cat];
      const label = CATEGORY_LABELS[cat];

      if (part) {
        return `
          <div class="build-slot filled">
            <span class="slot-category">${label}</span>
            <span class="slot-value">${part.name}</span>
            <span class="slot-price">$${part.price.toLocaleString('en-US')}</span>
            <button class="slot-remove" onclick="Builder.togglePart('${cat}', '${part.id}')" title="إزالة">✕</button>
          </div>
        `;
      }

      return `
        <div class="build-slot" onclick="Builder.setActiveCategory('${cat}')" style="cursor:pointer"
             title="انقر لإضافة ${label}">
          <span class="slot-category">${label}</span>
          <span class="slot-empty">— لم تُختر بعد</span>
        </div>
      `;
    }).join('');
  }

  // ---- POWER METER ----
  function updatePowerMeter() {
    const powerResult = CompatEngine.calcPower(state.build);
    const psu         = state.build.psu;

    const fillEl  = document.getElementById('powerFill');
    const valEl   = document.getElementById('powerVal');
    const noteEl  = document.getElementById('powerNote');

    valEl.textContent = psu
      ? `${powerResult.total}W / ${psu.compat.wattage}W`
      : `${powerResult.total}W / — W`;

    if (psu) {
      const pct = Math.min(powerResult.percentage, 100);
      fillEl.style.width = pct + '%';

      if (pct > 90) {
        noteEl.textContent = '⚠ الاستهلاك عالٍ جداً، يُنصح بمصدر أقوى';
        noteEl.style.color = 'var(--red)';
      } else if (pct > 75) {
        noteEl.textContent = '⚠ يُفضّل مصدر طاقة بسعة أعلى للأمان';
        noteEl.style.color = 'var(--orange)';
      } else if (pct > 0) {
        noteEl.textContent = `✓ هامش أمان جيد (${100 - pct}% احتياطي)`;
        noteEl.style.color = 'var(--green)';
      } else {
        noteEl.textContent = '';
      }
    } else {
      fillEl.style.width = '0%';
      noteEl.textContent = powerResult.total > 0 ? `استهلاك تقديري: ~${powerResult.total}W` : '';
      noteEl.style.color = 'var(--text-muted)';
    }
  }

  // ---- PRICE SUMMARY ----
  function updatePriceSummary() {
    let partsTotal = 0;
    Object.values(state.build).forEach(part => { partsTotal += part.price; });

    const serviceExtra  = state.service === 'pro' ? 150 : 0;
    const total         = partsTotal + serviceExtra;

    document.getElementById('partsPrice').textContent  = '$' + partsTotal.toLocaleString('en-US');
    document.getElementById('totalPrice').textContent  = '$' + total.toLocaleString('en-US');
    document.getElementById('serviceRow').style.display = state.service === 'pro' ? 'flex' : 'none';

    // Enable order button if at least CPU + Motherboard + PSU selected
    const canOrder = state.build.cpu && state.build.motherboard && state.build.psu;
    document.getElementById('orderBtn').disabled = !canOrder;
  }

  // ---- COMPAT BAR ----
  function updateCompatBar() {
    const result  = CompatEngine.check(state.build);
    const bar     = document.getElementById('compatBar');
    const dot     = bar.querySelector('.compat-dot');
    const text    = document.getElementById('compatText');
    const summary = document.getElementById('compatSummary');

    const hasAny = Object.keys(state.build).length > 0;

    if (!hasAny) {
      bar.className   = 'compat-bar';
      dot.className   = 'compat-dot idle';
      text.textContent = 'أضف قطعاً لبدء فحص التوافق';
      summary.textContent = '';
      return;
    }

    if (result.issues.length > 0) {
      bar.className    = 'compat-bar error';
      dot.className    = 'compat-dot error';
      text.textContent = `⚠ ${result.issues[0]}`;
      summary.textContent = result.issues.length > 1 ? `+${result.issues.length - 1} مشاكل أخرى` : '';
    } else if (result.warnings.length > 0) {
      bar.className    = 'compat-bar warn';
      dot.className    = 'compat-dot warn';
      text.textContent = `⚡ ${result.warnings[0]}`;
      summary.textContent = '';
    } else {
      bar.className    = 'compat-bar ok';
      dot.className    = 'compat-dot ok';
      text.textContent = '✓ كل القطع متوافقة — جهازك جاهز للطلب';
      summary.textContent = `${Object.keys(state.build).length} / ${CATEGORY_ORDER.length} قطع`;
    }
  }

  // ---- HERO VISUAL ANIMATION ----
  function updateHeroVisual() {
    const slots = document.querySelectorAll('.comp-slot');
    const cats  = ['cpu', 'ram', 'gpu', 'storage'];
    slots.forEach((slot, i) => {
      slot.classList.toggle('active', !!state.build[cats[i]]);
    });
  }

  // ---- MASTER UPDATE ----
  function updateSummary() {
    updatePowerMeter();
    updatePriceSummary();
  }

  // ---- SEARCH ----
  function bindSearch() {
    const input = document.getElementById('searchInput');
    let debounce;
    input.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.searchQuery = e.target.value;
        renderPartsList(state.activeCategory);
      }, 180);
    });
  }

  // ---- CLEAR ----
  function clearBuild() {
    state.build = {};
    renderPartsList(state.activeCategory);
    renderSlots();
    updateSummary();
    updateCompatBar();
    updateHeroVisual();
  }

  // ---- SERVICE SELECTION ----
  function setService(type) {
    state.service = type;
    document.getElementById('toggleSelf').classList.toggle('active', type === 'self');
    document.getElementById('togglePro').classList.toggle('active', type === 'pro');
    document.getElementById('checkSelf').textContent = type === 'self' ? '✓' : '';
    document.getElementById('checkPro').textContent  = type === 'pro'  ? '✓' : '';
    updatePriceSummary();
  }

  // ---- GET BUILD SUMMARY TEXT ----
  function getBuildSummary() {
    const lines = CATEGORY_ORDER
      .filter(cat => state.build[cat])
      .map(cat => `${CATEGORY_LABELS[cat]}: ${state.build[cat].name} — $${state.build[cat].price.toLocaleString('en-US')}`);

    const serviceLabel = state.service === 'pro' ? 'تركيب احترافي (+$150)' : 'تركيب ذاتي';
    lines.push(`الخدمة: ${serviceLabel}`);

    let total = Object.values(state.build).reduce((s, p) => s + p.price, 0);
    if (state.service === 'pro') total += 150;
    lines.push(`الإجمالي: $${total.toLocaleString('en-US')}`);

    return lines.join('\n');
  }

  function getState() { return state; }

  // Public API
  return {
    init,
    togglePart,
    setActiveCategory,
    setService,
    clearBuild,
    getBuildSummary,
    getState
  };
})();