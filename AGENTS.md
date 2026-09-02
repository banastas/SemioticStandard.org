# Repository guidance

## Project

SemioticStandard.org is a zero-dependency static gallery for Ron Cobb's 34 Semiotic Standard symbols. The production site is [semioticstandard.org](https://semioticstandard.org/).

The experience is intentionally spare: a black full-viewport grid, the original symbol artwork, a credit card, and labels on hover, focus, or touch. Preserve that museum-like presentation.

## Working standard

- Finish scoped work completely, including tests and documentation.
- Inspect existing code and assets before introducing anything new.
- Prefer the permanent fix over a workaround.
- Keep changes small, readable, and dependency-free.
- Test the rendered site at desktop, tablet, phone portrait, and phone landscape sizes.
- Do not claim a deployment is complete until the live site has been verified.

## Architecture

- `index.html`: content, metadata, structured data, and the 34 symbol buttons
- `assets/css/style.css`: full-viewport grid, responsive typography, focus, and motion styles
- `assets/js/script.js`: exact-factor grid selection and delegated symbol interaction
- `assets/js/analytics.js`: deferred Google Analytics loader
- `assets/images/`: 34 optimized SVG symbols and the 1200 × 630 preview image
- `_headers`: cache and security headers for compatible static hosts
- `scripts/check-site.mjs`: dependency-free integrity checks

There is no build step and there are no runtime or development dependencies.

## Local workflow

Serve the repository root so root-relative asset URLs work:

```bash
python3 -m http.server 8000
```

Run the validation suite:

```bash
npm test
```

The test requires Node.js 20 or newer and does not require `npm install`.

## Interaction contract

- Symbols must remain native buttons with unique `data-symbol` values and matching accessible names.
- Hover and keyboard focus reveal the symbol label.
- Touch toggles the label, and a touch outside dismisses it.
- Escape dismisses the label and clears focus.
- Reduced-motion preferences must disable meaningful transitions and scaling.
- The credit card occupies two grid cells, producing 36 effective cells with the symbols.
- Grid choices must exactly divide those 36 cells so no partial row appears.

## Content and assets

- Preserve the original British spellings used by the symbol names.
- Keep symbol filenames and identifiers stable unless correcting a verified source error.
- Optimize SVGs without changing their visual geometry.
- Keep `assets/images/SemioticStandard.png` at 1200 × 630 and refresh it after visible gallery changes.
- The MIT license covers the website code. Keep the CC BY 4.0 vector attribution and `THIRD_PARTY_NOTICES.md` intact.

## Release checks

Before shipping:

1. Run `npm test` and `git diff --check`.
2. Confirm all 34 symbols load without console errors.
3. Verify the grid has no empty cells or page overflow at representative viewports.
4. Test hover, Tab focus, Enter or Space activation, Escape dismissal, and touch toggling.
5. Check the current screenshot, metadata, sitemap date, and security headers.
6. Inspect the final diff for generated files, local configuration, secrets, and unrelated changes.
