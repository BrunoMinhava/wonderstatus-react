/**
 * Fichas técnicas detalhadas dos produtos Wonderstatus Water.
 * Usadas nas páginas de detalhe em /produtos/water-75, etc.
 */
export const waterProductDetails = {
  'water-75': {
    slug: 'water-75',
    name: 'WATER 75',
    kicker: 'Sistema de Purificação · 11 L/h',
    subtitle: 'Sistema compacto para rotinas laboratoriais com consumo diário até 60 L.',
    lead: 'A série WATER 75 foi pensada para laboratórios que precisam de água de elevada qualidade em rotinas diárias controladas, com eficiência energética e estabilidade operacional a longo prazo.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['Até 60 L/dia', 'Tipo I · II', 'Desenvolvimento Próprio'],
    images: [
      { src: '/assets/fotos/water75xl-equipment-cutout.png', label: 'Equipamento' },
      { src: '/assets/fotos/water75-equipment.png', label: 'Vista frontal' },
      { src: '/assets/importados/water75.png', label: 'Foto do equipamento' }
    ],
    meta: [
      'Produção de 11 L/h',
      'Volume diário recomendado até 60 L',
      'Compatível com Tipo I e II',
      'Monitorização em tempo real',
      'Eficiência energética elevada',
      'Filtro final antimicrobiano 0.22 μm'
    ],
    specs: [
      { label: 'Produção', value: '11 L/h' },
      { label: 'Volume diário', value: 'Até 60 L' },
      { label: 'Tipo I (Ultrapura)', value: '18,2 MΩ·cm / ~0,055 μS/cm' },
      { label: 'Tipo II (Pura)', value: '≥ 10 MΩ·cm / ≤ 0,1 μS/cm' },
      { label: 'Reservatório', value: '16 L / 30 L / 80 L' },
      { label: 'Desinfeção', value: 'UV automática' },
      { label: 'Filtro final', value: '0.22 μm antimicrobiano' },
      { label: 'Controlo', value: 'Eletrónico com ecrã' },
      { label: 'Alimentação', value: '230 V AC, 50/60 Hz' }
    ],
    applications: [
      { title: 'Laboratórios gerais', description: 'Preparação de soluções, lavagens e análises de rotina com baixo risco de contaminação.' },
      { title: 'HPLC', description: 'Produção de água de alta pureza para cromatografia líquida.' },
      { title: 'Análise clínica', description: 'Ambientes analíticos com exigências de pureza controlada.' },
      { title: 'Investigação', description: 'Apoio a laboratórios de I&D com consumos moderados.' }
    ],
    compatibility: [
      'HPLC standard e gradient grade',
      'Preparação tampões e soluções',
      'Análise de águas',
      'Biologia molecular (com filtro adequado)',
      'Microbiologia de rotina',
      'Análise elementar básica'
    ]
  },
  'water-75-xl': {
    slug: 'water-75-xl',
    name: 'WATER 75 XL',
    kicker: 'Sistema Intermédio · 60 L/h',
    subtitle: 'Versão intermédia para necessidades técnicas com maior autonomia diária — até 200 L.',
    lead: 'Produção reforçada para rotinas de laboratório e ambientes técnicos que requerem volumes superiores sem perder controlo de qualidade. Mantém a arquitetura modular da série WATER com capacidade de upgrade.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['Até 200 L/dia', 'Upgrade disponível', 'Tipo I · II'],
    images: [
      { src: '/assets/fotos/water75xl-equipment-cutout.png', label: 'Equipamento' },
      { src: '/assets/fotos/water75xl-preview-v5.png', label: 'Preview' },
      { src: '/assets/fotos/water75xl-equipment-cutout-v5.png', label: 'Frontal v5' },
      { src: '/assets/fotos/water75xl-preview-v4.png', label: 'Preview v4' }
    ],
    meta: [
      'Produção de 60 L/h',
      'Volume diário até 200 L',
      'Adequado para rotinas intermédias',
      'Upgrade disponível',
      'Desinfeção UV incorporada',
      'Compatível com todos os reservatórios da série'
    ],
    specs: [
      { label: 'Produção', value: '60 L/h' },
      { label: 'Volume diário', value: 'Até 200 L' },
      { label: 'Tipo I (Ultrapura)', value: '18,2 MΩ·cm / ~0,055 μS/cm' },
      { label: 'Tipo II (Pura)', value: '≥ 10 MΩ·cm / ≤ 0,1 μS/cm' },
      { label: 'Reservatório', value: '16 L / 30 L / 80 L' },
      { label: 'Desinfeção', value: 'UV automática' },
      { label: 'Filtro final', value: '0.22 μm antimicrobiano' },
      { label: 'Controlo', value: 'Eletrónico com ecrã e alertas' },
      { label: 'Upgrade', value: 'Disponível' }
    ],
    applications: [
      { title: 'Laboratórios multi-bancada', description: 'Abastecimento estável a vários postos de trabalho em paralelo.' },
      { title: 'Química analítica', description: 'ICP, ICP-MS e rotinas analíticas com exigências elevadas.' },
      { title: 'Análise de águas', description: 'Preparação de calibrantes, brancos e soluções padrão.' },
      { title: 'Hospital / Clínica', description: 'Suporte a equipamentos críticos em ambiente hospitalar.' }
    ],
    compatibility: [
      'HPLC gradient e UHPLC',
      'ICP e ICP-MS',
      'Análise elementar',
      'Biologia molecular (DNase/RNase-free)',
      'Microbiologia',
      'Preparação de amostras ambientais'
    ]
  },
  'water-300': {
    slug: 'water-300',
    name: 'WATER 300',
    kicker: 'Topo de Gama · 180 L/h',
    subtitle: 'Sistema robusto para instalações com consumos diários superiores a 300 L.',
    lead: 'Topo de gama da série WATER, projetado para instalações laboratoriais e industriais que exigem autonomia elevada, estabilidade operacional e integração com módulos complementares.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['180 L/h', 'Topo de gama', 'Integração modular'],
    images: [
      { src: '/assets/fotos/water300-equipment-cutout.png', label: 'Vista principal' },
      { src: '/assets/fotos/water300-equipment-cutout-v2.png', label: 'Vista v2' },
      { src: '/assets/fotos/water300-equipment-cutout-with-bg.png', label: 'Com fundo' },
      { src: '/assets/fotos/water300-preview-v2.png', label: 'Preview' },
      { src: '/assets/fotos/water300-equipment.jpg', label: 'Foto real' }
    ],
    meta: [
      'Produção de 180 L/h',
      'Consumos superiores a 300 L/dia',
      'Configuração robusta para indústria',
      'Integração com módulos complementares',
      'Controlo eletrónico avançado',
      'Monitorização contínua'
    ],
    specs: [
      { label: 'Produção', value: '180 L/h' },
      { label: 'Volume diário', value: 'Superior a 300 L' },
      { label: 'Tipo I (Ultrapura)', value: '18,2 MΩ·cm / ~0,055 μS/cm' },
      { label: 'Tipo II (Pura)', value: '≥ 10 MΩ·cm / ≤ 0,1 μS/cm' },
      { label: 'Reservatório', value: '30 L / 80 L + extensões' },
      { label: 'Desinfeção', value: 'UV + filtro final 0.22 μm' },
      { label: 'Controlo', value: 'Avançado com histórico e alarmes' },
      { label: 'Módulos', value: 'WaterControl, Dispensador, WaterGuard' },
      { label: 'Upgrade', value: 'Disponível' }
    ],
    applications: [
      { title: 'Indústria farmacêutica', description: 'Produção estável para rotinas industriais de preparação.' },
      { title: 'Análise ambiental', description: 'Laboratórios com elevado volume de amostras e calibrações diárias.' },
      { title: 'Hospital', description: 'Abastecimento de equipamentos críticos com maior autonomia.' },
      { title: 'Laboratórios centrais', description: 'Instalações multi-departamento com consumos agregados.' }
    ],
    compatibility: [
      'HPLC, UHPLC, LC-MS/MS',
      'ICP, ICP-MS, ICP-OES',
      'TOC e análise elementar',
      'Microbiologia industrial',
      'Preparação de reagentes em série',
      'Integração com WaterControl/Dispensador/WaterGuard'
    ]
  },
  watercontrol: {
    slug: 'watercontrol',
    name: 'WaterControl',
    kicker: 'Sistema de Controlo Inteligente',
    subtitle: 'Monitorização contínua de pressão, UV, volume produzido e manutenção preventiva.',
    lead: 'Módulo de controlo eletrónico para sistemas WATER com gestão automática da desinfeção UV, monitorização de pressão e consumo da bomba, contagem de volume produzido e alertas de manutenção preventiva.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['Controlo eletrónico', 'UV automático'],
    images: [
      { src: '/assets/fotos/watercontrol-programas.png', label: 'Interface do sistema' }
    ],
    meta: [
      'Monitoriza pressão e consumo da bomba',
      'Gere automaticamente a desinfeção UV',
      'Contagem de volume produzido',
      'Ajuda na manutenção preventiva',
      'Segurança operacional reforçada',
      'Compatível com toda a série WATER'
    ],
    specs: [
      { label: 'Tipo', value: 'Módulo de controlo eletrónico' },
      { label: 'Compatibilidade', value: 'Série WATER (75, 75 XL, 300)' },
      { label: 'Monitorização', value: 'Pressão, consumo, UV, volume' },
      { label: 'Alertas', value: 'Filtros, membranas, UV' },
      { label: 'Interface', value: 'Ecrã digital com estado em tempo real' }
    ],
    applications: [
      { title: 'Gestão de instalação', description: 'Controlo centralizado dos parâmetros do sistema WATER.' },
      { title: 'Manutenção preventiva', description: 'Alertas programados para troca de filtros, membranas e lâmpada UV.' },
      { title: 'Redução de downtime', description: 'Deteção precoce de problemas de pressão ou consumo.' }
    ]
  },
  dispenser: {
    slug: 'dispenser',
    name: 'Dispensador',
    kicker: 'Sistema Eletrónico de Dispensa',
    subtitle: 'Dispensa precisa de água Tipo I e Tipo II em volumes programáveis.',
    lead: 'Dispensador eletrónico com volumes pré-programados de 100 / 250 / 500 ml e 1 / 3 / 5 L, integrado com os sistemas WATER para dispensa controlada no ponto de utilização.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['Volume programável', 'Tipo I e II'],
    images: [
      { src: '/assets/fotos/dispensador-programas.png', label: 'Interface' }
    ],
    meta: [
      'Volumes 100 / 250 / 500 ml',
      'Volumes 1 / 3 / 5 L',
      'Dispensa de água Tipo I e Tipo II',
      'Integrado com série WATER',
      'Operação simples e precisa',
      'Interface com ecrã'
    ],
    specs: [
      { label: 'Tipo', value: 'Dispensador eletrónico' },
      { label: 'Volumes ml', value: '100 / 250 / 500' },
      { label: 'Volumes L', value: '1 / 3 / 5' },
      { label: 'Água dispensada', value: 'Tipo I / Tipo II' },
      { label: 'Compatibilidade', value: 'Série WATER' }
    ],
    applications: [
      { title: 'Preparação de soluções', description: 'Dispensa precisa para reagentes, padrões e soluções.' },
      { title: 'Rotina laboratorial', description: 'Utilização no ponto em bancadas e salas analíticas.' },
      { title: 'Controlo de consumo', description: 'Gestão do volume dispensado por utilizador/rotina.' }
    ]
  },
  waterguard: {
    slug: 'waterguard',
    name: 'WaterGuard',
    kicker: 'Recirculação e Proteção Microbiológica',
    subtitle: 'Controlo da recirculação da água com desinfeção UV e sensores de pressão e temperatura.',
    lead: 'Módulo dedicado ao controlo da recirculação da água com proteção microbiológica automática — acionamento de bombas, lâmpadas germicidas e sensores de pressão e temperatura para reforçar segurança, continuidade e estabilidade do sistema.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['UV germicida', 'Recirculação inteligente'],
    images: [{ src: '/assets/fotos/waterguard-programas.png', label: 'Interface' }],
    meta: [
      'Automatiza acionamento de bombas',
      'Gestão de lâmpadas germicidas',
      'Sensores de pressão',
      'Sensores de temperatura',
      'Segurança e continuidade do sistema',
      'Integração com série WATER'
    ],
    specs: [
      { label: 'Tipo', value: 'Módulo de recirculação com UV' },
      { label: 'Proteção', value: 'Microbiológica (UV germicida)' },
      { label: 'Sensores', value: 'Pressão e temperatura' },
      { label: 'Compatibilidade', value: 'Série WATER + pré-tratamento' }
    ],
    applications: [
      { title: 'Hospitais', description: 'Proteção microbiológica contínua em ambientes críticos.' },
      { title: 'Indústria alimentar', description: 'Recirculação controlada com desinfeção permanente.' },
      { title: 'Laboratórios exigentes', description: 'Estabilidade de qualidade microbiológica em linhas de distribuição.' }
    ]
  },
  'pre-tratamento': {
    slug: 'pre-tratamento',
    name: 'Sistema de Pré-Tratamento',
    kicker: 'Proteção da Instalação',
    subtitle: 'Tratamento multi-camada para água de rede com dureza, ferro ou compostos críticos.',
    lead: 'Sistema de pré-tratamento multi-camada para proteger os equipamentos quando a água da rede apresenta dureza elevada, ferro, manganês ou turvação. Regeneração automática e vida útil do meio cerca de 10 anos.',
    category: { name: 'Sistemas de Produção de Água', slug: '/agua' },
    brand: { name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png' },
    badges: ['Multi-camada', 'Regeneração automática', '~10 anos vida útil'],
    images: [
      { src: '/assets/fotos/pretratamento-sistema.png', label: 'Sistema' },
      { src: '/assets/importados/pretratamento.png', label: 'Vista técnica' }
    ],
    meta: [
      'Sistema de tratamento multi-camada',
      'Remove dureza, turvação, ferro e manganês',
      'Regeneração automática através de sal',
      'Vida útil aproximada: 10 anos',
      'Programação automática lavagem/regeneração',
      'Protege equipamentos downstream'
    ],
    specs: [
      { label: 'Tipo', value: 'Pré-tratamento multi-camada' },
      { label: 'Remoção', value: 'Dureza, turvação, Fe, Mn' },
      { label: 'Regeneração', value: 'Automática (sal)' },
      { label: 'Vida útil do meio', value: '~10 anos' },
      { label: 'Programação', value: 'Automática lavagem/regeneração' },
      { label: 'Proteção', value: 'Equipamentos downstream (WATER 75/XL/300)' }
    ],
    applications: [
      { title: 'Águas duras', description: 'Redução de dureza para proteger osmose inversa e UV.' },
      { title: 'Salas de lavagem', description: 'Preparação de água em laboratórios e instalações sanitárias.' },
      { title: 'Edifícios técnicos', description: 'Proteção de linhas de distribuição e equipamentos em edifícios.' },
      { title: 'Indústria', description: 'Pré-tratamento para sistemas de alta produção e continuidade.' }
    ]
  }
};
