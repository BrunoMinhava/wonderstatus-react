# Wonderstatus — React Site

The Wonderstatus website rebuilt in modern React, with Vite, React Router,
Tailwind CSS, and Framer Motion. Keeps the original fullscreen intro
slideshow and all the essential content from the original site (products,
brands, contacts, external links, and photos).

## Requirements

- Node.js 18+ (LTS 20+ recommended)
- npm 9+

## Installation

```bash
npm install
```

## Running in development

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The final build output goes to `dist/`.

## Structure

```
wonderstatus/
├── public/
│   └── assets/              # Images, logos, slides (from the original site)
│       ├── fotos/
│       ├── logos/
│       └── slide1.JPG ... slide6.JPG
├── src/
│   ├── components/
│   │   ├── HeroSlideshow.jsx        # Fullscreen slideshow, preserved
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageHeader.jsx           # Parallax hero for inner pages
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
│   ├── data/                # Site content (JS modules)
│   │   ├── slides.js        # 6 hero slides
│   │   ├── categories.js    # 6 main areas
│   │   ├── brands.js        # All brands with real URLs
│   │   ├── contact.js       # Official contact details
│   │   ├── water.js
│   │   ├── ocean.js
│   │   ├── chemistry.js
│   │   ├── drones.js
│   │   └── mycotoxins.js
│   ├── pages/
│   │   ├── Home.jsx                 # Homepage with the preserved slideshow
│   │   ├── Sobre.jsx                # About Us / Contact + form
│   │   ├── Agua.jsx                 # Water Production Systems
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

## Features

### Preserved from the original site
- Fullscreen intro slideshow (6 slides, titles and links kept)
- All product names (Water 75, Water 75 XL, Water 300, WaterControl,
  Dispensador, WaterGuard, Pré-Tratamento, Hydra 7, WiSens TD/Wave/CTD/DO/
  Cloro-A/TBD, WiMo, WiHub, etc.)
- All brands and real external URLs (Glass Expansion, Elemental
  Microanalysis, Hydrobios, WildCo, NKE, Auxilab, CHM, Umura, CRUMA, JP
  Selecta, Thermo, Agilent, PerkinElmer, Shimadzu, Hitachi, GBC, etc.)
- Contact details (Wonderstatus Unipessoal Lda · geral@wonderstatus.pt ·
  +351 259 931 174 · Mercado Municipal, Loja 6, 5060-327 Sabrosa)
- Technical tables (ASTM, WiMo, WiSens), the 8-step purification process,
  full specifications
- Product photos (Water 75, 75 XL, 300, WaterControl, Dispensador,
  WaterGuard, Pré-tratamento, and every brand's logo)
- Central contact form posting to `formsubmit.co` (original endpoint kept)

### New design
- White / blue / soft-gray palette with elegant gradients
- Subtle glassmorphism on cards and panels
- Dual typography: Plus Jakarta Sans (body) + Sora (display)
- Modern navbar, transparent on the homepage and solid on scroll
- Mobile menu with an animated drawer
- Premium footer with decorative blobs
- Real parallax hero on every page

### Animations (Framer Motion)
- Slideshow with slow zoom and cross-dissolve fade transitions
- Parallax on inner-page heroes
- Scroll reveal (fade / slide-up / slide-left / slide-right / zoom)
- Card hover with animated elevation and shadow
- Page transitions via React Router
- Brand marquee on the homepage

## Contact form

The form at `/sobre#formulario-contacto` submits via `fetch` POST as JSON
to `https://formsubmit.co/ajax/geral@wonderstatus.pt` (the same endpoint
used by the original site). Honeypot fields are included as anti-spam
protection.

To change the destination, edit `endpoint` in `src/data/contact.js`.

## Routes

Available routes:

| Route                      | Page                           |
|---------------------------|---------------------------------|
| `/`                       | Home (fullscreen slideshow)     |
| `/material-laboratorio`   | Lab Equipment                   |
| `/oceanografia`           | Oceanography                    |
| `/agua`                   | Water Production Systems        |
| `/quimica`                | Chemistry                       |
| `/drones`                 | Drones (Hydra 7)                |
| `/micotoxinas`            | Mycotoxins                      |
| `/produtos`               | Products & Consumables          |
| `/marcas`                 | All Brands                      |
| `/sobre`                  | About Us / Contacts             |

## Tech stack

- **React 18** — UI library
- **Vite 5** — dev server and build
- **React Router 6** — SPA routing
- **Framer Motion 11** — animations and transitions
- **Tailwind CSS 3** — utility-first styling

## Notes

- Clean project, no legacy code from the previous site
- Reusable components under `src/components/`
- Content centralized in `src/data/` — easy to edit content without
  touching the layout
- Responsive: desktop, tablet, and mobile
- No dependency on jQuery, GSAP, or external scripts in the HTML
