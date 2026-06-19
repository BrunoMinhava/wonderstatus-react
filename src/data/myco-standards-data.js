export default [
  {
    key: "native",
    id: "group-nativas",
    label: "Native Standards",
    description:
      "Standards nativos para calibração e controlo de método.",
    families: [
      {
        family: "Aflatoxins",
        solvent: "Acetonitrilo",
        summary: "Standards individuais e misturas para calibração.",
        entries: [
          {
            name: "Aflatoxin B1",
            concentration: "2 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000194 / FIA000195 / FIA000196"
          },
          {
            name: "Aflatoxin B2",
            concentration: "0.5 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000197 / FIA000198 / FIA000199"
          },
          {
            name: "Aflatoxin G1",
            concentration: "2 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000200 / FIA000201 / FIA000202"
          },
          {
            name: "Aflatoxin G2",
            concentration: "0.5 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000203 / FIA000204 / FIA000205"
          },
          {
            name: "Aflatoxin M1",
            concentration: "0.5 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000206 / FIA000207 / FIA000208"
          },
          {
            name: "Aflatoxin M2",
            concentration: "0.5 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000209 / FIA000210 / FIA000211"
          },
          {
            name: "Aflatoxins B1, B2, G1, G2 mixture",
            concentration: "250 ng/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000212 / FIA000213 / FIA000214"
          },
          {
            name: "Aflatoxins B1, B2, G1, G2 mixture",
            concentration: "B1,G1: 2 µg/mL | B2,G2: 0.5 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000215 / FIA000216 / FIA000217"
          },
          {
            name: "Aflatoxins B1, B2, G1, G2 mixture",
            concentration: "1 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000376 / FIA000377 / FIA000378"
          },
          {
            name: "Aflatoxins B1, B2, G1, G2 mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000218 / FIA000219 / FIA000220"
          },
          {
            name: "Aflatoxins B1, B2, G1, G2 mixture",
            concentration: "25 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000221 / FIA000222 / FIA000223"
          }
        ]
      },
      {
        family: "15-Acetoxyscirpenol (MAS)",
        solvent: "Acetonitrilo",
        summary: "Standard nativo para monitorização específica de tricotecenos.",
        entries: [
          {
            name: "15-Acetoxyscirpenol (MAS)",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000281 / FIA000282 / FIA000283"
          }
        ]
      },
      {
        family: "Alternaria Toxins",
        solvent: "Metanol",
        summary: "Compostos individuais e mistura multicomponente.",
        entries: [
          {
            name: "Alternariol (AOH)",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000227 / FIA000228 / FIA000229"
          },
          {
            name: "Alternariol Monomethyl Ether (AME)",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000230 / FIA000231 / FIA000232"
          },
          {
            name: "Altenuene (ALT)",
            concentration: "10 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000395 / FIA000396 / FIA000397"
          },
          {
            name: "Tenuazonic Acid (TEA)",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000398 / FIA000399 / FIA000400"
          },
          {
            name: "Tentoxin (TEN)",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000401 / FIA000402 / FIA000403"
          },
          {
            name: "Alternariol, AME, Altenuene, Tentoxin mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000404 / FIA000405 / FIA000406"
          }
        ]
      },
      {
        family: "Deoxynivalenol and derivatives",
        solvent: "Acetonitrilo",
        summary: "DON e derivados para calibração individual em métodos direcionados.",
        entries: [
          {
            name: "Deoxynivalenol (DON)",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000239 / FIA000240 / FIA000241"
          },
          {
            name: "3-acetyl-Deoxynivalenol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000191 / FIA000192 / FIA000193"
          },
          {
            name: "15-acetyl-Deoxynivalenol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000188 / FIA000189 / FIA000190"
          }
        ]
      },
      {
        family: "Diacetoxyscirpenol (DAS)",
        solvent: "Acetonitrilo",
        summary: "Padrão nativo para aplicação em painéis tricotecénicos.",
        entries: [
          {
            name: "Diacetoxyscirpenol (DAS)",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000236 / FIA000237 / FIA000238"
          }
        ]
      },
      {
        family: "Enniatins - Beauvericin",
        solvent: "Metanol",
        summary: "Soluções individuais e mistura estável para coocorrência em matrizes complexas.",
        entries: [
          {
            name: "Beauvericin",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000233 / FIA000234 / FIA000235"
          },
          {
            name: "Enniatin A",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000245 / FIA000246 / FIA000247"
          },
          {
            name: "Enniatin A1",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000248 / FIA000249 / FIA000250"
          },
          {
            name: "Enniatin B",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000251 / FIA000252 / FIA000253"
          },
          {
            name: "Enniatin B1",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000254 / FIA000255 / FIA000256"
          },
          {
            name: "Enniatins A, A1, B, B1, Beauvericin mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000257 / FIA000258 / FIA000259"
          }
        ]
      },
      {
        family: "Fumonisins",
        solvent: "Acetonitrilo / Água (50/50)",
        summary: "Soluções para FB1, FB2, FB3 e misturas multicomponente.",
        entries: [
          {
            name: "Fumonisin B1",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000260 / FIA000261 / FIA000262"
          },
          {
            name: "Fumonisin B2",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000263 / FIA000264 / FIA000265"
          },
          {
            name: "Fumonisin B3",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000266 / FIA000267 / FIA000268"
          },
          {
            name: "Fumonisins B1, B2 mixture",
            concentration: "50 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000269 / FIA000270 / FIA000271"
          },
          {
            name: "Fumonisins B1, B2, B3 mixture",
            concentration: "50 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000272 / FIA000273 / FIA000274"
          }
        ]
      },
      {
        family: "Fusarenon-X",
        solvent: "Acetonitrilo",
        summary: "Standard nativo para integração em métodos específicos de tricotecenos.",
        entries: [
          {
            name: "Fusarenon-X",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000275 / FIA000276 / FIA000277"
          }
        ]
      },
      {
        family: "HT2 Toxin",
        solvent: "Acetonitrilo",
        summary: "Solução nativa para quantificação direta de HT2.",
        entries: [
          {
            name: "HT2 Toxin",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000278 / FIA000279 / FIA000280"
          }
        ]
      },
      {
        family: "Neosolaniol",
        solvent: "Acetonitrilo",
        summary: "Padrão nativo orientado a métodos de cobertura ampliada.",
        entries: [
          {
            name: "Neosolaniol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000284 / FIA000285 / FIA000286"
          }
        ]
      },
      {
        family: "Nivalenol",
        solvent: "Acetonitrilo",
        summary: "Composto nativo para extensão de painel analítico.",
        entries: [
          {
            name: "Nivalenol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000287 / FIA000288 / FIA000289"
          }
        ]
      },
      {
        family: "Ochratoxins",
        solvent: "Metanol",
        summary: "Padrões nativos para Ochratoxin A e B em rotinas de controlo.",
        entries: [
          {
            name: "Ochratoxin A",
            concentration: "10 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000290 / FIA000291 / FIA000292"
          },
          {
            name: "Ochratoxin B",
            concentration: "10 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000293 / FIA000294 / FIA000295"
          }
        ]
      },
      {
        family: "Patulin",
        solvent: "Acetonitrilo",
        summary: "Solução nativa para calibração de Patulin.",
        entries: [
          {
            name: "Patulin",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000296 / FIA000297 / FIA000298"
          }
        ]
      },
      {
        family: "Sterigmatocystin",
        solvent: "Acetonitrilo",
        summary: "Padrão nativo para monitorização direcionada de Sterigmatocystin.",
        entries: [
          {
            name: "Sterigmatocystin",
            concentration: "50 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000373 / FIA000374 / FIA000375"
          }
        ]
      },
      {
        family: "T2 Tetraol",
        solvent: "Acetonitrilo",
        summary: "Solução nativa para monitorização de T2 Tetraol.",
        entries: [
          {
            name: "T2 Tetraol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000305 / FIA000306 / FIA000307"
          }
        ]
      },
      {
        family: "T2 Toxin",
        solvent: "Acetonitrilo",
        summary: "Padrão nativo para fluxos de quantificação de tricotecenos tipo A.",
        entries: [
          {
            name: "T2 Toxin",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000299 / FIA000300 / FIA000301"
          }
        ]
      },
      {
        family: "T2 Triol",
        solvent: "Acetonitrilo",
        summary: "Standard nativo para complementar cobertura de tricotecenos.",
        entries: [
          {
            name: "T2 Triol",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000308 / FIA000309 / FIA000310"
          }
        ]
      },
      {
        family: "Zearalenone",
        solvent: "Acetonitrilo",
        summary: "Solução nativa para calibração em métodos de rotina e validação.",
        entries: [
          {
            name: "Zearalenone",
            concentration: "100 µg/mL",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000311 / FIA000312 / FIA000313"
          }
        ]
      }
    ]
  },
  {
    key: "c13",
    id: "group-c13",
    label: "C13 Fully Labeled Standards",
    description:
      "Padrões isotópicos para correção de método e quantificação.",
    families: [
      {
        family: "Aflatoxins",
        solvent: "Acetonitrilo",
        summary: "Compostos individuais e mistura C13 da família.",
        entries: [
          {
            name: "U-[13C17] - Aflatoxin B1",
            concentration: "0.5 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000104 / FIA000105 / FIA000106 / FIA000107"
          },
          {
            name: "U-[13C17] - Aflatoxin B2",
            concentration: "0.5 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000108 / FIA000109 / FIA000110 / FIA000111"
          },
          {
            name: "U-[13C17] - Aflatoxin G1",
            concentration: "0.5 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000112 / FIA000113 / FIA000114 / FIA000115"
          },
          {
            name: "U-[13C17] - Aflatoxin G2",
            concentration: "0.5 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000116 / FIA000117 / FIA000118 / FIA000119"
          },
          {
            name: "U-[13C17] - Aflatoxin M1",
            concentration: "0.5 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000120 / FIA000121 / FIA000122 / FIA000123"
          },
          {
            name: "U-[13C17] - Aflatoxin B1, B2, G1, G2 mixture",
            concentration: "0.5 µg/mL de cada",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000124 / FIA000125 / FIA000126 / FIA000127"
          }
        ]
      },
      {
        family: "Alternaria Toxins",
        solvent: "Metanol",
        summary: "Padrões C13 direcionados para compostos críticos de Alternaria.",
        entries: [
          {
            name: "U-[13C15] - Altenuene (ALT)",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000407 / FIA000408 / FIA000409 / FIA000410"
          },
          {
            name: "U-[13C10] - Tenuazonic Acid (TEA)",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000411 / FIA000412 / FIA000413 / FIA000414"
          }
        ]
      },
      {
        family: "Deoxynivalenol and derivatives",
        solvent: "Acetonitrilo",
        summary: "Soluções isotópicas para DON e derivados acetilados.",
        entries: [
          {
            name: "U-[13C15] - Deoxynivalenol",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000128 / FIA000129 / FIA000130 / FIA000131"
          },
          {
            name: "U-[13C17] - 3-acetyl-Deoxynivalenol",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000100 / FIA000101 / FIA000102 / FIA000103"
          }
        ]
      },
      {
        family: "Fumonisins",
        solvent: "Acetonitrilo / Água (50/50)",
        summary: "Soluções C13 para FB1, FB2, FB3 e misturas de FB1/FB2.",
        entries: [
          {
            name: "U-[13C34] - Fumonisin B1",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000132 / FIA000133 / FIA000134 / FIA000135"
          },
          {
            name: "U-[13C34] - Fumonisin B2",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000136 / FIA000137 / FIA000138 / FIA000139"
          },
          {
            name: "U-[13C34] - Fumonisin B3",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000140 / FIA000141 / FIA000142 / FIA000143"
          },
          {
            name: "U-[13C34] - Fumonisins B1, B2 mixture",
            concentration: "5 µg/mL de cada",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000144 / FIA000145 / FIA000146 / FIA000147"
          },
          {
            name: "U-[13C34] - Fumonisins B1, B2 mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000148 / FIA000149 / FIA000150 / FIA000151"
          }
        ]
      },
      {
        family: "HT2 Toxin",
        solvent: "Acetonitrilo",
        summary: "Padrão isotópico para aplicação direta em quantificação de HT2.",
        entries: [
          {
            name: "U-[13C22] - HT2 Toxin",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000152 / FIA000153 / FIA000154 / FIA000155"
          }
        ]
      },
      {
        family: "Neosolaniol",
        solvent: "Acetonitrilo",
        summary: "Standard C13 para fluxos analíticos de cobertura expandida.",
        entries: [
          {
            name: "U-[13C19] - Neosolaniol",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000156 / FIA000157 / FIA000158 / FIA000159"
          }
        ]
      },
      {
        family: "Ochratoxins",
        solvent: "Metanol",
        summary: "Soluções C13 para Ocratoxinas A e B.",
        entries: [
          {
            name: "U-[13C20] - Ochratoxin A",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000160 / FIA000161 / FIA000162 / FIA000163"
          },
          {
            name: "U-[13C20] - Ochratoxin B",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000164 / FIA000165 / FIA000166 / FIA000167"
          }
        ]
      },
      {
        family: "Patulin",
        solvent: "Acetonitrilo",
        summary: "Padrão [13C3] para correção isotópica de Patulin.",
        entries: [
          {
            name: "[13C3] - Patulin",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000168 / FIA000169 / FIA000170 / FIA000171"
          }
        ]
      },
      {
        family: "Sterigmatocystin",
        solvent: "Acetonitrilo",
        summary: "Solução isotópica para monitorização dirigida de Sterigmatocystin.",
        entries: [
          {
            name: "U-[13C18] - Sterigmatocystin",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000172 / FIA000173 / FIA000174 / FIA000175"
          }
        ]
      },
      {
        family: "T2 Toxin",
        solvent: "Acetonitrilo",
        summary: "Padrão C13 para aplicações quantitativas de T2 toxin.",
        entries: [
          {
            name: "U-[13C24] - T2 Toxin",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000176 / FIA000177 / FIA000178 / FIA000179"
          }
        ]
      },
      {
        family: "T2 Triol",
        solvent: "Acetonitrilo",
        summary: "Solução isotópica para T2 Triol em métodos de cobertura ampliada.",
        entries: [
          {
            name: "U-[13C20] - T2 Triol",
            concentration: "10 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000180 / FIA000181 / FIA000182 / FIA000183"
          }
        ]
      },
      {
        family: "Zearalenone",
        solvent: "Acetonitrilo",
        summary: "Padrão C13 para quantificação robusta de Zearalenone.",
        entries: [
          {
            name: "U-[13C18] - Zearalenone",
            concentration: "25 µg/mL",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000184 / FIA000185 / FIA000186 / FIA000187"
          }
        ]
      }
    ]
  },
  {
    key: "mixtures",
    id: "group-misturas",
    label: "Multi-components Mixtures",
    description:
      "Misturas multicomponente para análise simultânea de micotoxinas.",
    families: [
      {
        family: "Multi-components Mixtures",
        solvent: "Acetonitrilo e/ou Metanol",
        summary:
          "Misturas para reduzir preparação e ganhar eficiência analítica.",
        entries: [
          {
            name: "U-[13C] - Deoxynivalenol, T2, HT2, Zearalenone mixture",
            concentration: "Composição multiconcentração (ver notas)",
            conditioning: "0.5 mL / 1.2 mL / 5 mL / 10 mL",
            references: "FIA000314 / FIA000315 / FIA000316 / FIA000317",
            notes:
              "Composição: U-13C-DON 10 µg/mL; U-13C-T2 1 µg/mL; U-13C-HT2 10 µg/mL; U-13C-ZEA 3 µg/mL. Solvente: acetonitrilo."
          },
          {
            name: "Aflatoxins B1, B2, G1, G2, Ochratoxin A mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000224 / FIA000225 / FIA000226",
            notes: "Solvente: acetonitrilo."
          },
          {
            name: "Enniatins A, A1, B, B1, Beauvericin mixture",
            concentration: "10 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000257 / FIA000258 / FIA000259",
            notes: "Solvente: metanol."
          },
          {
            name: "T2, HT2 Toxins mixture",
            concentration: "100 µg/mL de cada",
            conditioning: "1 mL / 5 mL / 10 mL",
            references: "FIA000302 / FIA000303 / FIA000304",
            notes: "Solvente: acetonitrilo."
          }
        ]
      }
    ]
  }
];

