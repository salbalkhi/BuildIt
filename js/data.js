// ============================================
//  BUILDIT — PARTS DATABASE
//  Format: { id, name, category, price, specs, compat }
// ============================================

const PARTS_DB = {

  cpu: [
    {
      id: 'cpu-001',
      name: 'Intel Core i9-14900K',
      icon: '🔵',
      price: 2199,
      specs: '24 نواة · 6.0GHz · LGA1700 · 125W',
      compat: { socket: 'LGA1700', tdp: 125, ramType: 'DDR5' }
    },
    {
      id: 'cpu-002',
      name: 'Intel Core i7-14700K',
      icon: '🔵',
      price: 1549,
      specs: '20 نواة · 5.6GHz · LGA1700 · 125W',
      compat: { socket: 'LGA1700', tdp: 125, ramType: 'DDR5' }
    },
    {
      id: 'cpu-003',
      name: 'Intel Core i5-14600K',
      icon: '🔵',
      price: 999,
      specs: '14 نواة · 5.3GHz · LGA1700 · 125W',
      compat: { socket: 'LGA1700', tdp: 125, ramType: 'DDR5' }
    },
    {
      id: 'cpu-004',
      name: 'AMD Ryzen 9 7950X',
      icon: '🔴',
      price: 2599,
      specs: '16 نواة · 5.7GHz · AM5 · 170W',
      compat: { socket: 'AM5', tdp: 170, ramType: 'DDR5' }
    },
    {
      id: 'cpu-005',
      name: 'AMD Ryzen 7 7700X',
      icon: '🔴',
      price: 1299,
      specs: '8 أنوية · 5.4GHz · AM5 · 105W',
      compat: { socket: 'AM5', tdp: 105, ramType: 'DDR5' }
    },
    {
      id: 'cpu-006',
      name: 'AMD Ryzen 5 7600X',
      icon: '🔴',
      price: 749,
      specs: '6 أنوية · 5.3GHz · AM5 · 105W',
      compat: { socket: 'AM5', tdp: 105, ramType: 'DDR5' }
    },
    {
      id: 'cpu-007',
      name: 'Intel Core i3-13100',
      icon: '🔵',
      price: 419,
      specs: '4 أنوية · 4.5GHz · LGA1700 · 60W',
      compat: { socket: 'LGA1700', tdp: 60, ramType: 'DDR4' }
    }
  ],

  motherboard: [
    {
      id: 'mb-001',
      name: 'ASUS ROG Maximus Z790',
      icon: '🟢',
      price: 1899,
      specs: 'Z790 · LGA1700 · DDR5 · ATX',
      compat: { socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX', maxRam: 128 }
    },
    {
      id: 'mb-002',
      name: 'MSI MAG Z790 Tomahawk',
      icon: '🟢',
      price: 1099,
      specs: 'Z790 · LGA1700 · DDR5 · ATX',
      compat: { socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX', maxRam: 128 }
    },
    {
      id: 'mb-003',
      name: 'Gigabyte B760M DS3H',
      icon: '🟢',
      price: 449,
      specs: 'B760 · LGA1700 · DDR4 · mATX',
      compat: { socket: 'LGA1700', ramType: 'DDR4', formFactor: 'mATX', maxRam: 64 }
    },
    {
      id: 'mb-004',
      name: 'ASUS ROG Crosshair X670E',
      icon: '🟢',
      price: 2199,
      specs: 'X670E · AM5 · DDR5 · ATX',
      compat: { socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', maxRam: 128 }
    },
    {
      id: 'mb-005',
      name: 'MSI MEG X670E ACE',
      icon: '🟢',
      price: 1799,
      specs: 'X670E · AM5 · DDR5 · ATX',
      compat: { socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', maxRam: 128 }
    },
    {
      id: 'mb-006',
      name: 'Gigabyte B650M DS3H',
      icon: '🟢',
      price: 549,
      specs: 'B650 · AM5 · DDR5 · mATX',
      compat: { socket: 'AM5', ramType: 'DDR5', formFactor: 'mATX', maxRam: 64 }
    }
  ],

  ram: [
    {
      id: 'ram-001',
      name: 'G.Skill Trident Z5 RGB 32GB',
      icon: '💾',
      price: 649,
      specs: '32GB · DDR5-6000 · CL30 · 2×16GB',
      compat: { ramType: 'DDR5', capacity: 32, watt: 10 }
    },
    {
      id: 'ram-002',
      name: 'Corsair Dominator Titanium 64GB',
      icon: '💾',
      price: 1299,
      specs: '64GB · DDR5-6400 · CL32 · 2×32GB',
      compat: { ramType: 'DDR5', capacity: 64, watt: 15 }
    },
    {
      id: 'ram-003',
      name: 'Kingston Fury Beast 16GB',
      icon: '💾',
      price: 289,
      specs: '16GB · DDR5-5200 · CL40 · 2×8GB',
      compat: { ramType: 'DDR5', capacity: 16, watt: 8 }
    },
    {
      id: 'ram-004',
      name: 'G.Skill Ripjaws V 32GB',
      icon: '💾',
      price: 349,
      specs: '32GB · DDR4-3600 · CL18 · 2×16GB',
      compat: { ramType: 'DDR4', capacity: 32, watt: 10 }
    },
    {
      id: 'ram-005',
      name: 'Corsair Vengeance LPX 16GB',
      icon: '💾',
      price: 199,
      specs: '16GB · DDR4-3200 · CL16 · 2×8GB',
      compat: { ramType: 'DDR4', capacity: 16, watt: 7 }
    }
  ],

  gpu: [
    {
      id: 'gpu-001',
      name: 'NVIDIA RTX 4090',
      icon: '🎮',
      price: 5999,
      specs: '24GB GDDR6X · 450W TGP · PCIe 4.0',
      compat: { powerReq: 450, interface: 'PCIe', watt: 450 }
    },
    {
      id: 'gpu-002',
      name: 'NVIDIA RTX 4080 Super',
      icon: '🎮',
      price: 3799,
      specs: '16GB GDDR6X · 320W TGP · PCIe 4.0',
      compat: { powerReq: 320, interface: 'PCIe', watt: 320 }
    },
    {
      id: 'gpu-003',
      name: 'NVIDIA RTX 4070 Ti Super',
      icon: '🎮',
      price: 2599,
      specs: '16GB GDDR6X · 285W TGP · PCIe 4.0',
      compat: { powerReq: 285, interface: 'PCIe', watt: 285 }
    },
    {
      id: 'gpu-004',
      name: 'NVIDIA RTX 4060',
      icon: '🎮',
      price: 1299,
      specs: '8GB GDDR6 · 115W TGP · PCIe 4.0',
      compat: { powerReq: 115, interface: 'PCIe', watt: 115 }
    },
    {
      id: 'gpu-005',
      name: 'AMD RX 7900 XTX',
      icon: '🔴',
      price: 3499,
      specs: '24GB GDDR6 · 355W TGP · PCIe 4.0',
      compat: { powerReq: 355, interface: 'PCIe', watt: 355 }
    },
    {
      id: 'gpu-006',
      name: 'AMD RX 7800 XT',
      icon: '🔴',
      price: 1799,
      specs: '16GB GDDR6 · 263W TGP · PCIe 4.0',
      compat: { powerReq: 263, interface: 'PCIe', watt: 263 }
    },
    {
      id: 'gpu-007',
      name: 'AMD RX 7600',
      icon: '🔴',
      price: 899,
      specs: '8GB GDDR6 · 165W TGP · PCIe 4.0',
      compat: { powerReq: 165, interface: 'PCIe', watt: 165 }
    }
  ],

  storage: [
    {
      id: 'sto-001',
      name: 'Samsung 990 Pro 2TB',
      icon: '💿',
      price: 699,
      specs: '2TB · NVMe PCIe 4.0 · 7,450 MB/s',
      compat: { interface: 'NVMe', watt: 7 }
    },
    {
      id: 'sto-002',
      name: 'WD Black SN850X 1TB',
      icon: '💿',
      price: 449,
      specs: '1TB · NVMe PCIe 4.0 · 7,300 MB/s',
      compat: { interface: 'NVMe', watt: 6 }
    },
    {
      id: 'sto-003',
      name: 'Seagate Barracuda 2TB',
      icon: '💿',
      price: 199,
      specs: '2TB · HDD SATA · 210 MB/s',
      compat: { interface: 'SATA', watt: 9 }
    },
    {
      id: 'sto-004',
      name: 'Samsung 870 EVO 1TB',
      icon: '💿',
      price: 279,
      specs: '1TB · SATA SSD · 560 MB/s',
      compat: { interface: 'SATA', watt: 4 }
    },
    {
      id: 'sto-005',
      name: 'Kingston NV2 500GB',
      icon: '💿',
      price: 159,
      specs: '500GB · NVMe PCIe 4.0 · 3,500 MB/s',
      compat: { interface: 'NVMe', watt: 4 }
    }
  ],

  psu: [
    {
      id: 'psu-001',
      name: 'Corsair RM1000x 1000W',
      icon: '⚡',
      price: 849,
      specs: '1000W · 80+ Gold · Modular',
      compat: { wattage: 1000, rating: 'Gold', watt: 0 }
    },
    {
      id: 'psu-002',
      name: 'Seasonic Focus GX-850 850W',
      icon: '⚡',
      price: 649,
      specs: '850W · 80+ Gold · Fully Modular',
      compat: { wattage: 850, rating: 'Gold', watt: 0 }
    },
    {
      id: 'psu-003',
      name: 'be quiet! Pure Power 750W',
      icon: '⚡',
      price: 449,
      specs: '750W · 80+ Gold · Semi Modular',
      compat: { wattage: 750, rating: 'Gold', watt: 0 }
    },
    {
      id: 'psu-004',
      name: 'Cooler Master MWE 650W',
      icon: '⚡',
      price: 299,
      specs: '650W · 80+ Bronze · Non Modular',
      compat: { wattage: 650, rating: 'Bronze', watt: 0 }
    },
    {
      id: 'psu-005',
      name: 'EVGA SuperNOVA 1600W',
      icon: '⚡',
      price: 1299,
      specs: '1600W · 80+ Platinum · Fully Modular',
      compat: { wattage: 1600, rating: 'Platinum', watt: 0 }
    }
  ],

  case: [
    {
      id: 'case-001',
      name: 'Lian Li PC-O11 Dynamic EVO',
      icon: '🖥️',
      price: 699,
      specs: 'Full Tower · ATX · mATX · Tempered Glass',
      compat: { formFactor: ['ATX', 'mATX'], watt: 0 }
    },
    {
      id: 'case-002',
      name: 'Fractal Design Meshify 2',
      icon: '🖥️',
      price: 549,
      specs: 'Mid Tower · ATX · mATX · Mesh Front',
      compat: { formFactor: ['ATX', 'mATX'], watt: 0 }
    },
    {
      id: 'case-003',
      name: 'NZXT H510 Elite',
      icon: '🖥️',
      price: 499,
      specs: 'Mid Tower · ATX · mATX · Tempered Glass',
      compat: { formFactor: ['ATX', 'mATX'], watt: 0 }
    },
    {
      id: 'case-004',
      name: 'Cooler Master NR200P',
      icon: '🖥️',
      price: 349,
      specs: 'Mini-ITX · Compact · Tempered Glass',
      compat: { formFactor: ['ITX'], watt: 0 }
    }
  ]
};

// Category labels in Arabic
const CATEGORY_LABELS = {
  cpu:         'المعالج',
  motherboard: 'اللوحة الأم',
  ram:         'الذاكرة',
  gpu:         'كرت الشاشة',
  storage:     'التخزين',
  psu:         'مصدر الطاقة',
  case:        'الكيس'
};

const CATEGORY_ORDER = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'psu', 'case'];
