export default {
  brands: {
    "thermo-scientific": {
      name: "Thermo Scientific",
      accent: "#1d74d0",
      page: "./thermo-scientific.html",
      logoPath: "/assets/logos/thermo-scientific.png",
      overviewImagePath: "/assets/fotos/thermo-scientific.jpeg",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "partNumber", label: "Part Number" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        { reference: "10158659", partNumber: "9423 393 95091", description: "Standard Tube Plain, coated", qty: "10" },
        { reference: "10158658", partNumber: "9423 393 95071", description: "Partridge(d) Tube, coated", qty: "10" },
        { reference: "10154367", partNumber: "9423 393 95041", description: "Partridge(d) Tube, coated (ELC)", qty: "10" },
        { reference: "10158673", partNumber: "9423 393 95161", description: "Electrical Contactset (Zeeman)", qty: "2" },
        { reference: "10158674", partNumber: "9423 393 95011", description: "Electrical Contactset (Standard)", qty: "2" },
        { reference: "10468317", partNumber: "9423 490 20101", description: "Omega Tube®, coated", qty: "10" }
      ]
    },
    perkinelmer: {
      name: "PerkinElmer",
      accent: "#e65b2f",
      page: "./equivalentes-perkinelmer.html",
      logoPath: "/assets/logos/perkinelmer.png",
      overviewImagePath: "/assets/fotos/perkinelmer.png",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "perkinPartNo", label: "PerkinElmer Part-No." },
        { key: "referencePartNo", label: "Reference PE-Part-No." },
        { key: "pePack", label: "PE-pack" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        {
          reference: "10154358",
          perkinPartNo: "B0135653",
          referencePartNo: "B0105197 / B3000342 / B0091504",
          pePack: "5 / 20 / 50",
          description: "HGA Standard Tube, coated",
          qty: "10"
        },
        {
          reference: "10154380",
          perkinPartNo: "-",
          referencePartNo: "B0137113 / B3001253 / B0070699",
          pePack: "5 / 20 / 50",
          description: "HGA Standard Tube, uncoated",
          qty: "10"
        },
        {
          reference: "10154359",
          perkinPartNo: "B0121092",
          referencePartNo: "B0137111 / B3001254 / B0109322",
          pePack: "5 / 20 / 50",
          description: "HGA L’vov Platformtube, coated",
          qty: "10"
        },
        {
          reference: "10154382",
          perkinPartNo: "B0121093",
          referencePartNo: "B0109321",
          pePack: "50",
          description: "HGA L’vov Platformtube, uncoated",
          qty: "10"
        },
        {
          reference: "10154360",
          perkinPartNo: "B0121091",
          referencePartNo: "B0137112 / B3001256 / B0109324",
          pePack: "5 / 20 / 50",
          description: "L’vov Platform, pyrolytic graphite",
          qty: "10"
        },
        {
          reference: "10154366",
          perkinPartNo: "B0112660",
          referencePartNo: "B3000343",
          pePack: "20",
          description: "HGA L’vov Platformtube with preinserted Platform",
          qty: "10"
        },
        {
          reference: "10040156",
          perkinPartNo: "B0128490",
          referencePartNo: "B0180363",
          pePack: "5",
          description: "Electrical HGA Contactset (with sensorhole)",
          qty: "1"
        },
        {
          reference: "10040153",
          perkinPartNo: "B0128495",
          referencePartNo: "B3130086",
          pePack: "5",
          description: "Electrical HGA Contactset (without sensorhole)",
          qty: "1"
        },
        {
          reference: "10040147",
          perkinPartNo: "B0116823",
          referencePartNo: "B0180361",
          pePack: "5",
          description: "Electrical Contactset (Zeeman)",
          qty: "1"
        },
        {
          reference: "10170467",
          perkinPartNo: "B0162706",
          referencePartNo: "-",
          pePack: "-",
          description: "Tube for Centralprobe, coated",
          qty: "10"
        },
        {
          reference: "10165425",
          perkinPartNo: "B0162704",
          referencePartNo: "B0144621",
          pePack: "5",
          description: "Centralprobe",
          qty: "10"
        }
      ]
    },
    agilent: {
      name: "Agilent",
      accent: "#d13e4f",
      page: "./equivalentes-agilent.html",
      logoPath: "/assets/logos/agilent.png",
      overviewImagePath: "/assets/fotos/agilent.png",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "partNumber", label: "Part Number" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        { reference: "10154328", partNumber: "63-100011-00", description: "Plateau Tube, coated", qty: "10" },
        { reference: "10154331", partNumber: "63-100014-00", description: "Plateau Tube, uncoated", qty: "10" },
        { reference: "10154357", partNumber: "63-100013-00", description: "Platform, pyrolytic graphite (for use in Plateau Tubes)", qty: "10" },
        { reference: "10154329", partNumber: "63-100012-00", description: "Partition Tube, coated", qty: "10" },
        { reference: "10154356", partNumber: "63-100015-00", description: "Partition Tube, uncoated", qty: "10" },
        { reference: "10160980", partNumber: "63-100012-HP", description: "Partition Tube, coated (HP)", qty: "10" },
        { reference: "10159128", partNumber: "63-100012-EL", description: "Partition Tube, coated (ELC)", qty: "10" },
        { reference: "10289537", partNumber: "63-100037-00", description: "Omega Tube®, coated", qty: "10" },
        { reference: "10157015", partNumber: "63-100018-00", description: "Shroud", qty: "1" },
        { reference: "10159059", partNumber: "63-100016-00", description: "Electrical Contactset", qty: "2" },
        { reference: "10157017", partNumber: "63-100019-00", description: "Shroud (Zeeman)", qty: "1" },
        { reference: "10159060", partNumber: "63-100017-00", description: "Electrical Contactset (Zeeman)", qty: "2" },
        { reference: "10546871", partNumber: "63-100035-00", description: "Electrical Contactset (Zeeman)", qty: "2" },
        { reference: "10546873", partNumber: "63-100036-00", description: "Shroud, coated (Zeeman)", qty: "1" },
        { reference: "10546875", partNumber: "63-100034-00", description: "Electrical Contactset GTA120", qty: "2" },
        { reference: "10546876", partNumber: "63-100031-00", description: "Shroud GTA120", qty: "1" }
      ]
    },
    hitachi: {
      name: "Hitachi",
      accent: "#2b8d84",
      page: "./equivalentes-hitachi.html",
      logoPath: "/assets/logos/hitachi.png",
      overviewImagePath: "/assets/fotos/hitachi.png",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "partNumber", label: "Part Number" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        { reference: "10154423", partNumber: "180-7444", description: "Standard Tube, coated", qty: "10" },
        { reference: "10158447", partNumber: "180-7400", description: "Standard Tube, uncoated", qty: "10" },
        { reference: "10158482", partNumber: "180-7404", description: "Platform, pyrolytic graphite", qty: "10" },
        { reference: "10154369", partNumber: "190-6003", description: "Tube for extended injection volume, coated", qty: "10" },
        { reference: "10158826", partNumber: "180-7401", description: "Electrical Contactset", qty: "2" },
        { reference: "10197175", partNumber: "172-8805", description: "Electrical Contactset (Zeeman)", qty: "2" },
        { reference: "10207731", partNumber: "172-8805", description: "Electrical Contactset (Zeeman)", qty: "4" },
        { reference: "10508351", partNumber: "-", description: "Omega Tube®, coated", qty: "10" }
      ]
    },
    shimadzu: {
      name: "Shimadzu",
      accent: "#0a67c6",
      page: "./equivalentes-shimadzu.html",
      logoPath: "/assets/logos/shimadzu.png",
      overviewImagePath: "/assets/fotos/shimadzu.png",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "partNumber", label: "Part Number" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        { reference: "10163687", partNumber: "200-54525", description: "Standardtube, coated (60° cone)", qty: "10" },
        { reference: "10163690", partNumber: "200-54520", description: "Standardtube, uncoated (60° cone)", qty: "10" },
        { reference: "10154376", partNumber: "200-54525 (old)", description: "Standardtube with 5 holes, coated (60° cone)", qty: "10" },
        { reference: "10159065", partNumber: "200-54520 (old)", description: "Standardtube with 5 holes, uncoated (60° cone)", qty: "10" },
        { reference: "10159024", partNumber: "206-82541", description: "Tube with built-in platform, coated (60° cone)", qty: "10" },
        { reference: "10163697", partNumber: "206-69984-02", description: "Tube for extended injection volume, coated (60° cone)", qty: "10" },
        { reference: "10163691", partNumber: "206-80153-03", description: "Tube for extended injection volume, uncoated (60° cone)", qty: "10" },
        { reference: "10193272", partNumber: "206-80165", description: "Electrical Contact (left) (60° cone)", qty: "1" },
        { reference: "10193273", partNumber: "206-80164", description: "Electrical Contact (right) (60° cone)", qty: "1" },
        { reference: "10192888", partNumber: "206-50588", description: "Standardtube, coated (90° cone)", qty: "10" },
        { reference: "10192894", partNumber: "206-50587", description: "Standardtube, uncoated (90° cone)", qty: "10" },
        { reference: "10193274", partNumber: "206-50887 (206-5887-02RI)", description: "Tube with built-in platform, coated (90° cone)", qty: "10" },
        { reference: "10192897", partNumber: "206-50602", description: "Electrical Contact (left) (90° cone)", qty: "1" },
        { reference: "10192899", partNumber: "206-50603", description: "Electrical Contact (right) (90° cone)", qty: "1" },
        { reference: "10350274", partNumber: "980-05340", description: "Omega Tube®, coated", qty: "10" }
      ]
    },
    gbc: {
      name: "GBC",
      accent: "#6f66b6",
      page: "./equivalentes-gbc.html",
      logoPath: "/assets/logos/gbc.png",
      overviewImagePath: "/assets/fotos/gbc.png",
      columns: [
        { key: "reference", label: "Referência" },
        { key: "partNumber", label: "Part Number" },
        { key: "description", label: "Descrição" },
        { key: "qty", label: "Qty/pack" }
      ],
      entries: [
        { reference: "10318783", partNumber: "99-0059-00", description: "Standard Tube, coated", qty: "10" },
        { reference: "10343138", partNumber: "-", description: "Standard Tube, coated (ELC)", qty: "10" },
        { reference: "10341941", partNumber: "99-0059-01", description: "Standard Tube, uncoated", qty: "10" },
        { reference: "10154365", partNumber: "99-0060-00", description: "Platform, pyrolytic graphite", qty: "10" },
        { reference: "10323832", partNumber: "99-0342-00", description: "Omega Tube®, coated", qty: "10" },
        { reference: "10154364", partNumber: "99-0061-00", description: "Electrical Contactset", qty: "2" },
        { reference: "10035761", partNumber: "45-0004-00", description: "Shroud", qty: "1" }
      ]
    }
  }
};
