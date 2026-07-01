# CIDE FISHERY Astro Site - AI Build Rules

## Project Overview
Modular B2B foreign trade website built on Astro static framework, following WordPress theme templating logic.

## Architecture Principles (WordPress-like Theme System)

### Global Base Modules
One-time config, auto-applied to all pages:
- src/content/config/site.config.ts - Site identity, contact, social
- src/content/config/theme.config.ts - Colors, fonts, breakpoints, buttons
- src/content/config/seo.config.ts - SEO defaults, schema, URL rules
- src/styles/variables.css - CSS custom properties
- src/styles/global.css - Global base styles

### Shared Components (OOP: Encapsulate once, reuse everywhere)
- src/components/Navigation.astro - Global nav
- src/components/Footer.astro - Global footer
- src/components/ContactForm.astro - Inquiry form
- src/components/TrustBar.astro - Trust bar
- src/components/SEO.astro - SEO head
- src/components/JsonLd.astro - Structured data
- src/components/Picture.astro - Responsive images
- src/components/Button.astro - Buttons
- src/components/ProductCard.astro - Product cards
- src/components/ApplicationCard.astro - Application cards
- src/components/HeroSection.astro - Hero section
- src/components/CTASection.astro - CTA section

### Business Page Modules (Skill Templates)
Each page type has a fixed template ensuring consistent structure:
- Product Listing | Product Detail | Application | Trust Page
- Blog List/Detail | Contact | FAQ | About | 404

## Quick Rules Reference

### Colors
Primary: #0B1F33 | Brand Blue: #1E5FA8 | Tech Cyan: #35B7D8
Champagne Gold: #E6B36A | Neutral Gray: #D9E2EC | Text: #102030
H1: #1E5FA8 | H2-H4: #0B1F33 | Links/Buttons: #E6B36A

### Typography
Inter | H1: 48px Bold | H2: 36px Bold | H3: 28px Bold | H4: 20px Bold | Body: 16px

### Breakpoints
Tablet: 1024px | Mobile: 767px | Content width: 90%

### SEO
Every page must have: unique title, unique description, canonical, robots, OG tags, Twitter Card, structured data
One H1 per page | URL: lowercase, hyphen-separated

### Images
All images: width/height/alt | Non-hero: loading=lazy | Prefer WebP

## How to Add New Pages
1. Create .astro file in src/pages/
2. Import BaseLayout with title/description props
3. Use existing components (ProductCard, ApplicationCard, CTASection, etc.)
4. Use CSS variables (never hardcode colors/fonts)

## How to Modify Global Rules
- Brand info: src/content/config/site.config.ts
- Colors/fonts: src/content/config/theme.config.ts + src/styles/variables.css
- SEO: src/content/config/seo.config.ts
- Navigation: src/components/Navigation.astro
- Footer: src/components/Footer.astro
