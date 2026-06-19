// Dados extras das páginas de lâmpadas AA e D2 — extraídos do site antigo
export default {
  "allAA": {
    "headers": [
      "Fabricante",
      "Formato recomendado",
      "Famílias disponíveis",
      "Observações"
    ],
    "rows": [
      [
        "Agilent / HP",
        "1.5\" uncoded",
        "Mono-elementares, multi-elementares, Superlamps",
        "Compatível com socket de dois pinos em configuração standard."
      ],
      [
        "Thermo Scientific",
        "1.5\" uncoded",
        "Mono-elementares, multi-elementares",
        "Uso direto em rotina AA com correção Smith-Hieftje."
      ],
      [
        "Hitachi",
        "1.5\" uncoded",
        "Mono-elementares, multi-elementares",
        "Verificar seleção por série do equipamento."
      ],
      [
        "PerkinElmer",
        "2.0\" coded",
        "Mono-elementares, multi-elementares, Superlamps",
        "Cátodo ampliado e maior volume de gás para longa vida útil."
      ],
      [
        "Shimadzu",
        "1.5\" uncoded",
        "Mono-elementares, multi-elementares",
        "Aplicação orientada a sistemas AA de bancada."
      ],
      [
        "GBC",
        "1.5\" uncoded",
        "Mono-elementares, multi-elementares",
        "Validação recomendada por configuração ótica do sistema."
      ]
    ]
  },
  "d2": {
    "headers": [
      "Fabricante",
      "Tipo / Modelo",
      "Referência de lâmpada",
      "Observações"
    ],
    "rows": [
      [
        "Agilent / HP",
        "Séries AA e UV-Vis de bancada",
        "P700 / P701",
        "Configurações com foco em estabilidade UV de rotina."
      ],
      [
        "Altex",
        "Sistemas UV clássicos",
        "P702",
        "Aplicação em reposição técnica de manutenção."
      ],
      [
        "Hitachi",
        "Séries Z / ZA",
        "P703 / P704",
        "Confirmar versão por geração do equipamento."
      ],
      [
        "Beckman",
        "Linhas DU e plataformas legacy",
        "P705",
        "Solução para reposição em sistemas instalados."
      ],
      [
        "BioRad",
        "Detetores UV laboratoriais",
        "P707",
        "Apoio a correção de fundo e controlo de baseline."
      ],
      [
        "Cecil",
        "Famílias CE e Aquarius",
        "P712",
        "Uso em rotina analítica contínua."
      ],
      [
        "Dionex",
        "UV detector families",
        "P713A",
        "Versões com baixo ruído e boa estabilidade temporal."
      ],
      [
        "GBC",
        "Avanta / SensAA",
        "P715 / P717",
        "Compatibilidade dependente da configuração ótica."
      ],
      [
        "Jasco",
        "Sistemas UV-Vis e AA",
        "P718",
        "Recomendado validar potência nominal por método."
      ],
      [
        "Kontron",
        "Família Uvikon",
        "P721",
        "Adequado para estratégias de retrofit."
      ],
      [
        "Merck / Hitachi",
        "Linhas de deteção UV específicas",
        "P726",
        "Confirmar interface e suporte físico do conjunto."
      ],
      [
        "PerkinElmer",
        "AAnalyst / PinAAcle",
        "P735 / P748",
        "Compatibilidade orientada por arquitetura do módulo D2."
      ]
    ]
  },
  "allAA_highlights": [
    "Integração direta em sistemas de absorção atómica.",
    "Formatos 1.5\" e 2.0\" conforme arquitetura instrumental.",
    "Estabilidade de intensidade para métodos quantitativos.",
    "Suporte para rotina, validação e controlo de qualidade."
  ],
  "allAA_configs": [
    {
      "title": "1.5\" para todos os fabricantes",
      "description": "Versões uncoded para cobertura transversal de plataformas AA."
    },
    {
      "title": "1.5\" multi-elementares",
      "description": "Configurações para métodos multianalito e maior eficiência de rotina."
    },
    {
      "title": "2.0\" para PerkinElmer",
      "description": "Modelos codificados com maior volume de gás e maior durabilidade."
    },
    {
      "title": "Superlamps",
      "description": "Soluções de intensidade reforçada para métodos de maior exigência."
    },
    {
      "title": "Deuterium D2",
      "description": "Lâmpadas de descarga UV para correção de fundo em espectrometria."
    },
    {
      "title": "Complementares",
      "description": "Lâmpadas de calibração astronómica, see-through e fontes externas sob consulta."
    }
  ],
  "d2_applications": [],
  "d2_params_list": []
};
