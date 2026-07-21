export const categories = [
  {
    slug: 'material-laboratorio',
    name: 'Material de Laboratório',
    shortName: 'Laboratório',
    description:
      'Catálogo por marcas, categorias e famílias para filtração, cromatografia, volumetria e consumíveis de rotina.',
    image: '/assets/slide1.JPG',
    icon: 'flask',
    highlights: ['Vidro e volumetria', 'Filtração e cromatografia', 'Consumíveis de rotina']
  },
  {
    slug: 'oceanografia',
    name: 'Oceanografia',
    shortName: 'Oceanografia',
    description:
      'Soluções WiSens, WiMo e WiHub para monitorização subaquática, marés, CTD, oxigénio dissolvido e turbidez.',
    image: '/assets/slide2.JPG',
    icon: 'wave',
    highlights: ['Até 6000 m', 'Wi-Fi e ativação magnética', 'CSV / ZIP']
  },
  {
    slug: 'agua',
    name: 'Sistemas de Produção de Água',
    shortName: 'Água',
    description:
      'Produção e purificação de água ultrapura (Tipo I) e pura (Tipo II) para laboratório, hospital e indústria.',
    image: '/assets/fotos/h2o-slide.jpg?v=2',
    icon: 'drop',
    highlights: ['Tipo I e II', 'Pré-tratamento', 'Controlo e dispensa']
  },
  {
    slug: 'quimica',
    name: 'Química',
    shortName: 'Química',
    description:
      'Consumíveis e equipamentos para AAS, IC, ICP, CHNS e digestão de metais, com compatibilidade multimarca.',
    image: '/assets/slide4.JPG',
    icon: 'atom',
    highlights: ['AAS e ICP/ICP-MS', 'CHN/O/S e TOC', 'Digestão de metais']
  },
  {
    slug: 'peixe-zebra',
    name: 'Peixe Zebra',
    shortName: 'Peixe Zebra',
    description:
      'Equipamentos de rastreamento comportamental para peixe zebra — ZebraBox, ZebraLab, VisioBox, ZebraTower e mais.',
    image: '/assets/fotos/viewpoint/zebrafish-banner.jpg',
    icon: 'fish',
    highlights: ['Embrião · Larva · Adulto', 'Comportamento e cognição', 'Cardiologia e visão']
  },
  {
    slug: 'drones',
    name: 'Drones',
    shortName: 'Drones',
    description:
      'Hydra 7, plataforma aérea modular de 7" para operações técnicas de longo alcance, com DJI O4 Pro.',
    image: '/assets/fotos/drones/taurus-x8-banner.jpg',
    icon: 'drone',
    highlights: ['DJI O4 Pro', 'Long range', 'Modular e reparável']
  },
  {
    slug: 'micotoxinas',
    name: 'Micotoxinas',
    shortName: 'Micotoxinas',
    description:
      'Padrões e soluções para análise de micotoxinas em LC-MS/MS e HPLC, com produção personalizada e ISO 17034.',
    image: '/assets/slide6.JPG',
    icon: 'molecule',
    highlights: ['Native e C13 labeled', 'Multi-components mixtures', 'ISO 17034']
  }
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c])
);
