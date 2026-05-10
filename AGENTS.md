# AGENTS.md

## Project Scope
This project covers transforming the `CakeZone` template into a **single-page, mobile-first, fast, and SEO-friendly** local business website for **MATİAT FIRIN PASTA**.

## Documentation Source of Truth
1. Planning document lives at `docs/PLAN.md`.
2. Commit conventions and AI commit proposal format live at `docs/COMMITS.md`.
3. Any workflow update must keep these files in sync.

## Working Principles
1. All website content should be in Turkish.
2. Keep code as simple and maintainable as possible.
3. Avoid unused components, plugins, and visual effects.
4. Prioritize mobile usability and WhatsApp conversion.
5. Keep only sections that support real business needs.

## Design Rules
1. Style: modern, clean, premium street bakery.
2. Colors: dark brown, cream, beige, warm accent tones.
3. Typography: readable and low visual noise.
4. Use small border radius on cards and media blocks (8px).

## Sections to Keep
- Hero
- About
- Products
- Gallery
- Contact
- Map (Google Maps)
- Footer

## Sections to Remove
- Chefs / Team Members
- Testimonials
- Reservation
- Blog
- Fake counters/statistics
- Unnecessary slider/carousel/video modal

## Technical Rules
1. `index.html` should be the main single page.
2. `css/style.css` should contain simplified custom styles.
3. `js/main.js` should stay minimal (only essential interactions).
4. Use `loading="lazy"` on images (except critical above-the-fold media).
5. Keep external script dependencies to a minimum.

## Delivery Rules
1. After each completed task, provide a commit proposal.
2. Each proposal must follow `docs/COMMITS.md` format.
3. Commit proposals should include:
   - concise title
   - file list
   - rationale
   - risk/check notes

## Conversion Goal
The site should guide users through 3 quick actions:
1. See products
2. Find location
3. Contact/order via WhatsApp
