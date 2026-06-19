// Gama Water + sistemas complementares + pré-tratamento
export const waterProducts = [
  {
    id: 'water-75',
    name: 'WATER 75',
    kicker: 'Produção 11 L/h',
    lead: 'Sistema pensado para laboratórios e rotinas com consumo diário controlado.',
    image: '/assets/fotos/water75-equipment.png',
    meta: [
      'Ideal para volumes diários até 60 L',
      'Foco em eficiência, economia e estabilidade',
      'Compatível com aplicações laboratoriais exigentes'
    ],
    badges: ['Até 60 L/dia', 'Tipo I e II']
  },
  {
    id: 'water-75-xl',
    name: 'WATER 75 XL',
    kicker: 'Produção 60 L/h',
    lead: 'Versão intermédia para necessidades técnicas com maior autonomia diária.',
    image: '/assets/fotos/water75xl-equipment-cutout.png',
    meta: [
      'Ideal para volumes diários até 200 L',
      'Solução equilibrada para rotinas intermédias',
      'Escala a operação sem perder controlo de qualidade'
    ],
    badges: ['Até 200 L/dia', 'Upgrade disponível']
  },
  {
    id: 'water-300',
    name: 'WATER 300',
    kicker: 'Produção 180 L/h',
    lead: 'Topo de gama da série para instalações com consumos diários mais elevados.',
    image: '/assets/fotos/water300-equipment-cutout.png',
    meta: [
      'Indicado para consumos superiores a 300 L por dia',
      'Configuração robusta para ambientes laboratoriais e industriais',
      'Preparado para integração com módulos complementares'
    ],
    badges: ['180 L/h', 'Topo de gama']
  }
];

export const complementarySystems = [
  {
    id: 'watercontrol',
    name: 'WaterControl',
    lead: 'Controlo inteligente do sistema.',
    image: '/assets/fotos/watercontrol-programas.png',
    meta: [
      'Monitoriza pressão e consumo elétrico da bomba',
      'Gere automaticamente a desinfeção por UV',
      'Faz contagem do volume de água produzido',
      'Ajuda na manutenção preventiva e segurança do equipamento'
    ]
  },
  {
    id: 'dispenser',
    name: 'Dispensador',
    lead: 'Sistema eletrónico para dispensar água Tipo I e Tipo II.',
    image: '/assets/fotos/dispensador-programas.png',
    meta: [
      'Volumes disponíveis: 100 / 250 / 500 ml',
      'Volumes disponíveis: 1 / 3 / 5 L'
    ]
  },
  {
    id: 'waterguard',
    name: 'WaterGuard',
    lead: 'Módulo dedicado ao controlo da recirculação da água com proteção microbiológica.',
    image: '/assets/fotos/waterguard-programas.png',
    meta: [
      'Automatiza o acionamento de bombas e lâmpadas germicidas',
      'Inclui sensores de pressão e temperatura',
      'Reforça segurança, continuidade e estabilidade do sistema'
    ]
  }
];

export const pretreatment = {
  id: 'pre-tratamento',
  name: 'Sistema de Pré-Tratamento',
  lead: 'Solução complementar para água de rede com dureza, ferro ou compostos que prejudiquem os equipamentos.',
  image: '/assets/fotos/pretratamento-sistema.png',
  meta: [
    'Sistema de tratamento multi-camada',
    'Remove dureza, turvação, ferro e manganês',
    'Regeneração automática através de sal',
    'Vida útil aproximada do meio: cerca de 10 anos',
    'Programação automática para lavagem e regeneração'
  ]
};

export const waterTypes = [
  {
    kicker: 'Tipo I',
    title: 'Água Ultrapura',
    description: 'Para aplicações que exigem o nível máximo de pureza.'
  },
  {
    kicker: 'Tipo II',
    title: 'Água Pura',
    description: 'Para rotinas técnicas com controlo rigoroso da qualidade da água.'
  }
];

export const waterSpecs = {
  header: ['Características', 'Água Tipo I', 'Água Tipo II'],
  rows: [
    ['Resistividade (MΩ·cm)', '18,2', '≥ 10'],
    ['Condutividade (μS/cm)', '~0,055', '≤ 0,1'],
    ['Carbono Orgânico Total (ppb)', '≤ 10', '≤ 50'],
    ['Sódio (ppb)', '≤ 1', '≤ 5'],
    ['Cloro (ppb)', '≤ 1', '≤ 5'],
    ['Sílice Total (ppb)', '≤ 3', '≤ 3'],
    ['Endotoxinas (IU/ml)', '< 0,03', '< 0,25']
  ],
  note: 'Conteúdo bacteriano < 1 ufc/ml com filtro final 0,22 μm.'
};

export const processSteps = [
  { title: 'Filtragem de Sedimentos', description: 'A água passa por um filtro de sedimentos que retém partículas suspensas até 5 microns (areia, lodo, poeira, algas, etc.).' },
  { title: 'Eliminação do Cloro', description: 'Filtro de carvão ativado que remove cloro e compostos orgânicos responsáveis por sabor e odor.' },
  { title: 'Osmose Inversa', description: 'Membrana semipermeável que remove a maioria dos sais dissolvidos e contaminantes, reduzindo condutividade e preparando a água para polimento.' },
  { title: 'Reservatório Pressurizado', description: 'Armazenamento intermédio de água pré-purificada para pronta utilização. Volumes: 16 L, 30 L e 80 L.' },
  { title: 'Polimento', description: 'Resinas de troca iónica que elevam a resistividade da água a 18,2 MΩ·cm (~0,055 μS/cm) para produção de Tipo I.' },
  { title: 'Foto-oxidação', description: 'Lâmpada UV que reduz o carbono orgânico total e destrói microrganismos.' },
  { title: 'Filtro Final Antimicrobiano', description: 'Filtro 0.22 μm que garante a pureza microbiológica final no ponto de dispensa.' }
];

export const waterApplications = [
  { title: 'Laboratórios', description: 'Água de elevada pureza para análises instrumentais, preparação de soluções e protocolos sensíveis à contaminação.' },
  { title: 'Hospitais', description: 'Soluções para ambientes técnicos e equipamentos críticos.' },
  { title: 'Indústria', description: 'Configurações ajustadas ao consumo e à autonomia pretendida.' }
];

export const waterFeatures = [
  'Monitorização em tempo real',
  'Controlo da pressão de entrada',
  'Gestão do consumo da bomba',
  'Desinfeção automática por lâmpada UV',
  'Controlo do volume produzido',
  'Alertas de substituição de filtros e membranas',
  'Manutenção preventiva'
];

export const waterPillars = [
  'Design próprio',
  'Desenvolvimento e produção interna do equipamento',
  'Integração de eletrónica avançada, informática e impressão 3D',
  'Soluções standard e personalizadas',
  'Consultoria técnica especializada'
];
