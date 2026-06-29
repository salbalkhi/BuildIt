# ⬡ BuildIt — PC Builder MVP

A fully client-side PC configurator that lets users build their own computer with real-time compatibility checking, live price totaling, and an optional professional assembly service request.

---

## 🗂️ Project Structure

```
pc-builder/
├── index.html              # Main page (single-page app)
├── README.md
├── css/
│   ├── style.css           # Design system, navbar, hero, sections, footer
│   └── builder.css         # Builder tool, parts list, summary panel
└── js/
    ├── data.js             # Parts database (35+ parts across 7 categories)
    ├── compatibility.js    # Compatibility engine (socket, RAM type, power, form factor)
    ├── builder.js          # Builder UI logic (state, rendering, events)
    └── app.js              # App entry point, global actions, modal, scroll
```

---

## ✨ Features

### PC Builder Tool
- **7 part categories**: CPU, Motherboard, RAM, GPU, Storage, PSU, Case
- **Live search** within each category
- **One-click** add/remove parts
- **Build slots** panel showing the current selection at a glance

### Compatibility Engine (`compatibility.js`)
| Check | Rule |
|---|---|
| CPU ↔ Motherboard | Must share the same socket (LGA1700 / AM5) |
| CPU / MB ↔ RAM | DDR4 or DDR5 must match across all three |
| RAM capacity | Cannot exceed the motherboard's max supported RAM |
| Case ↔ Motherboard | Case must support the board's form factor (ATX / mATX / ITX) |
| PSU wattage | Total system draw must not exceed PSU rating |
| PSU headroom | Warning when load exceeds 80% of PSU capacity |

### Power Meter
- Calculates estimated system wattage in real time
- Color-coded bar: green → orange → red as load increases
- Shows remaining headroom percentage when a PSU is selected

### Pricing & Service
- Live price total updates as parts are added or removed
- Two service modes:
  - **Self-assembly** — parts only
  - **Professional assembly** — adds $150, includes a 90-day warranty
- Order confirmation modal with full build summary

---

## 🚀 Getting Started

No build step, no dependencies, no package manager needed.

```bash
# Clone or download the project, then just open the file:
open index.html
# or serve it locally:
npx serve .
python3 -m http.server 8080
```

---

## 🛠️ Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 | Semantic, accessible structure |
| Styling | Vanilla CSS (custom properties) | Zero dependencies, full control |
| Logic | Vanilla JavaScript (ES6+) | No framework overhead, fast load |
| Architecture | Module pattern (IIFE) | Encapsulated state, clear public API |

---

## 📦 Parts Database (`data.js`)

35+ parts across 7 categories with real-world specs and compatibility metadata:

```
cpu         — 7 parts  (Intel LGA1700 + AMD AM5)
motherboard — 6 parts  (Z790, B760, X670E, B650)
ram         — 5 parts  (DDR4 + DDR5, 16–64GB)
gpu         — 7 parts  (RTX 4060 → 4090, RX 7600 → 7900 XTX)
storage     — 5 parts  (NVMe PCIe 4.0, SATA SSD, HDD)
psu         — 5 parts  (650W–1600W, Bronze → Platinum)
case        — 4 parts  (ATX, mATX, ITX)
```

Each part carries a `compat` object used by the engine:

```js
{
  id:     'cpu-001',
  name:   'Intel Core i9-14900K',
  price:  2199,             // USD
  specs:  '24 cores · 6.0GHz · LGA1700 · 125W',
  compat: {
    socket:  'LGA1700',     // matched against motherboard
    tdp:     125,           // added to power calculation
    ramType: 'DDR5'         // matched against RAM and motherboard
  }
}
```

---

## 🔮 Roadmap

### Phase 2 — Backend & Auth
- [ ] Supabase or Firebase for parts database
- [ ] User accounts and saved builds
- [ ] Admin order management dashboard

### Phase 3 — Commerce
- [ ] Live pricing via supplier API
- [ ] Online payment integration
- [ ] Order tracking page

### Phase 4 — Intelligence
- [ ] AI build recommendations by use case (gaming, workstation, budget)
- [ ] Auto-suggest compatible upgrades
- [ ] Price history and deal alerts

---

## 📄 License

MIT — do whatever you want with it.
