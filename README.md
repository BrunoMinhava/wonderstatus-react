# Wonderstatus — Site React

Site Wonderstatus reconstruído em React moderno, com Vite, React Router,
Tailwind CSS e Framer Motion. Mantém o fullscreen inicial com slideshow e
todo o conteúdo essencial do site original (produtos, marcas, contactos,
links externos e fotos).

## Requisitos

- Node.js 18+ (recomendado LTS 20+)
- npm 9+

## Instalação

```bash
npm install
```

## Correr em desenvolvimento

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

Os ficheiros finais ficam em `dist/`.

## Estrutura

```
wonderstatus/
├── public/
│   └── assets/              # Imagens, logos, slides (originais do site)
│       ├── fotos/
│       ├── logos/
│       └── slide1.JPG ... slide6.JPG
├── src/
│   ├── components/
│   │   ├── HeroSlideshow.jsx        # Slideshow fullscreen preservado
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageHeader.jsx           # Hero parallax para páginas internas
│   │   ├── PageTransition.jsx
│   │   ├── ParallaxSection.jsx
│   │   ├── ScrollReveal.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SectionHead.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── BrandGrid.jsx
│   │   ├── TechnicalTabs.jsx
│   │   └── ContactCTA.jsx
│   ├── data/                # Conteúdo do site (JS modules)
│   │   ├── slides.js        # 6 slides do hero
│   │   ├── categories.js    # 6 áreas principais
│   │   ├── brands.js        # Todas as marcas com URLs reais
│   │   ├── contact.js       # Dados de contacto oficiais
│   │   ├── water.js
│   │   ├── ocean.js
│   │   ├── chemistry.js
│   │   ├── drones.js
│   │   └── mycotoxins.js
│   ├── pages/
│   │   ├── Home.jsx                 # Homepage com slideshow preservado
│   │   ├── Sobre.jsx                # Sobre Nós / Contactos + formulário
│   │   ├── Agua.jsx                 # Sistemas de Produção de Água
│   │   ├── Quimica.jsx
│   │   ├── Oceanografia.jsx
│   │   ├── Drones.jsx               # Hydra 7
│   │   ├── Micotoxinas.jsx
│   │   ├── MaterialLaboratorio.jsx
│   │   ├── Produtos.jsx
│   │   ├── Marcas.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Funcionalidades

### Preservado do site original
- Fullscreen inicial com slideshow (6 slides, títulos e links mantidos)
- Todos os nomes de produtos (Water 75, Water 75 XL, Water 300, WaterControl,
  Dispensador, WaterGuard, Pré-Tratamento, Hydra 7, WiSens TD/Wave/CTD/DO/
  Cloro-A/TBD, WiMo, WiHub, etc.)
- Todas as marcas e URLs externos reais (Glass Expansion, Elemental
  Microanalysis, Hydrobios, WildCo, NKE, Auxilab, CHM, Umura, CRUMA, JP
  Selecta, Thermo, Agilent, PerkinElmer, Shimadzu, Hitachi, GBC, etc.)
- Dados de contacto (Wonderstatus Unipessoal Lda · geral@wonderstatus.pt ·
  +351 259 931 174 · Mercado Municipal, Loja 6, 5060-327 Sabrosa)
- Tabelas técnicas (ASTM, WiMo, WiSens), processo de purificação em 8 etapas,
  especificações completas
- Fotos dos produtos (Water 75, 75 XL, 300, WaterControl, Dispensador,
  WaterGuard, Pré-tratamento, logos de todas as marcas)
- Formulário de contacto central a enviar para `formsubmit.co` (mantido o
  endpoint original)

### Novo design
- Paleta branco / azul / cinza suave com gradientes elegantes
- Glassmorphism subtil em cards e painéis
- Tipografia dupla: Plus Jakarta Sans (corpo) + Sora (display)
- Navbar moderna com transparência na home e sólida ao fazer scroll
- Menu mobile com drawer animado
- Rodapé premium com blobs decorativos
- Hero de cada página com parallax real

### Animações (Framer Motion)
- Slideshow com zoom lento e transições fade cross-dissolve
- Parallax no hero das páginas internas
- Scroll reveal (fade / slide-up / slide-left / slide-right / zoom)
- Hover nos cards com elevação e sombra animada
- Transições de página no React Router
- Marquee de marcas na homepage

## Formulário de contacto

O formulário em `/sobre#formulario-contacto` envia os dados por `fetch` POST
JSON para `https://formsubmit.co/ajax/geral@wonderstatus.pt` (o mesmo endpoint
do site original). Os campos honeypot estão incluídos como proteção
anti-spam.

Se quiser substituir o destino, altere `endpoint` em `src/data/contact.js`.

## Navegação

Rotas disponíveis:

| Rota                      | Página                        |
|---------------------------|-------------------------------|
| `/`                       | Home (slideshow fullscreen)   |
| `/material-laboratorio`   | Material de Laboratório       |
| `/oceanografia`           | Oceanografia                  |
| `/agua`                   | Sistemas de Produção de Água  |
| `/quimica`                | Química                       |
| `/drones`                 | Drones (Hydra 7)              |
| `/micotoxinas`            | Micotoxinas                   |
| `/produtos`               | Produtos e Consumíveis        |
| `/marcas`                 | Todas as Marcas               |
| `/sobre`                  | Sobre Nós / Contactos         |

## Tecnologias

- **React 18** — biblioteca de UI
- **Vite 5** — dev server e build
- **React Router 6** — routing SPA
- **Framer Motion 11** — animações e transições
- **Tailwind CSS 3** — utilitários de estilo

## Notas

- Projeto limpo, sem código legado do site anterior
- Componentes reutilizáveis em `src/components/`
- Dados centralizados em `src/data/` — fácil de editar conteúdo sem mexer no
  layout
- Responsivo: computador, tablet e telemóvel
- Sem dependência de jQuery, GSAP ou scripts externos no HTML
