# PLAN.md

## MATİAT FIRIN PASTA Transformation Plan

### 1) Current Template Analysis
- The template is multi-page (`about.html`, `contact.html`, `team.html`, `testimonial.html`, `menu.html`, `service.html`).
- `index.html` includes sections that are unnecessary for this business:
  - Video modal
  - Counter/Facts
  - Team/Chefs
  - Offer campaign block
  - Testimonial carousel
  - Complex dropdown navigation
- JS includes unnecessary dependencies:
  - jQuery, easing, counterup, owlcarousel

### 2) Target Architecture
- Single-page structure: `index.html`
- Navigation via internal anchor links
- Sections:
  - Hero
  - About
  - Products
  - Gallery
  - Contact
  - Location (Google Maps embed)
  - Footer

### 3) Content Transformation
- Translate all generic English content into Turkish.
- Replace placeholder text with real bakery-focused copy.
- Lock business information:
  - Name: MATİAT FIRIN PASTA
  - Location: Çukurova Üniversitesi Ana Giriş Kapısı Önü, Sarıçam, Adana
  - WhatsApp: https://wa.me/905397492173

### 4) UI/UX Transformation
- Mobile-first spacing and typography.
- Simpler hero with:
  - Clear value proposition
  - WhatsApp CTA
  - Location CTA
- Clean, scannable product cards.
- Gallery grid: 2 columns on mobile, 4 on desktop.

### 5) SEO & Performance
- Set `lang="tr"`.
- Add `title`, `description`, `keywords`, and Open Graph tags.
- Use lazy loading for non-critical images.
- Remove unused CSS/JS dependencies.
- Keep JavaScript minimal.

### 6) File-Level Implementation
1. Refactor `index.html` into a single-page business website.
2. Rewrite `css/style.css` with simplified brand styling.
3. Simplify `js/main.js` (back-to-top only).
4. Add and maintain `AGENTS.md` and `docs/PLAN.md`.

### 7) Final QA Checklist
- [ ] Are navbar links correctly mapped to section IDs?
- [ ] Do all WhatsApp buttons point to the correct number?
- [ ] Does the embedded map show the correct location?
- [ ] Any mobile overflow or overlap issues?
- [ ] Are SEO meta tags complete and accurate?
