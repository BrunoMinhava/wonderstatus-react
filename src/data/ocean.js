export const wiSensSensors = [
  {
    tag: 'Temperatura e pressão',
    name: 'WiSens TD',
    description: 'Para temperatura e pressão, com variantes 30 m, 300 m, 1000 m e opção até 6000 m.',
    features: [
      'Profundidades de 30 / 300 / 1000 m',
      'Versão TD 6000 com corpo em titânio',
      'Temperatura: -2 °C a +35 °C'
    ]
  },
  {
    tag: 'Maré e ondas',
    name: 'WiSens Wave',
    description: 'Desenhado para registo de marés, ondas e temperatura em campanhas costeiras.',
    features: [
      'Profundidade de 30 m',
      'Amostragem até 16 Hz',
      'Ideal para estudos de onda e maré'
    ]
  },
  {
    tag: 'Condutividade, temperatura e profundidade',
    name: 'WiSens CTD',
    description: 'Disponível para água doce e água marinha, com cálculo de salinidade e velocidade do som.',
    features: [
      'Água doce: condutividade de 0 a 10 mS/cm',
      'Água marinha: 0 a 70 mS/cm e 2 a 42 PSU',
      'Velocidade do som: 1300 a 1700 m/s'
    ]
  },
  {
    tag: 'Oxigénio dissolvido',
    name: 'WiSens DO',
    description: 'Para concentração de oxigénio e saturação de oxigénio, em medições até 1000 m.',
    features: [
      'Concentração: 0 a 23 mg/L',
      'Máximo até 44 mg/L',
      'Saturação: 0 a 250%, máximo 500%'
    ]
  },
  {
    tag: 'Fluorescência',
    name: 'WiSens Cloro-A',
    description: 'Registo de clorofila-A para campanhas ambientais e monitorização de coluna de água.',
    features: [
      'Até 1000 m',
      'Gama indicada: 0 a 500 ppb',
      'Compatível com escova de limpeza externa automática'
    ]
  },
  {
    tag: 'Turbidez',
    name: 'WiSens TBD',
    description: 'Para turbidez, temperatura e profundidade em monitorização ambiental e trabalho costeiro.',
    features: [
      'Profundidades de 30 / 300 m',
      'Gama de turbidez: 0 a 4000 FNU',
      'Escova de limpeza externa automática opcional'
    ]
  }
];

export const oceanFacts = [
  { value: '1 s a 99 h', label: 'Amostragem programável para TD, CTD, TBD, Cloro-A e DO' },
  { value: '1 a 16 Hz', label: 'Aquisição para onda e maré' },
  { value: 'CSV / ZIP', label: 'Saída de dados pronta para integração e arquivo' },
  { value: 'Opcional', label: 'Escova de limpeza externa automática em TBD e Cloro-A' }
];

export const oceanFeatures = [
  'Relógio interno com calendário, com deriva inferior a 1 minuto por mês',
  'Modo Start and Stop manual ou programável, com gatilho por pressão e temperatura',
  'Memória de 16 MB, equivalente a cerca de 3 milhões de medições',
  'Baterias de lítio substituíveis e comunicação Wi-Fi com ativação magnética'
];

export const oceanApplications = [
  { title: 'Submersão marinha', description: 'Campanhas de imersão e monitorização prolongada em ambiente marinho.' },
  { title: 'Monitorização ambiental', description: 'Projetos de qualidade da água, seguimento de parâmetros e observação ambiental.' },
  { title: 'Atividades pesqueiras', description: 'Operações ligadas a pesca, esforço de pesca e contexto operacional costeiro.' },
  { title: 'Oceano profundo', description: 'Soluções orientadas para medições de profundidade e campanhas até 6000 m.' }
];

export const wiHub = {
  title: 'Recuperação automática de dados fora de água',
  description:
    'O WiHub complementa a gama WiSens com recolha automática de dados, localização e envio para interface web, e-mail ou FTP.',
  facts: [
    { value: '3G / 4G', label: 'Comunicação principal, com Ethernet e Wi-Fi' },
    { value: 'GNSS', label: 'Posicionamento incorporado' },
    { value: 'IP67', label: 'Estanquidade para operação no exterior' },
    { value: 'FTP / SMTP / HTTP', label: 'Protocolos suportados' }
  ],
  features: [
    'Fonte de energia: 9 a 27 V DC',
    'Temperatura de operação: -20 °C a +50 °C',
    'Temperatura de armazenamento: -20 °C a +70 °C',
    'Preparado para envio de dados por interface web, e-mail ou FTP'
  ]
};

export const wiSensTechSpecs = [
  { characteristic: 'Tempo', config: 'Relógio interno com calendário', value: '< 1 min/mês' },
  { characteristic: 'Modo "Start and Stop"', config: 'Manual ou programável', value: 'Gatilho de nível de pressão e temperatura para aquisição de dados' },
  { characteristic: 'Taxa de amostragem', config: 'TD / CTD / TBD / Cloro-A / DO', value: 'Programável de 1 s até 99 h' },
  { characteristic: 'Taxa de amostragem', config: 'Onda', value: 'De 1 Hz até 16 Hz, com número de amostras entre 512 e 32768' },
  { characteristic: 'Taxa de amostragem', config: 'Maré', value: 'De 1 Hz até 16 Hz, com duração média típica de 1 min a 1 h' },
  { characteristic: 'Autonomia', config: 'Memória', value: '16 MB, equivalente a cerca de 3 milhões de medições' },
  { characteristic: 'Autonomia', config: 'Energia', value: 'Baterias de lítio substituíveis' },
  { characteristic: 'Dados', config: 'Formato', value: 'CSV / ZIP' },
  { characteristic: 'Comunicação', config: 'Wi-Fi', value: 'Ativação magnética' },
  { characteristic: 'Escova limpadora', config: 'TBD / Cloro-A', value: 'Escova de limpeza externa automática opcional' }
];

export const wiSensPhysicalSpecs = [
  { model: 'WiSens TD 30 / 300 / 1000', dimensions: '220 mm x Ø 45 mm', weightAir: '267 g', weightWater: '51 g' },
  { model: 'WiSens Wave', dimensions: '220 mm x Ø 45 mm', weightAir: '262 g', weightWater: '51 g' },
  { model: 'WiSens CTD', dimensions: '320 mm x Ø 45 mm', weightAir: '320 g', weightWater: 'Alguns gramas' },
  { model: 'WiSens Cloro-A', dimensions: '220 mm x Ø 45 mm', weightAir: '283 g', weightWater: '51 g' },
  { model: 'WiSens DO', dimensions: '220 mm x Ø 45 mm', weightAir: '295 g', weightWater: '51 g' },
  { model: 'WiSens TBD', dimensions: '220 mm x Ø 45 mm', weightAir: '287 g', weightWater: '51 g' },
  { model: 'Proteção TD / Cloro-A / DO / TBD', dimensions: '230 mm x Ø 94 mm', weightAir: '760 g', weightWater: 'Alguns gramas' },
  { model: 'Proteção CTD', dimensions: '275 mm x Ø 94 mm', weightAir: '868 g', weightWater: '64 g' }
];

export const wiSensParameterMatrix = [
  {
    model: 'WiSens TD',
    depth: [['Gama', '30 / 300 / 1000 m'], ['Acurácia', '0,1%'], ['Opção', '6000 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null, conductivity: null, salinity: null, soundSpeed: null, o2Conc: null, o2Sat: null, chloroA: null
  },
  {
    model: 'WiSens Wave',
    depth: [['Gama', '30 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null, conductivity: null, salinity: null, soundSpeed: null, o2Conc: null, o2Sat: null, chloroA: null
  },
  {
    model: 'WiSens CTD água doce',
    depth: [['Gama', '30 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null,
    conductivity: [['Gama', '0 a 10 mS/cm'], ['Acurácia', '10 µS/cm']],
    salinity: null, soundSpeed: null, o2Conc: null, o2Sat: null, chloroA: null
  },
  {
    model: 'WiSens CTD água marinha',
    depth: [['Gama', '30 / 300 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null,
    conductivity: [['Gama', '0 a 70 mS/cm'], ['Acurácia', '0,05 mS/cm']],
    salinity: [['Gama', '2 a 42 PSU'], ['Acurácia', '0,1 PSU']],
    soundSpeed: [['Gama', '1300 a 1700 m/s'], ['Acurácia', '0,001 m/s']],
    o2Conc: null, o2Sat: null, chloroA: null
  },
  {
    model: 'WiSens Cloro-A',
    depth: [['Gama', '30 / 300 / 1000 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null, conductivity: null, salinity: null, soundSpeed: null, o2Conc: null, o2Sat: null,
    chloroA: [['Gama', '0 a 500 ppb³'], ['Linearidade', 'r² > 0,99 para Rodomina WT']]
  },
  {
    model: 'WiSens DO',
    depth: [['Gama', '30 / 300 / 1000 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: null, conductivity: null, salinity: null, soundSpeed: null,
    o2Conc: [['Gama', '0 a 23 mg/L (máx. 44 mg/L)'], ['Acurácia', '±0,1 mg/L']],
    o2Sat: [['Gama', '0 a 250% (máx. 500%)'], ['Acurácia', '±1% de leitura']],
    chloroA: null
  },
  {
    model: 'WiSens TBD',
    depth: [['Gama', '30 / 300 m'], ['Acurácia', '0,1%']],
    temperature: [['Gama', '-2 °C a +35 °C'], ['Acurácia', '0,02 °C']],
    turbidity: [['Gama', '0 a 4000 FNU'], ['Acurácia', '4 FNU ou 5% da leitura']],
    conductivity: null, salinity: null, soundSpeed: null, o2Conc: null, o2Sat: null, chloroA: null
  }
];

export const wiMoSuiteDigital = {
  sections: [
    {
      heading: 'Parâmetros Nativos',
      rows: [
        { parameter: 'Temperatura', range: '-2 °C a +35 °C', accuracy: '±0,2 °C, em opção', resolution: '0,05 °C', noteRef: 'a' },
        { parameter: 'Pressão', range: '0 a 1 (opção) / 3 / 10 / 25 bar', accuracy: '±0,1%', resolution: '0,0002 bar', noteRef: 'a' }
      ]
    },
    {
      heading: 'Sensores',
      rows: [
        { parameter: 'Condutividade (C)', range: '0 a 10 mS/cm; 0 a 100 mS/cm', accuracy: '5 µS ou 0,5% da leitura; 25 µS ou 0,5% da leitura', resolution: '1 µS/cm; 1 µS/cm', noteRef: 'b' },
        { parameter: 'Temperatura', range: '-2 °C a +35 °C; -5 °C a +50 °C, em opção', accuracy: '±0,02 °C; ±0,05 °C', resolution: '0,001 °C; 0,001 °C', noteRef: 'b' },
        { parameter: 'Turbidez (Tbd)⁵', range: '0 a 4 000 NTU', accuracy: '±2% entre 0 e 999 NTU; ±5% entre 1000 e 4000 NTU', resolution: '0,01 NTU' },
        { parameter: 'Concentração de oxigénio', range: '0 a 23 mg/L (máx. 0 a 44 mg/L)', accuracy: '±0,1 mg/L', resolution: '0,01 mg/L' },
        { parameter: 'Saturação de oxigénio', range: '0 a 250% (máx. 0 a 500%)', accuracy: '±1% da leitura', resolution: '0,1%' },
        { parameter: 'Temperatura', range: '0 °C a +35 °C', accuracy: '±0,1 °C', resolution: '0,01 °C' },
        { parameter: 'Fluorescência (Fluo) Clorofila A', range: '0 a 500 ppb²', accuracy: 'Linearidade: r² > 0,99 para Rhodamine WT', resolution: '0,03 ppb' },
        { parameter: 'Fluorescência (Fluo) Ficocianina', range: '0 a 450 / 0 a 4500 ppb²', accuracy: 'Linearidade: r² > 0,99 para Rhodamine WT', resolution: '0,1 ppb' },
        { parameter: 'Fluorescência (Fluo) Ficoeritrina', range: '0 a 75 / 0 a 750 ppb²', accuracy: 'Linearidade: r² > 0,99 para Rhodamine WT', resolution: '0,1 ppb' },
        { parameter: 'CDOM fDOM', range: '0 a 150 / 0 a 1500 ppb QSE³', accuracy: 'Linearidade: r² > 0,99 QSE', resolution: '0,1 ppb QSE' },
        { parameter: 'Petróleo bruto', range: '0 a 1500 ppb⁴', accuracy: 'Linearidade: r² > 0,99', resolution: '0,2 ppb' },
        { parameter: 'Combustível refinado', range: '0 a 2350 ppb¹⁰', accuracy: 'Linearidade: r² > 0,99', resolution: '0,2 ppb' },
        { parameter: 'pH⁷', range: '0 a 14 unidades de pH', accuracy: '±0,1 unidade de pH', resolution: '0,01 unidade de pH' },
        { parameter: 'Redox / ORP⁶', range: '-1999 a +1999 mV', accuracy: '±20 mV', resolution: '0,1 mV' },
        { parameter: 'Nitrato⁶⁻⁸', range: '0 a 300 ppm', accuracy: '10% da leitura ou 2 ppm', resolution: '0,01 a 1 ppm' },
        { parameter: 'Amónio⁶⁻⁸', range: '0 a 200 ppm', accuracy: '10% da leitura ou 2 ppm', resolution: '0,01 a 1 ppm⁹' },
        { parameter: 'Cloreto', range: '2 a 250 mg/L', accuracy: '10% da leitura ou 2 mg/L', resolution: '0,001 a 1 mg/L-N' }
      ]
    },
    {
      heading: 'Parâmetros Calculados',
      rows: [
        { parameter: 'Cloreto', range: '0 a 18 000 mg/L-Cl', accuracy: '±15% da leitura ou ±5 mg/L-Cl', resolution: '0,01 mg/L' },
        { parameter: 'Profundidade', range: '0 a 10 (opção) / 30 / 100 / 250 m', accuracy: '0,1% FS', resolution: '0,01 m' },
        { parameter: 'Salinidade', range: '0 a 70 PSU', accuracy: '0,1 PSU ou 1% da leitura', resolution: '< 0,001' },
        { parameter: 'Velocidade do som', range: '1300 a 1700 m/s', accuracy: '0,001 m/s', resolution: 'Não especificado' },
        { parameter: 'Condutividade específica', range: '0 a 10 mS/cm; 0 a 100 mS/cm', accuracy: '5 µS ou 0,5% da leitura; 25 µS ou 0,5% da leitura', resolution: '1 µS/cm; 1 µS/cm' },
        { parameter: 'Sólidos dissolvidos totais', range: '0 a 10 000 mg/L; 0 a 100 000 mg/L', accuracy: '< ±5%', resolution: '1 mg/L; 10 mg/L' }
      ]
    }
  ],
  notes: [
    'Calibração recomendada: 1 ano para todos os sensores, excepto pH (3 meses) e ISE (6 meses) quando usados em água doce. * Baseado numa utilização standard.',
    'Notas: 1. Sensores smart intercambiáveis reais: cada sensor é calibrado independentemente. 2. Equivalente µg/L. 3. Sulfato de quinina. 4. PTSA. 5. Calibrado com Formazina (FNU). 6. Profundidade máxima de 15 m. 7. Profundidade máxima de 50 m em ponto fixo, 100 m em perfil, com máximo de 30 min. 8. Apenas para água doce. 9. Para alta concentração. 10. NDSA.'
  ],
  technicalNotes: [
    { label: 'a', text: 'As sondas integram internamente sensor de temperatura e pressão. Também integra bateria interna.' },
    { label: 'b', text: 'O sensor de Condutividade e Temperatura ocupam uma única entrada (2 em 1). Este sensor de temperatura tem uma gama de medição maior e mais precisa em relação ao que vem integrado na sonda.' },
    { label: 'c', text: 'O cabo de BUS além da informação, transporta também a energia para a sonda. Em caso de ruptura ou falha desse cabo a sonda continua a registar os dados usando a sua bateria interna.' }
  ]
};

export const wiMo = {
  title: 'Sonda digital multiparamétrica para monitorização modular em campo',
  description:
    'Solução multiparamétrica com sensores plug and play, comunicação sem fios, reconhecimento automático de sensores e versões WiMo e WiMo Plus.',
  overview: {
    heading: 'Visão geral da solução',
    text: 'A sonda WiMo é uma plataforma modular para campanhas de monitorização, com transmissão 3G/4G, ferramenta de calibração dedicada e suporte para múltiplos sensores numa única sonda.',
    features: [
      'Sensores plug and play com instalação simplificada',
      'Reconhecimento automático dos sensores e programação sem fios',
      'Capacidade interna de armazenamento e comunicação multi-plataforma',
      'Mais de 20 parâmetros em simultâneo, com temperatura e pressão incluídas',
      'Profundidade até 250 m e baterias standard substituíveis pelo utilizador'
    ]
  },
  specs: [
    { group: 'Características Físicas', parameter: 'Dimensões', value: 'WiMo com proteção: 560 mm; WiMo Plus com proteção: 580 mm' },
    { group: 'Características Físicas', parameter: 'Diâmetro', value: '85 mm e 110 mm' },
    { group: 'Características Físicas', parameter: 'Peso no ar', value: '2,65 kg e 3,05 kg' },
    { group: 'Características Mecânicas', parameter: 'Profundidade máxima', value: '250 metros' },
    { group: 'Características Mecânicas', parameter: 'Memória flash', value: '16 MB, até 2 milhões de medições' },
    { group: 'Características Mecânicas', parameter: 'Bateria', value: '6 pilhas alcalinas tipo D' },
    { group: 'Transmissão', parameter: 'Comunicação', value: 'Wi-Fi, Modbus RS232 / RS485, interface web embutida' },
    { group: 'Transmissão', parameter: 'Módulo', value: '3G / 4G, com módulo de transmissão' },
    { group: 'Temperatura', parameter: 'Operação', value: '-5 °C / +50 °C' },
    { group: 'Temperatura', parameter: 'Armazenamento', value: '-20 °C / +70 °C' }
  ]
};

export const hydroBiosFamilies = [
  {
    id: 'hydrobios-niskin',
    kicker: 'Hydrobios · Garrafas de Niskin',
    title: 'Amostradores individuais de água',
    description: 'Amostradores individuais para recolha da coluna de água — Ruttner, LIMNOS, MICROS, Free Flow, Niskin/PWS e Single Fire.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=1',
    sourceLabel: 'Ver catálogo completo — Single Water Samplers',
    products: [
      { name: 'Ruttner 1.0 l',                     image: 'https://www.hydrobios.de/images/produkte/354_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=47' },
      { name: 'Ruttner 2.0 l',                     image: 'https://www.hydrobios.de/images/produkte/72_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=204' },
      { name: 'Industrial Sampler',                 image: 'https://www.hydrobios.de/images/produkte/1_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=1' },
      { name: 'LIMNOS Water Sampler',               image: 'https://www.hydrobios.de/images/produkte/2_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=2' },
      { name: 'LIMNOS Water Sampler 4 bottle 1 l',  image: 'https://www.hydrobios.de/images/produkte/669_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=343' },
      { name: 'LIMNOS Water Sampler 4 bottle 2 l',  image: 'https://www.hydrobios.de/images/produkte/669_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=344' },
      { name: 'MICROS Water Sampler',               image: 'https://www.hydrobios.de/images/produkte/3_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=3' },
      { name: 'Integr. sampler 2.5 l',             image: 'https://www.hydrobios.de/images/produkte/7_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=7' },
      { name: 'Integr. sampler 5 l',               image: 'https://www.hydrobios.de/images/produkte/7_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=206' },
      { name: 'Integr. sampler 2.5 l 1000 m',      image: 'https://www.hydrobios.de/images/produkte/514_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=238' },
      { name: 'Integr. sampler 5 l 1000 m',        image: 'https://www.hydrobios.de/images/produkte/512_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=236' },
      { name: 'Free Flow 1 l',                     image: 'https://www.hydrobios.de/images/produkte/637_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=4' },
      { name: 'Free Flow 5 l',                     image: 'https://www.hydrobios.de/images/produkte/637_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=109' },
      { name: 'Free Flow 10 l',                    image: 'https://www.hydrobios.de/images/produkte/637_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=111' },
      { name: 'Niskin / PWS 1.7 l',               image: 'https://www.hydrobios.de/images/produkte/6_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=6' },
      { name: 'Niskin / PWS 2.5 l',               image: 'https://www.hydrobios.de/images/produkte/6_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=112' },
      { name: 'Niskin / PWS 3.5 l',               image: 'https://www.hydrobios.de/images/produkte/6_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=113' },
      { name: 'Niskin / PWS 5 l',                 image: 'https://www.hydrobios.de/images/produkte/6_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=114' },
      { name: 'Niskin / PWS 10 l',                image: 'https://www.hydrobios.de/images/produkte/6_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=116' },
      { name: 'Free Flow 5 l /SBE',               image: 'https://www.hydrobios.de/images/produkte/639_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=110' },
      { name: 'Niskin / PWS 5 l /SBE',            image: 'https://www.hydrobios.de/images/produkte/642_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=115' },
      { name: 'Oil Sampler acc. Schomaker',        image: 'https://www.hydrobios.de/images/produkte/626_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=265' },
      { name: 'Single Fire',                       image: 'https://www.hydrobios.de/images/produkte/435_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=318' },
      { name: 'Single Fire CTD',                   image: 'https://www.hydrobios.de/images/produkte/427_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=319' },
    ],
  },
  {
    id: 'hydrobios-rosette',
    kicker: 'Hydrobios · Multi Water Samplers',
    title: 'Sistemas Rosette',
    description: 'Sistemas múltiplos para rosette, perfis oceanográficos e recolha multiponto com controlo de profundidade.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=2',
    sourceLabel: 'Ver catálogo completo — Multi Water Samplers',
    products: [
      { name: 'Twin Fire',             image: 'https://www.hydrobios.de/images/produkte/636_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=320' },
      { name: 'Twin Fire CTD',         image: 'https://www.hydrobios.de/images/produkte/636_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=322' },
      { name: 'MWS SlimLine 6 x 1 l', image: 'https://www.hydrobios.de/images/produkte/18_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=327' },
      { name: 'MWS SlimLine 6 x 3.5 l',  image: 'https://www.hydrobios.de/images/produkte/18_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=328' },
      { name: 'MWS SlimLine 6 x 1.7 / 5 l', image: 'https://www.hydrobios.de/images/produkte/18_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=329' },
      { name: 'MWS 12 x 1.7 -5 l',    image: 'https://www.hydrobios.de/images/produkte/8_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=330' },
      { name: 'MWS 12 x 10 l',        image: 'https://www.hydrobios.de/images/produkte/8_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=331' },
      { name: 'MWS 24 x 1,7-10 l',    image: 'https://www.hydrobios.de/images/produkte/313_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=332' },
      { name: 'MULTI-LIMNOS',          image: 'https://www.hydrobios.de/images/produkte/540_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=11' },
      { name: 'OEM version of MWS',    image: 'https://www.hydrobios.de/images/produkte/668_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=342' },
    ],
  },
  {
    id: 'hydrobios-plankton',
    kicker: 'Hydrobios · Plankton Nets',
    title: 'Redes para plâncton',
    description: 'Redes dedicadas à recolha de plâncton, campanhas costeiras e monitorização biológica em múltiplos formatos.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=4',
    sourceLabel: 'Ver catálogo completo — Plankton Nets',
    products: [
      { name: 'MultiNet Mini',              image: 'https://www.hydrobios.de/images/produkte/84_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=321' },
      { name: 'MultiNet Midi',              image: 'https://www.hydrobios.de/images/produkte/419_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=324' },
      { name: 'MultiNet Maxi',              image: 'https://www.hydrobios.de/images/produkte/445_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=325' },
      { name: 'MultiNet Mammoth',           image: 'https://www.hydrobios.de/images/produkte/506_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=326' },
      { name: 'Apstein 50',                 image: 'https://www.hydrobios.de/images/produkte/275_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=103' },
      { name: 'Apstein 50, cone',           image: 'https://www.hydrobios.de/images/produkte/274_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=181' },
      { name: 'Apstein 50, closing',        image: 'https://www.hydrobios.de/images/produkte/273_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=182' },
      { name: 'Apstein 100',                image: 'https://www.hydrobios.de/images/produkte/81_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=184' },
      { name: 'Apstein 100, cone',          image: 'https://www.hydrobios.de/images/produkte/274_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=201' },
      { name: 'Apstein 100, closing',       image: 'https://www.hydrobios.de/images/produkte/273_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=185' },
      { name: 'Dip net acc. to Boettger',   image: 'https://www.hydrobios.de/images/produkte/531_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=12' },
      { name: 'Dip net acc. to AQEM',       image: 'https://www.hydrobios.de/images/produkte/71_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=13' },
      { name: "Dip net 'Surber Sampler'",   image: 'https://www.hydrobios.de/images/produkte/23_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=15' },
      { name: 'Set of Benthos Sieves',      image: 'https://www.hydrobios.de/images/produkte/24_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=16' },
      { name: 'Bottom Dredge',              image: 'https://www.hydrobios.de/images/produkte/22_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=14' },
      { name: 'Plankton net mesh fabric',   image: 'https://www.hydrobios.de/images/produkte/431_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=223' },
      { name: '- Customized net design -',  image: 'https://www.hydrobios.de/images/produkte/589_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=252' },
    ],
  },
  {
    id: 'hydrobios-vertical',
    kicker: 'Hydrobios · Redes Oceanográficas (vertical)',
    title: 'Redes de recolha na vertical',
    description: 'Configurações para arrastos verticais, perfis de profundidade e recolha sequencial na coluna de água.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=5',
    sourceLabel: 'Ver catálogo completo — Plankton Nets (vertical)',
    products: [
      { name: 'Indian Ocean Standard', image: 'https://www.hydrobios.de/images/produkte/27_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=19' },
      { name: 'WP2 Closing Net',       image: 'https://www.hydrobios.de/images/produkte/458_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=18' },
      { name: 'WP3 Closing Net',       image: 'https://www.hydrobios.de/images/produkte/583_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=221' },
      { name: 'Nansen Closing Net',    image: 'https://www.hydrobios.de/images/produkte/25_L.webp',   url: 'https://www.hydrobios.de/en/product?product_id=17' },
      { name: 'CalVET Net 60 cm',      image: 'https://www.hydrobios.de/images/produkte/587_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=249' },
      { name: 'CalVET Net 50 cm',      image: 'https://www.hydrobios.de/images/produkte/587_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=251' },
      { name: 'CalVET Net 45 cm',      image: 'https://www.hydrobios.de/images/produkte/587_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=270' },
      { name: 'CalVET Net 40 cm',      image: 'https://www.hydrobios.de/images/produkte/587_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=250' },
    ],
  },
  {
    id: 'hydrobios-horizontal',
    kicker: 'Hydrobios · Redes Oceanográficas (horizontal)',
    title: 'Redes de recolha na horizontal',
    description: 'Redes para arrastos horizontais, superfície, sub-superfície e campanhas oceanográficas dedicadas.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=6',
    sourceLabel: 'Ver catálogo completo — Plankton Nets (horizontal)',
    products: [
      { name: 'Neuston Net',           image: 'https://www.hydrobios.de/images/produkte/332_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=20' },
      { name: 'IKMT Net 7 m²',         image: 'https://www.hydrobios.de/images/produkte/29_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=21' },
      { name: "'Hai' Speed Collector", image: 'https://www.hydrobios.de/images/produkte/30_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=22' },
      { name: 'Bongo Net 60 cm',       image: 'https://www.hydrobios.de/images/produkte/82_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=104' },
      { name: 'Bongo Net 50 cm',       image: 'https://www.hydrobios.de/images/produkte/82_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=207' },
      { name: 'Bongo Net 40 cm',       image: 'https://www.hydrobios.de/images/produkte/82_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=210' },
      { name: 'Bongo Net 30 cm',       image: 'https://www.hydrobios.de/images/produkte/82_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=211' },
      { name: 'Bongo Net 20 cm',       image: 'https://www.hydrobios.de/images/produkte/82_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=212' },
      { name: 'Ring Trawl Net (CalCOFI)', image: 'https://www.hydrobios.de/images/produkte/37_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=345' },
    ],
  },
  {
    id: 'hydrobios-exame',
    kicker: 'Hydrobios · Câmaras de Exame',
    title: 'Câmaras de exame de plâncton',
    description: 'Câmaras e acessórios para observação, sedimentação, contagem e análise laboratorial de amostras de plâncton.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=8',
    sourceLabel: 'Ver catálogo completo — Plankton Examination',
    products: [
      { name: 'chamber 40 x 70 mm',       image: 'https://www.hydrobios.de/images/produkte/347_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=214' },
      { name: 'chamber 80 x 100 mm',      image: 'https://www.hydrobios.de/images/produkte/50_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=140' },
      { name: 'chamber 80 x 140 mm',      image: 'https://www.hydrobios.de/images/produkte/343_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=218' },
      { name: 'chamber 6 x 5.4 ml',       image: 'https://www.hydrobios.de/images/produkte/340_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=215' },
      { name: 'chamber 12 x 2.4 ml',      image: 'https://www.hydrobios.de/images/produkte/341_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=216' },
      { name: 'chamber 30 x 0.8 ml',      image: 'https://www.hydrobios.de/images/produkte/342_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=217' },
      { name: 'Kolkwitz chamber 0.5 ml',  image: 'https://www.hydrobios.de/images/produkte/334_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=37' },
      { name: 'Kolkwitz chamber 1.0 ml',  image: 'https://www.hydrobios.de/images/produkte/333_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=142' },
      { name: 'Utermöhl 10, 50, 100 ml',  image: 'https://www.hydrobios.de/images/produkte/367_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=39' },
      { name: 'Utermöhl 10 ,25, 50 ml',   image: 'https://www.hydrobios.de/images/produkte/367_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=219' },
      { name: "Folsom's divider",          image: 'https://www.hydrobios.de/images/produkte/59_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=41' },
      { name: 'Tubular chamber 5 ml',      image: 'https://www.hydrobios.de/images/produkte/221_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=38' },
      { name: 'Tubular chamber 10ml',      image: 'https://www.hydrobios.de/images/produkte/222_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=143' },
      { name: 'Tubular chamber 25 ml',     image: 'https://www.hydrobios.de/images/produkte/52_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=144' },
    ],
  },
  {
    id: 'hydrobios-microplasticos',
    kicker: 'Hydrobios · Microplásticos',
    title: 'Redes para microplásticos',
    description: 'Sistemas para recolha e monitorização de microplásticos em superfície e coluna de água.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=9',
    sourceLabel: 'Ver catálogo completo — Microplastic sampling',
    products: [
      { name: 'Microplastics Net',  image: 'https://www.hydrobios.de/images/produkte/79_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=101' },
      { name: 'Manta',             image: 'https://www.hydrobios.de/images/produkte/94_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=106' },
      { name: 'Plastic Pirates',   image: 'https://www.hydrobios.de/images/produkte/566_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=239' },
      { name: 'Neuston Catamaran', image: 'https://www.hydrobios.de/images/produkte/96_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=108' },
    ],
  },
  {
    id: 'hydrobios-sediment',
    kicker: 'Hydrobios · Sediment Traps',
    title: 'Sediment Traps',
    description: 'Sediment traps para monitorização prolongada, deposição de partículas e estudos ambientais.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=12',
    sourceLabel: 'Ver catálogo completo — Sediment Traps',
    products: [
      { name: 'Sediment Trap acc. to Saarso', image: 'https://www.hydrobios.de/images/produkte/38_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=24' },
      { name: 'Multi Sediment Trap 6',        image: 'https://www.hydrobios.de/images/produkte/174_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=25' },
      { name: 'Multi Sediment Trap 12',       image: 'https://www.hydrobios.de/images/produkte/39_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=129' },
      { name: 'Multi Sediment Trap 24',       image: 'https://www.hydrobios.de/images/produkte/385_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=130' },
    ],
  },
  {
    id: 'hydrobios-dragas',
    kicker: 'Hydrobios · Dragas de Fundo',
    title: 'Amostradores de fundo',
    description: 'Amostradores de fundo e dragas para sedimento, investigação bentónica e recolha de material superficial.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=13',
    sourceLabel: 'Ver catálogo completo — Bottom Sampler',
    products: [
      { name: 'Ekman-Birge',                      image: 'https://www.hydrobios.de/images/produkte/40_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=26' },
      { name: 'Ekman-Birge, lead',                image: 'https://www.hydrobios.de/images/produkte/389_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=133' },
      { name: 'Ekman-Birge, steel plate',         image: 'https://www.hydrobios.de/images/produkte/391_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=131' },
      { name: 'Lenz grab',                        image: 'https://www.hydrobios.de/images/produkte/180_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=27' },
      { name: 'Lenz grab, lead',                  image: 'https://www.hydrobios.de/images/produkte/393_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=136' },
      { name: 'van Veen 5.5 kg',                  image: 'https://www.hydrobios.de/images/produkte/43_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=29' },
      { name: 'van Veen 25kg',                    image: 'https://www.hydrobios.de/images/produkte/43_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=137' },
      { name: 'van Veen 25kg – EN ISO 16665',     image: 'https://www.hydrobios.de/images/produkte/643_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=273' },
      { name: 'van Veen 60kg',                    image: 'https://www.hydrobios.de/images/produkte/187_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=138' },
      { name: 'van Veen 60kg – EN ISO 16665',     image: 'https://www.hydrobios.de/images/produkte/644_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=272' },
      { name: 'Ekman-Birge, AISI 316',            image: 'https://www.hydrobios.de/images/produkte/452_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=134' },
      { name: 'Ekman-Birge, AISI 316, lead',      image: 'https://www.hydrobios.de/images/produkte/178_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=135' },
      { name: 'Ekman-Birge, AISI 316, large',     image: 'https://www.hydrobios.de/images/produkte/436_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=225' },
      { name: 'Ekman-Birge, AISI 316, large,lead',image: 'https://www.hydrobios.de/images/produkte/436_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=226' },
      { name: 'Sediment Corer',                   image: 'https://www.hydrobios.de/images/produkte/403_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=30' },
    ],
  },
  {
    id: 'hydrobios-medicao',
    kicker: 'Hydrobios · Instrumentos de Medição',
    title: 'Equipamentos de medição e apoio',
    description: 'Instrumentos complementares para medição, controlo de campanha e apoio operacional em trabalho de campo.',
    sourceUrl: 'https://www.hydrobios.de/en/products?groupid=3',
    sourceLabel: 'Ver catálogo completo — Misc Instruments',
    products: [
      { name: 'Flow Meter (mechanical)',              image: 'https://www.hydrobios.de/images/produkte/45_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=31' },
      { name: 'Flow Meter (mech.) with back run stop',image: 'https://www.hydrobios.de/images/produkte/194_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=139' },
      { name: 'Rechargeable Battery Pack 7500mAh LFP',image: 'https://www.hydrobios.de/images/produkte/613_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=254' },
      { name: 'Secchi 3m (20cm) 20cm',               image: 'https://www.hydrobios.de/images/produkte/246_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=45' },
      { name: 'Secchi 3m (20cm) 10cm',               image: 'https://www.hydrobios.de/images/produkte/246_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=126' },
      { name: 'Secchi 10m (20cm)',                   image: 'https://www.hydrobios.de/images/produkte/246_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=128' },
      { name: 'Secchi 10m (30cm)',                   image: 'https://www.hydrobios.de/images/produkte/63_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=127' },
      { name: 'Ballast Water Sampling',               image: 'https://www.hydrobios.de/images/produkte/468_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=233' },
      { name: 'Hand Winch',                          image: 'https://www.hydrobios.de/images/produkte/61_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=43' },
      { name: 'Hand Winch 2nd handle',               image: 'https://www.hydrobios.de/images/produkte/649_L.webp', url: 'https://www.hydrobios.de/en/product?product_id=240' },
      { name: 'V-Fin Depressor 5kg',                 image: 'https://www.hydrobios.de/images/produkte/60_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=123' },
      { name: 'V-Fin Depressor 70kg',                image: 'https://www.hydrobios.de/images/produkte/60_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=124' },
      { name: 'V-Fin Depressor 22kg',                image: 'https://www.hydrobios.de/images/produkte/60_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=42' },
      { name: 'V-Fin Depressor 45kg V2A',            image: 'https://www.hydrobios.de/images/produkte/60_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=125' },
      { name: 'Clinometer',                          image: 'https://www.hydrobios.de/images/produkte/62_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=44' },
      { name: 'Motor Winch for 20 kg Payloads',      image: 'https://www.hydrobios.de/images/produkte/682_L.webp',  url: 'https://www.hydrobios.de/en/product?product_id=351' },
    ],
  },
];

// ── WildCo Environmental Sampling ────────────────────────────────────────────
export const wildcoFamilies = [
  {
    id: 'wildco-fish',
    kicker: 'WildCo · Amostragem de Campo',
    title: 'Recolha de Peixes e Biometria',
    description: 'Redes de captura, armadilhas de minnow, tábuas de medição e acessórios para amostragem e biometria de peixes em campo.',
    sourceUrl: 'https://store.sciencefirst.com/wildcoenvironmentalsampling/fishcollectionandmeasuring',
    sourceLabel: 'Ver catálogo completo — Recolha de Peixes · WildCo',
    products: [
      { name: 'Rede de Captura 15" Ø × 25" Prof.',      image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7905-B15.jpeg', url: 'https://store.sciencefirst.com/insect-net-15dia-oversize-x-25dp-36-hd.html' },
      { name: 'Rede de Captura Economy 10,5" × 16"',    image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7905-B10.jpeg',  url: 'https://store.sciencefirst.com/insect-net-economy-oversize-10-5-dia-x-16-de.html' },
      { name: 'Tábua de Medição Acrílico Métrico',      image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-118-L10.jpeg',   url: 'https://store.sciencefirst.com/fish-bd-overlay-metric-and-engli-acrylic-3-16-x-9.html' },
      { name: 'Tábua de Medição Plástico',               image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-118-B30.jpeg',   url: 'https://store.sciencefirst.com/fish-measuring-board-plastic.html' },
      { name: 'Envelopes para Escamas Pk/1000',          image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-114-B25.jpeg',   url: 'https://store.sciencefirst.com/envelope-fish-scale-no-gum-pack-1000.html' },
      { name: 'Armadilha Minnow Gee 9 × 6,5"',          image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-125-G10.jpeg',   url: 'https://store.sciencefirst.com/gee-minnow-trap-9-x-6-5' },
      { name: 'Rede D-Frame 1000μm Cabo 60"',            image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7905-B15.jpeg',   url: 'https://store.sciencefirst.com/d-frame-net-1000um-w-60-handle.html' },
      { name: 'Rede de Electropesca Malha 1/8"',         image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-123-A60.jpeg',    url: 'https://store.sciencefirst.com/electro-net-small-oversize-1-8mshx3-dp-1-x48.html' },
    ],
  },
  {
    id: 'wildco-macroinvertebrates',
    kicker: 'WildCo · Bentos',
    title: 'Amostradores de Macroinvertebrados e Redes',
    description: 'Kits de amostragem de macroinvertebrados, redes Turtox-Zo, amostrador de mexilhão-zebra e acessórios de campo bentónico.',
    sourceUrl: 'https://store.sciencefirst.com/wildcoenvironmentalsampling/macroinvertebratesamplersandnets',
    sourceLabel: 'Ver catálogo completo — Macroinvertebrados · WildCo',
    products: [
      { name: 'Kit de Amostragem Macroinvertebrados 500μm', image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-425-N56.jpeg', url: 'https://store.sciencefirst.com/slack-invert-sampling-kit-500mm' },
      { name: 'Kit de Amostragem Macroinvertebrados 243μm', image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-425-N26.jpeg', url: 'https://store.sciencefirst.com/slack-invert-sampling-kit-243um' },
      { name: 'Rede Veliger 500/63μm',                      image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-33-E28.jpeg',   url: 'https://store.sciencefirst.com/net-veliger-500-63-mm-nitex1-4-nr' },
      { name: 'Amostrador de Mexilhão-Zebra',               image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-150-D10.jpeg',  url: 'https://store.sciencefirst.com/zebra-mussel-sampler-each' },
      { name: 'Rede Turtox-Zo 600μm com Cabos',             image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-427-B30.jpeg',  url: 'https://store.sciencefirst.com/turtox-zo-net-600mm-with-handles-and-adapter' },
      { name: 'Rede Turtox-Zo 500μm',                       image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-427-A39.jpeg',  url: 'https://store.sciencefirst.com/turtox-zo-500mm-replacement-net-no-adapter' },
      { name: 'Grampos de Rede Saco/100',                    image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-425-L12.jpeg',  url: 'https://store.sciencefirst.com/net-clips-bag-of-100' },
    ],
  },
  {
    id: 'wildco-plankton',
    kicker: 'WildCo · Plâncton',
    title: 'Amostradores de Plâncton e Redes',
    description: 'Redes de plâncton com anel de inox, armadilhas Schindler-Patalas e acessórios para amostragem de fitoplâncton e zooplâncton.',
    sourceUrl: 'https://store.sciencefirst.com/wildcoenvironmentalsampling/planktonsamplersandnets',
    sourceLabel: 'Ver catálogo completo — Plâncton · WildCo',
    products: [
      { name: 'Armadilha de Plâncton Schindler-Patalas 12L', image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-34-A20.jpeg', url: 'https://store.sciencefirst.com/schindler-patalas-12l-plank-trap' },
      { name: 'Armadilha de Plâncton Schindler-Patalas 30L', image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-34-A10.jpeg', url: 'https://store.sciencefirst.com/schindler-patalas-30l-plank-trap' },
      { name: 'Rede Inox Anel e Brida 500mm 20"',             image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7-E50.jpeg',   url: 'https://store.sciencefirst.com/net-ss-ringandbridle-500mm-20-nr' },
      { name: 'Rede Inox Anel e Brida 750mm 30"',             image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7-F75.jpeg',   url: 'https://store.sciencefirst.com/net-ss-ring-bridle-750mm-30-oversize-nr' },
      { name: 'Rede Inox Anel e Brida 1000mm 40"',            image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7-G85.jpeg',   url: 'https://store.sciencefirst.com/net-ss-ringandbridle-1000mm-40-os-nr' },
      { name: 'Rede de Substituição 63μm p/ Armadilha S-P',  image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-34-B28.jpeg',  url: 'https://store.sciencefirst.com/net-replacement-f-s-p-trap-63-mm' },
      { name: 'Rede de Substituição 80μm p/ Armadilha S-P',  image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-34-B30.jpeg',  url: 'https://store.sciencefirst.com/net-replacement-f-s-p-trap-80-mm' },
      { name: 'Anel e Brida #27 750mm 30"',                   image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-7-H75.jpeg',   url: 'https://store.sciencefirst.com/rings-bridle-27-750mm-30-nr' },
    ],
  },
  {
    id: 'wildco-sieves',
    kicker: 'WildCo · Crivos e Peneiras',
    title: 'Crivos e Peneiras de Campo',
    description: 'Peneiras de campo Fieldmaster®, crivos mini de malha fina e acessórios para triagem de sedimentos e macroinvertebrados.',
    sourceUrl: 'https://store.sciencefirst.com/wildcoenvironmentalsampling/seivesandscreens',
    sourceLabel: 'Ver catálogo completo — Crivos e Peneiras · WildCo',
    products: [
      { name: 'Crivos Fieldmaster®',          image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/2/32910.jpeg',       url: 'https://store.sciencefirst.com/screen-sieves' },
      { name: 'Peneirador 4 Mesh 13×5"',      image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-190-G10.jpeg',  url: 'https://store.sciencefirst.com/sifter-screen-4-mesh-13x5-fits-on-washbucket' },
      { name: 'Crivo Mini 30 Mesh 600μm',     image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-184-A16.jpeg',  url: 'https://store.sciencefirst.com/sieve-mini-30mesh-600mm' },
      { name: 'Crivo Mini 35 Mesh 500μm',     image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-184-A15.jpeg',  url: 'https://store.sciencefirst.com/sieve-mini-35mesh-500mm' },
      { name: 'Crivo Mini 60 Mesh 243μm',     image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-184-A12.jpeg',  url: 'https://store.sciencefirst.com/sieve-mini-60mesh-243mu' },
      { name: 'Crivo Mini 128 Mesh 118μm',    image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-184-A11.jpeg',  url: 'https://store.sciencefirst.com/sieve-mini-128mesh-118mm' },
      { name: 'Crivo Mini 270 Mesh 53μm',     image: 'https://store.sciencefirst.com/media/catalog/product/cache/21477a7fb10b788f9f69f91841a901fc/3/-/3-184-A10.jpeg',  url: 'https://store.sciencefirst.com/sieve-mini-270mesh-53mm' },
    ],
  },
];
