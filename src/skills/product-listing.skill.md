---
# Skill: Product Listing Page Template
# Type: Business Page Module
# Usage: /products/ type pages that list multiple products

## Page Structure
1. Page Header (h1 + lead paragraph)
2. Product Card Grid (2-4 columns based on device)
3. Buyer Guide Table (optional comparison table)
4. CTA Section

## Required Props for BaseLayout
- title: "[Product Category] for Aquaculture | CIDE FISHERY"
- description: Unique meta description covering products + buyer types
- breadcrumbs: [{ name: "Products", url: "/products/" }, { name: "[Category]", url: "/products/[slug]/" }]
- showBreadcrumb: true
- ogImage: "/images/products/[slug]-og.jpg"

## Required Components
- BaseLayout
- ProductCard (for each product)
- CTASection
- Button

## SEO Rules
- Unique title per page
- Unique meta description (include product names + buyer types)
- One H1 only (category-focused)
- Include structured data (Organization)
- Canonical URL must be set

## Styling Rules
- Use CSS variables only (--color-*, --fs-*, etc.)
- Product grid: repeat(4, 1fr) desktop, repeat(2, 1fr) tablet, 1fr mobile
- Never hardcode colors or font sizes

## Example

---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProductCard from '../../components/ProductCard.astro';
import CTASection from '../../components/CTASection.astro';

const products = [
  {
    title: 'Product Name',
    description: 'Product description for B2B buyers.',
    href: '/product-slug/',
    imageSrc: '/images/products/product-card.jpg',
    imageAlt: 'Descriptive alt text with product name and use case',
  },
];
---

<BaseLayout
  title="[Page Title] | CIDE FISHERY"
  description="[Unique meta description]"
  breadcrumbs={[{ name: '[Category]', url: '/products/[slug]/' }]}
  showBreadcrumb
>
  <section class="section page-header bg-light">
    <div class="container">
      <h1>[Page H1]</h1>
      <p class="page-lead">[Lead paragraph]</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="product-grid">
        {products.map((p) => <ProductCard {...p} />)}
      </div>
    </div>
  </section>

  <CTASection title="[CTA Title]" ctaText="Contact Us" ctaHref="/contact/" />
</BaseLayout>
