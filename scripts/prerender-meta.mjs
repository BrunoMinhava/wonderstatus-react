/**
 * Post-build: generates per-route index.html files with unique <title> and <meta description>
 * already embedded in the static HTML — so Google sees them on first crawl without JS.
 *
 * Run: node scripts/prerender-meta.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dir, '..', 'dist');
const base = readFileSync(join(distDir, 'index.html'), 'utf8');

const SITE = 'Wonderstatus';
const BASE_URL = 'https://www.wonderstatus.pt';

const routes = [
  {
    path: 'agua',
    title: `Sistemas de Água Ultrapura para Laboratório | ${SITE}`,
    desc: 'Sistemas de produção de água ultrapura Tipo I (18,2 MΩ·cm) e Tipo II para laboratório. Série WATER 75, WATER 75 XL e WATER 300 — desenvolvidos pela Wonderstatus em Portugal.',
  },
  {
    path: 'sobre',
    title: `Sobre Nós e Contactos | ${SITE}`,
    desc: 'Wonderstatus, Lda. — distribuidora de equipamentos científicos para laboratório, investigação e indústria em Portugal. Contacte-nos para orçamentos e informações.',
  },
  {
    path: 'material-laboratorio',
    title: `Material de Laboratório — JP Selecta, Auxilab, CRUMA | ${SITE}`,
    desc: 'Equipamentos e consumíveis de laboratório: estufas, autoclaves, centrífugas, vidros, micropipetas, cabines de fluxo laminar e medidores. JP SELECTA, Auxilab, CRUMA, Socorex e Milwaukee.',
  },
  {
    path: 'quimica',
    title: `Química Analítica — AAS, ICP, CHNS e Digestão | ${SITE}`,
    desc: 'Consumíveis e acessórios para espectroscopia de absorção atómica (AAS), ICP, ICP-MS, CHNS e digestão de metais. Lâmpadas, tubos de grafite e nebulizadores multimarca.',
  },
  {
    path: 'quimica/tubos-grafite',
    title: `Tubos de Grafite para Fornos de Grafite AAS | ${SITE}`,
    desc: 'Tubos de grafite para AAS GFAAS/ETAAS compatíveis com Agilent, Hitachi, PerkinElmer, Shimadzu e GBC. Alternativa de qualidade equivalente a preço competitivo.',
  },
  {
    path: 'quimica/lampadas',
    title: `Lâmpadas de Cátodo Oco (HCL) para Espectroscopia AA | ${SITE}`,
    desc: 'Lâmpadas de cátodo oco (HCL) e deutério (D2) para AAS. Compatíveis com Agilent, Hitachi, PerkinElmer, Shimadzu e GBC.',
  },
  {
    path: 'quimica/lampadas-mono',
    title: `Lâmpadas HCL Mono-Elementares para AAS | ${SITE}`,
    desc: 'Lâmpadas de cátodo oco mono-elementares para espectroscopia de absorção atómica. Todos os elementos. Compatíveis com Agilent, PerkinElmer, Hitachi, Shimadzu e GBC.',
  },
  {
    path: 'quimica/lampadas-multi',
    title: `Lâmpadas HCL Multi-Elementares para AAS | ${SITE}`,
    desc: 'Lâmpadas de cátodo oco multi-elementares para espectroscopia de absorção atómica. Compatíveis com Agilent, PerkinElmer, Hitachi e Shimadzu.',
  },
  {
    path: 'quimica/lampadas-d2',
    title: `Lâmpadas de Deutério D2 para Correção de Fundo AAS | ${SITE}`,
    desc: 'Lâmpadas de deutério (D2) para correção de fundo em espectroscopia de absorção atómica. Compatíveis com Agilent, Hitachi, PerkinElmer, Shimadzu e GBC.',
  },
  {
    path: 'quimica/lampadas-todos-aa',
    title: `Lâmpadas HCL para Todos os Espectrofotómetros AA | ${SITE}`,
    desc: 'Tabela completa de lâmpadas de cátodo oco compatíveis com Agilent/Varian, Hitachi, PerkinElmer, Shimadzu e GBC para absorção atómica.',
  },
  {
    path: 'quimica/icp-icpms',
    title: `Consumíveis ICP e ICP-MS — Cones, Nebulizadores | ${SITE}`,
    desc: 'Consumíveis para ICP e ICP-MS: cones, nebulizadores, câmaras de spray e tubos peristálticos. Compatíveis com PerkinElmer, Agilent, Shimadzu e Thermo Scientific.',
  },
  {
    path: 'quimica/chns-toc',
    title: `Consumíveis para Análise CHNS, TOC e Elementar | ${SITE}`,
    desc: 'Consumíveis para analisadores CHNS-O e TOC: cápsulas, barcos de combustão, reagentes e catalisadores. Compatíveis com Elementar, Thermo, Leco e Costech.',
  },
  {
    path: 'quimica/digestao',
    title: `Digestão de Metais e Preparação de Amostras | ${SITE}`,
    desc: 'Sistemas de digestão ácida assistida por micro-ondas e blocos de digestão para preparação de amostras ambientais, solos, sedimentos e alimentos. Environmental Express e Milestone.',
  },
  {
    path: 'oceanografia',
    title: `Equipamento de Oceanografia e Monitorização Aquática | ${SITE}`,
    desc: 'Equipamentos para oceanografia, limnologia e monitorização aquática: sondas CTD, garrafas Niskin, redes de plâncton, AUVs e perfiladores. NKE, Hydrobios, Seaber e Wildco.',
  },
  {
    path: 'oceanografia/nke',
    title: `Sondas CTD e Data Loggers NKE Instruments | ${SITE}`,
    desc: 'Sondas multiparamétricas e data loggers NKE: WiMo, WiSens e sistemas de aquisição para CTD, temperatura, salinidade e pressão em oceanografia.',
  },
  {
    path: 'oceanografia/hydrobios',
    title: `Amostragem Oceanográfica — Hydrobios | ${SITE}`,
    desc: 'Equipamento de amostragem oceanográfica Hydrobios: garrafas Niskin e Nansen, redes de plâncton, armadilhas de sedimento e rosetas.',
  },
  {
    path: 'oceanografia/seaber',
    title: `Micro-AUVs para Oceanografia — Seaber YUCO | ${SITE}`,
    desc: 'Micro-AUVs Seaber YUCO para monitorização oceanográfica, mapeamento de fundo e recolha de dados CTD em ambientes costeiros e offshore.',
  },
  {
    path: 'oceanografia/wildco',
    title: `Garrafas Van Dorn e Amostragem de Água — WildCo | ${SITE}`,
    desc: 'Garrafas Van Dorn horizontais e verticais WildCo para recolha de amostras de água em oceanografia e limnologia. Séries Beta Plus e Alpha.',
  },
  {
    path: 'oceanografia/general-oceanics',
    title: `Instrumentação Oceanográfica — General Oceanics | ${SITE}`,
    desc: 'Garrafas Niskin, Go-Flo, sistemas rosette, caudalímetros e instrumentação de referência General Oceanics para campanhas oceanográficas de investigação.',
  },
  {
    path: 'oceanografia/northlift',
    title: `Guinchos para Oceanografia — NorthLift | ${SITE}`,
    desc: 'Guinchos elétricos, hidráulicos e manuais NorthLift para operação de redes, garrafas e linhas em embarcações de pequeno e médio porte.',
  },
  {
    path: 'oceanografia/aquatic-biotechnology',
    title: `Redes de Plâncton e Amostragem — Aquatic-Biotechnology | ${SITE}`,
    desc: 'Redes WP2, amostradores de água, dragas Van Veen e material de exame de plâncton Aquatic-Biotechnology para investigação aquática e ambiental.',
  },
  {
    path: 'oceanografia/kc-denmark',
    title: `Equipamento de Monitorização Sedimentar — KC Denmark | ${SITE}`,
    desc: 'Instrumentos KC Denmark para monitorização sedimentar, turbidez e amostragem de sedimento em limnologia e oceanografia costeira.',
  },
  {
    path: 'oceanografia/osil',
    title: `Água do Mar de Referência e Padrões — OSIL | ${SITE}`,
    desc: 'Água do mar de referência, padrões de salinidade e materiais certificados OSIL para calibração de CTDs e instrumentação oceanográfica.',
  },
  {
    path: 'oceanografia/outras-marcas',
    title: `Outras Marcas de Oceanografia Representadas | ${SITE}`,
    desc: 'General Oceanics, Aquatic-Biotechnology, KC-Denmark e Osil — marcas complementares de oceanografia e amostragem representadas pela Wonderstatus em Portugal.',
  },
  {
    path: 'materiais-referencia',
    title: `Materiais de Referência Certificados — ROFA, LGC, NIST | ${SITE}`,
    desc: 'Materiais de referência certificados (CRM) para laboratórios de controlo de qualidade e acreditação. Representante exclusivo ROFA France. LGC Standards, NIST, NRC Canada, VKI e JRC-ERM.',
  },
  {
    path: 'drones',
    title: `Drones para Monitorização Ambiental e Oceanográfica | ${SITE}`,
    desc: 'UAVs e drones para monitorização ambiental, levantamentos costeiros, recolha de amostras e vigilância aquática com sensores ambientais e oceanográficos.',
  },
  {
    path: 'micotoxinas',
    title: `Detecção de Micotoxinas — Kits Rápidos e ELISA | ${SITE}`,
    desc: 'Kits de detecção rápida (lateral flow) e ELISA para micotoxinas em cereais, alimentos e rações: aflatoxinas, DON, fumonisinas, OTA, zearalenona e T-2/HT-2.',
  },
  {
    path: 'produtos',
    title: `Catálogo de Produtos — Sistemas de Água Ultrapura | ${SITE}`,
    desc: 'Catálogo de produtos Wonderstatus: sistemas de produção de água ultrapura WATER 75, WATER 75 XL e WATER 300, dispensadores e sistemas de pré-tratamento.',
  },
  {
    path: 'produtos/water-75',
    title: `WATER 75 — Sistema de Água Ultrapura 11 L/h | ${SITE}`,
    desc: 'Sistema compacto de produção de água ultrapura Tipo I (18,2 MΩ·cm) para laboratório. Produção 11 L/h, até 60 L/dia. Filtro 0,22 μm e desinfeção UV automática.',
  },
  {
    path: 'produtos/water-75-xl',
    title: `WATER 75 XL — Sistema de Água Ultrapura 18 L/h | ${SITE}`,
    desc: 'Sistema intermédio de produção de água ultrapura Tipo I (18,2 MΩ·cm) para laboratório. Produção 18 L/h, até 200 L/dia. Ideal para HPLC, ICP, biologia molecular.',
  },
  {
    path: 'produtos/water-300',
    title: `WATER 300 — Sistema Industrial de Água Ultrapura 35 L/h | ${SITE}`,
    desc: 'Sistema industrial de produção de água ultrapura Tipo I (18,2 MΩ·cm) para laboratórios com consumos superiores a 300 L/dia. Produção 35 L/h.',
  },
  {
    path: 'peixe-zebra',
    title: `Peixe Zebra — Equipamentos de Análise Comportamental | ${SITE}`,
    desc: 'Equipamentos de rastreamento comportamental para peixe zebra — de embrião a adulto. ZebraBox, ZebraLab, VisioBox, ZebraTower e muito mais.',
  },
  {
    path: 'marcas',
    title: `Marcas Representadas — Equipamento Científico | ${SITE}`,
    desc: 'Marcas internacionais de equipamento científico representadas pela Wonderstatus em Portugal: JP SELECTA, NKE, Hydrobios, Seaber, Auxilab, CRUMA, Socorex, Milwaukee e ROFA.',
  },
];

function injectMeta(html, title, desc, path) {
  const canonical = `${BASE_URL}/${path}`;
  const d = escapeHtml(desc);
  const t = escapeHtml(title);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    // multiline description tag: <meta\n      name="description"\n      content="..."\n    />
    .replace(/<meta\s[^>]*name="description"[^>]*>/s, `<meta name="description" content="${d}" />`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${t}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${d}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${t}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${d}"`);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let count = 0;
for (const route of routes) {
  const dir = join(distDir, route.path);
  mkdirSync(dir, { recursive: true });
  const html = injectMeta(base, route.title, route.desc, route.path);
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
  count++;
}

console.log(`✓ Pré-renderização de meta tags: ${count} rotas geradas.`);
