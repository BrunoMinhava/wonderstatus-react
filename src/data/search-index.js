/**
 * Global search index — aggregates all searchable content across the site.
 * Multilingual: each entry carries PT and EN synonyms so searching in either
 * language returns the same results.
 */
import labCatalog from './lab-catalog-data.js';
import oceanCatalog from './ocean-catalog-data.js';
import { categories } from './categories.js';
import { brandsByArea } from './brands.js';

// ─── PT↔EN synonym map ───────────────────────────────────────────────────────
// Keys are lowercase; each key maps to all synonyms (self included).
const SYNONYMS = {
  // Pipetting
  pipeta: ['pipeta', 'pipette', 'pipetas', 'pipettes'],
  micropipeta: ['micropipeta', 'micropipette', 'micropipetas', 'micropipettes'],
  bureta: ['bureta', 'burette', 'buretas', 'burettes'],
  pipetador: ['pipetador', 'pipette controller', 'controlador de pipeta'],
  ponteiras: ['ponteiras', 'tips', 'tip', 'ponteira'],
  dispensador: ['dispensador', 'dispenser', 'dispensadores', 'dispensers'],
  seringa: ['seringa', 'syringe', 'seringas', 'syringes'],
  bomba: ['bomba', 'pump', 'bombas', 'pumps'],
  repetidor: ['repetidor', 'repeater', 'stepper'],
  // Filtration & chromatography
  filtração: ['filtração', 'filtration', 'filtro', 'filter', 'filtros', 'filters'],
  cromatografia: ['cromatografia', 'chromatography', 'hplc', 'gc'],
  membrana: ['membrana', 'membrane', 'membranas', 'membranes'],
  // General lab
  laboratório: ['laboratório', 'laboratory', 'laboratorio', 'lab'],
  volumetria: ['volumetria', 'volumetry', 'volumetric'],
  vidro: ['vidro', 'glass', 'borosilicate'],
  consumíveis: ['consumíveis', 'consumibles', 'consumables', 'consumivel'],
  suporte: ['suporte', 'stand', 'support', 'suportes', 'stands'],
  recipiente: ['recipiente', 'container', 'recipientes', 'containers'],
  frasco: ['frasco', 'flask', 'bottle', 'frascos', 'flasks', 'bottles'],
  copo: ['copo', 'beaker', 'copos', 'beakers'],
  proveta: ['proveta', 'measuring cylinder', 'probeta', 'cylinder'],
  balão: ['balão', 'volumetric flask', 'matraz', 'flask'],
  // Equipment
  centrifuga: ['centrifuga', 'centrifuge', 'centrifugação', 'centrifugation'],
  estufa: ['estufa', 'oven', 'incubator', 'incubadora'],
  autoclave: ['autoclave', 'esterilizador', 'sterilizer', 'sterilisation'],
  agitador: ['agitador', 'shaker', 'agitadores', 'shakers'],
  banho: ['banho', 'water bath', 'bath', 'thermostat'],
  refrigerador: ['refrigerador', 'refrigerator', 'freezer', 'fridge', 'armario refrigerado'],
  espectrofotómetro: ['espectrofotómetro', 'spectrophotometer', 'espectroscopia', 'spectroscopy'],
  microscópio: ['microscópio', 'microscope'],
  viscosímetro: ['viscosímetro', 'viscometer'],
  // Water systems
  água: ['água', 'water', 'agua', 'purificação de água', 'water purification'],
  'ultra pura': ['ultra pura', 'ultrapure', 'type i', 'tipo i', 'milli-q'],
  osmose: ['osmose', 'osmosis', 'rever osmose', 'reverse osmosis', 'ro'],
  // Oceanography
  oceanografia: ['oceanografia', 'oceanography', 'oceanographic', 'oceânico'],
  amostrador: ['amostrador', 'sampler', 'amostragem', 'sampling'],
  niskin: ['niskin', 'garrafa de niskin', 'niskin bottle', 'water sampler'],
  ctd: ['ctd', 'conductivity temperature depth', 'perfilador', 'profiler'],
  sensor: ['sensor', 'sonda', 'probe', 'sensores', 'sensors'],
  oxigénio: ['oxigénio', 'oxygen', 'do', 'dissolved oxygen', 'oxigênio'],
  turbidez: ['turbidez', 'turbidity', 'turbidímetro', 'turbidimeter'],
  salinidade: ['salinidade', 'salinity', 'salinómetro', 'salinometer'],
  temperatura: ['temperatura', 'temperature'],
  condutividade: ['condutividade', 'conductivity'],
  fluorescência: ['fluorescência', 'fluorescence'],
  plâncton: ['plâncton', 'plankton', 'plancton'],
  sedimento: ['sedimento', 'sediment', 'sedimentos', 'sediments'],
  rede: ['rede', 'net', 'trawl', 'redes', 'nets'],
  profundidade: ['profundidade', 'depth'],
  submersível: ['submersível', 'submersible', 'submerso', 'underwater'],
  wisens: ['wisens', 'wimo', 'wihub', 'wi-sens', 'wi-mo'],
  // Chemistry
  química: ['química', 'chemistry', 'quimica'],
  aas: ['aas', 'atomic absorption', 'absorção atómica', 'absorção atomica'],
  icp: ['icp', 'icp-ms', 'plasma', 'espectrometria de massa'],
  digestão: ['digestão', 'digestion', 'mineralization'],
  lâmpada: ['lâmpada', 'lamp', 'lampada', 'hollow cathode', 'hcl'],
  // Drones
  drone: ['drone', 'drones', 'uav', 'fpv', 'aéreo', 'quadcopter'],
  // Micotoxins
  micotoxina: ['micotoxina', 'mycotoxin', 'micotoxinas', 'mycotoxins'],
  padrão: ['padrão', 'standard', 'padroes', 'standards', 'referência', 'reference'],
  // Brands (for brand searches)
  socorex: ['socorex', 'acura', 'calibrex', 'qualitix', 'stepper', 'dosys', 'profiller'],
  auxilab: ['auxilab'],
  hydrobios: ['hydrobios', 'hydro-bios'],
  wiseco: ['wildco', 'wild co', 'van dorn'],
  nke: ['nke', 'nke instruments', 'nke instrumentation'],
  wonderstatus: ['wonderstatus', 'wonder status'],
};

/**
 * Expand a query string into all synonym variants (flat, unique, lowercase).
 */
export function expandQuery(raw) {
  const q = raw.toLowerCase().trim();
  const terms = new Set([q]);
  for (const [, synonymList] of Object.entries(SYNONYMS)) {
    if (synonymList.some((s) => q.includes(s) || s.includes(q))) {
      synonymList.forEach((s) => terms.add(s));
    }
  }
  return [...terms];
}

/**
 * Returns true if any of the expanded query terms appears in the haystack string.
 */
function matchesAny(haystack, terms) {
  const h = haystack.toLowerCase();
  return terms.some((t) => h.includes(t));
}

function scoreItem(item, terms) {
  let score = 0;
  // Exact name match is highest
  if (terms.some((t) => item.title.toLowerCase() === t)) score += 10;
  // Name starts-with
  if (terms.some((t) => item.title.toLowerCase().startsWith(t))) score += 5;
  // Name contains
  if (matchesAny(item.title, terms)) score += 3;
  // Keywords
  if (matchesAny(item.keywords, terms)) score += 2;
  // Description
  if (matchesAny(item.description, terms)) score += 1;
  return score;
}

// ─── Build the index ──────────────────────────────────────────────────────────

const index = [];

function add(entry) {
  index.push(entry);
}

// Pages / categories
categories.forEach((cat) => {
  add({
    id: `cat-${cat.slug}`,
    type: 'page',
    title: cat.name,
    description: cat.description,
    keywords: [cat.name, cat.shortName, cat.slug, ...(cat.highlights || [])].join(' '),
    url: `/${cat.slug}`,
    page: 'Páginas',
    image: cat.image,
    badge: cat.shortName,
  });
});

// Lab catalog — brands
labCatalog.brands.forEach((brand) => {
  add({
    id: `lab-brand-${brand.id}`,
    type: 'brand',
    title: brand.name,
    description: brand.summary || '',
    keywords: [brand.name, brand.id].join(' '),
    url: `/material-laboratorio`,
    page: 'Material de Laboratório',
    image: brand.logo,
    badge: 'Marca',
  });
});

// Lab catalog — sections and families
labCatalog.sections.forEach((section) => {
  const brand = labCatalog.brands.find((b) => b.id === section.brandId);
  const brandName = brand?.name || '';

  add({
    id: `lab-section-${section.id}`,
    type: 'section',
    title: section.navLabel,
    description: section.description || section.title || '',
    keywords: [brandName, section.navLabel, section.title, section.kicker || ''].join(' '),
    url: `/material-laboratorio`,
    page: 'Material de Laboratório',
    badge: brandName,
  });

  (section.families || []).forEach((family) => {
    const itemNames = (family.items || family.products || [])
      .map((i) => i.name || '')
      .join(' ');

    add({
      id: `lab-family-${family.id}`,
      type: 'product',
      title: family.name || family.navLabel || '',
      description: family.summary || '',
      keywords: [brandName, family.name, family.navLabel || '', itemNames].join(' '),
      url: `/material-laboratorio`,
      page: 'Material de Laboratório',
      image: family.image,
      badge: brandName,
    });

    (family.items || family.products || []).forEach((item) => {
      if (!item.name) return;
      add({
        id: `lab-item-${family.id}-${item.name.slice(0, 20)}`,
        type: 'item',
        title: item.name,
        description: family.name || '',
        keywords: [brandName, family.name || '', item.name].join(' '),
        url: item.url || `/material-laboratorio`,
        page: 'Material de Laboratório',
        badge: brandName,
      });
    });
  });
});

// Ocean catalog — brands
(oceanCatalog.brands || []).forEach((brand) => {
  add({
    id: `ocean-brand-${brand.id}`,
    type: 'brand',
    title: brand.name,
    description: brand.summary || brand.description || '',
    keywords: [brand.name, brand.id].join(' '),
    url: `/oceanografia`,
    page: 'Oceanografia',
    image: brand.logo,
    badge: 'Marca',
  });
});

// Ocean catalog — sections and families (same structure as lab catalog)
(oceanCatalog.sections || []).forEach((section) => {
  const brand = (oceanCatalog.brands || []).find((b) => b.id === section.brandId);
  const brandName = brand?.name || '';

  add({
    id: `ocean-section-${section.id}`,
    type: 'section',
    title: section.navLabel || section.title || '',
    description: section.description || '',
    keywords: [brandName, section.navLabel || '', section.title || '', section.kicker || ''].join(' '),
    url: `/oceanografia`,
    page: 'Oceanografia',
    badge: brandName,
  });

  (section.families || []).forEach((family) => {
    const itemNames = (family.products || family.items || [])
      .map((p) => p.name || p.ref || '')
      .join(' ');

    add({
      id: `ocean-family-${family.id}`,
      type: 'product',
      title: family.navLabel || family.name || '',
      description: family.summary || '',
      keywords: [brandName, family.navLabel || '', family.name || '', family.title || '', itemNames].join(' '),
      url: `/oceanografia`,
      page: 'Oceanografia',
      image: family.image || (family.products?.[0]?.image),
      badge: brandName,
    });

    (family.products || family.items || []).forEach((product) => {
      if (!product.name) return;
      add({
        id: `ocean-product-${family.id}-${product.name.slice(0, 20)}`,
        type: 'item',
        title: product.name,
        description: product.summary || family.navLabel || '',
        keywords: [brandName, family.navLabel || '', product.name, product.ref || ''].join(' '),
        url: product.url || `/oceanografia`,
        page: 'Oceanografia',
        image: product.image,
        badge: brandName,
      });
    });
  });
});

// Brands page
[
  ...brandsByArea.laboratorio,
  ...brandsByArea.oceanografia.exclusive,
  ...brandsByArea.oceanografia.others,
  ...brandsByArea.quimica.exclusive,
  ...brandsByArea.quimica.others,
].forEach((brand) => {
  add({
    id: `brands-${brand.id}`,
    type: 'brand',
    title: brand.name,
    description: brand.note || brand.summary || '',
    keywords: [brand.name, brand.id].join(' '),
    url: brand.url || '/marcas',
    page: 'Marcas',
    image: brand.logo,
    badge: 'Marca',
  });
});

// Deduplicate by id (keep first occurrence)
const seen = new Set();
const deduped = index.filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});

/**
 * Search the index. Returns up to maxResults items sorted by relevance.
 */
export function searchAll(rawQuery, maxResults = 12) {
  if (!rawQuery || rawQuery.trim().length < 2) return [];
  const terms = expandQuery(rawQuery);

  const scored = deduped
    .filter((item) => {
      const combined = `${item.title} ${item.description} ${item.keywords}`;
      return matchesAny(combined, terms);
    })
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ item }) => item);

  return scored;
}
