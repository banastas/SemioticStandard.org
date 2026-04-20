# SemioticStandard.org

[![Live Site](https://img.shields.io/badge/Live-SemioticStandard.org-00d9ff?style=for-the-badge)](https://semioticstandard.org)
[![Built with HTML5](https://img.shields.io/badge/Built%20with-HTML5-e34f26?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Vanilla CSS](https://img.shields.io/badge/Vanilla-CSS-1572b6?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Ron Cobb](https://img.shields.io/badge/Designer-Ron%20Cobb-ffd700?style=for-the-badge)](http://www.roncobb.net/)

<img src="https://semioticstandard.org/assets/images/SemioticStandard.png">

A minimalist, interactive gallery of Ron Cobb's iconic "Semiotic Standard" symbols — the standardized spacecraft iconography originally designed in 1978 for the science fiction film *Alien* (1979).

- [About the Semiotic Standard](#about-the-semiotic-standard)
- [Features](#features)
- [Symbols](#symbols)
- [History and Cultural Impact](#history-and-cultural-impact)
- [Installation](#installation)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## About the Semiotic Standard

The "Semiotic Standard For All Commercial Trans-Stellar Utility Lifter And Heavy Element Transport Spacecraft" is a comprehensive set of standardized symbols designed by Ron Cobb in 1978. These symbols were created to provide a realistic, functional visual language for spacecraft interiors, representing various systems, hazards, and areas that would be found on commercial space vessels.

This site serves as an educational and historical preservation resource, presenting all 34 symbols (30 base symbols plus 4 directional and type variants) in a museum-like interactive gallery.

## Features

- **Interactive Symbol Gallery** — Hover, focus, or tap any symbol to see its name in a centered overlay label
- **Pure CSS Responsive Grid** — `clamp()` + `auto-fit` scales symbols from phone to ultrawide with zero layout JavaScript
- **Optimized SVG Graphics** — All 34 symbols SVGO-minified; crisp at any resolution
- **Accessible by Default** — Skip link, ARIA labels, keyboard activation (Enter/Space), `prefers-reduced-motion` respected
- **SEO-Ready** — JSON-LD structured data (`CreativeWork` / `WebSite`), canonical URL, sitemap, robots.txt
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript with no frameworks, libraries, or build tools
- **Deferred Analytics** — GA loads during idle time so it never blocks first paint
- **Minimal Design** — Black background, monospace typography, no distractions from the symbols themselves

## Symbols

The gallery displays 34 symbols across these categories:

### Environmental Systems
Pressurised Area, Pressurised with Artificial Gravity, Artificial Gravity Absent, Airlock, Bulkhead Door, Non-Pressurised Area Beyond, Artificial Gravity Area Non-Pressurised Suit Required

### Safety & Hazards
Pressure Suit Locker, Hazard Warning, No Pressure Gravity Suit Required, Radiation Hazard, High Radioactivity

### Technical Systems
Photonic System (Fibre Optics), Laser, Astronic System (Electronics), Exhaust, Area Shielded from Radiation

### Life Support & Facilities
Cryogenic Vault, Refrigeration, Life Support System, Galley, Coffee, Autodoc

### Navigation & Communication
Direction (Up, Down, Right, Left), Bridge, Intercom, Computer Terminal

### Storage & Maintenance
Maintenance, Ladderway, Storage Non-Organic, Storage Organic (Foodstuffs)

## History and Cultural Impact

### Origins

Ron Cobb developed the Semiotic Standard in 1978, predating its most famous appearance in Ridley Scott's 1979 film *Alien*. The symbols were designed with the future date of April 16, 2078, creating a sense of historical authenticity and forward-thinking design.

### Design Philosophy

Cobb's approach was revolutionary for its time:
- **Functional Realism**: Each symbol was designed to be immediately recognizable and universally understood
- **Systematic Approach**: The symbols work together as a cohesive visual language
- **Future-Forward Thinking**: Designed for a future where space travel is commercial and routine
- **Human-Centered Design**: Prioritizing crew safety and operational efficiency

### Cultural Legacy

The Semiotic Standard has had a lasting impact on science fiction design, user interface design, visual communication standards, and popular culture — becoming instantly recognizable symbols of space exploration.

## Installation

This is a static website. No build step, no dependencies, no configuration.

### Local Development

```bash
git clone https://github.com/banastas/SemioticStandard.org.git
cd SemioticStandard.org

# Open directly
open index.html

# Or serve locally
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Deployment

Upload all files to any static hosting service — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any web server. No environment variables or build process required.

## Technical Details

### Stack

- **HTML5** — Single page with JSON-LD structured data
- **CSS3** — CSS variables, `clamp()`-based responsive tile sizing, `prefers-reduced-motion` support
- **Vanilla JavaScript** — Label interaction only (hover, focus, keyboard, touch); no resize handlers
- **SVG** — 34 vector symbols (SVGO-optimized)

### How the Grid Works

The grid is pure CSS — no JavaScript sizing:

```css
grid-template-columns: repeat(auto-fit, minmax(clamp(60px, 12vmin, 200px), 1fr));
```

Breakpoints at `768px`, `480px`, and `1920px` tune the `--tile-size` variable for different viewports. Landscape phones get a dedicated height rule.

### How Hover Labels Work

On `mouseenter`, `focus`, keyboard activation (Enter/Space), or `touchend`, the `data-symbol` attribute (e.g. `001.PRESSURISED.AREA`) is parsed — the numeric prefix is stripped, dots become spaces — and the formatted name is displayed in a fixed centered overlay that fades in/out with a CSS transition. Escape dismisses the label. The label is an `aria-live="polite"` region so screen readers announce each symbol.

### Performance

- Google Analytics is loaded via `requestIdleCallback` (with a `load + 1.5s` fallback), so it never blocks first paint.
- All images use `loading="lazy"` and `decoding="async"` with explicit `width`/`height` to eliminate layout shift.
- `/_headers` sets 1-year immutable caching on `/assets/*` when deployed to Cloudflare Pages or Netlify.
- SVGO-optimized symbols (~41% smaller than source).

### Browser Support

All modern browsers — Chrome, Firefox, Safari, Edge (desktop and mobile).

## Contributing

Contributions are welcome. Please respect the educational and historical preservation nature of this project.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

MIT License — see the [LICENSE](LICENSE) file for details.

The Semiotic Standard symbols themselves are the intellectual property of Ron Cobb and are used here for educational and historical preservation purposes.

## Acknowledgments

- **Ron Cobb (1937–2020)** — Creator of the Semiotic Standard
- **Ridley Scott** — Director of *Alien* (1979)
- **[@louh](https://github.com/louh)** — [semiotic-standard](https://github.com/louh/semiotic-standard) vector symbols
- **H.R. Giger, Dan O'Bannon**, and the *Alien* production team

### Resources
- [Ron Cobb's Official Website](http://www.roncobb.net/)
- [*Alien* (1979) on IMDb](https://www.imdb.com/title/tt0078748/)

---

*A tribute to Ron Cobb's visionary work and the lasting impact of the Semiotic Standard on science fiction design and visual communication.*
