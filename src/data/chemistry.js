export const chemCategories = [
  {
    id: 'tubos-grafite',
    title: 'Tubos de Grafite AAS',
    description: 'Gama para diferentes equipamentos e marcas com opções compatíveis.',
    items: [
      'Thermo Scientific',
      'Equivalentes Hitachi, Agilent e PerkinElmer',
      'Equivalentes Shimadzu e GBC'
    ]
  },
  {
    id: 'lampadas-catodo-oco',
    title: 'Lâmpadas de Cátodo Oco e D2',
    description: 'Tabs técnicas para 37 mm / 1.5", 50 mm / 2.0" e D2.',
    items: [
      '37 mm / 1.5" — HCL multimarca',
      '50 mm / 2.0" — HCL PerkinElmer',
      'D2 Lamps com filamento e notas de compatibilidade'
    ]
  },
  {
    id: 'icp-icpms',
    title: 'Consumíveis para ICP / ICP-MS',
    description: 'Catálogo técnico com navegação por fabricante, modelo, categoria e referências.',
    items: ['Nebulizadores', 'Tochas', 'Cones e consumíveis MS']
  },
  {
    id: 'chns-toc',
    title: 'Consumíveis para CHN/O/S, TOC e Análise Elementar',
    description: 'Acesso externo por categoria, fabricante e referência.',
    items: ['CHN/O/S', 'TOC', 'Análise elementar']
  },
  {
    id: 'digestor',
    title: 'Digestor de Metais e Ácidos',
    description: 'Equipamentos e soluções para digestão e preparação de amostras.',
    items: ['Tubos de digestão', 'Filtração', 'Preparação de amostras']
  }
];

export const chemTabsAAS = [
  {
    key: 'thermo',
    label: 'Thermo Scientific',
    description: 'Linhas dedicadas de tubos de grafite e componentes Thermo.'
  },
  {
    key: 'hitachi',
    label: 'Equivalentes Hitachi',
    description: 'Tabela técnica de equivalentes para instrumentos Hitachi.'
  },
  {
    key: 'agilent',
    label: 'Equivalentes Agilent',
    description: 'Tabela técnica de equivalentes para instrumentos Agilent.'
  },
  {
    key: 'perkinelmer',
    label: 'Equivalentes PerkinElmer',
    description: 'Tabela técnica de equivalentes para instrumentos PerkinElmer.'
  },
  {
    key: 'shimadzu',
    label: 'Equivalentes Shimadzu',
    description: 'Tabela técnica de equivalentes para instrumentos Shimadzu.'
  },
  {
    key: 'gbc',
    label: 'Equivalentes GBC',
    description: 'Tabela técnica de equivalentes para instrumentos GBC.'
  }
];

export const chemLampTabs = [
  { key: 'todos', label: 'Todos os instrumentos AA' },
  { key: 'mono', label: 'Mono-elementares' },
  { key: 'multi', label: 'Multi-elementares' },
  { key: 'd2', label: 'Lâmpadas de Deutério (D2)' }
];
