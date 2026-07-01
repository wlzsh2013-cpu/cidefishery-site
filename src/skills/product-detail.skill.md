---
# Skill: Product Detail Page Template
# Type: Business Page Module
# Usage: Individual product pages like /product/artemia-cysts/

## Page Structure
1. Product Hero (h1 + lead + CTA buttons + product image)
2. Product Specifications Grid
3. Applications Section (optional)
4. B2B Order Information Cards
5. Inquiry Form Section

## Required Props for BaseLayout
- title: "[Product Name] for [Use Case] | CIDE FISHERY"
- description: Unique description covering product + buyers + features
- breadcrumbs: [{ name: "Products", url: "/products/" }, { name: "[Product]", url: "/product-[slug]/" }]
- showBreadcrumb: true
- jsonLdType: "Product"
- jsonLdData: { name: "[Product Name]", category: "Aquaculture Supplies" }
- ogImage: "/images/products/[slug]-og.jpg"

## Required Components
- BaseLayout
- Button
- Picture (for product image)

## Form Fields
Always include hidden product context:
```html
<input type="hidden" name="product" value="[Exact Product Name]" />
```
Standard fields: name, company, email, country, quantity (select), packaging (select), message

## SEO Rules
- Unique H1 that includes product name + use case
- Unique meta description (product + buyer types + supply value)
- Product structured data
- Internal links to trust pages (QC, Storage, Packaging)
- Internal links to related products and applications

## Styling Rules
- Specs grid: 2 columns desktop, 1 column mobile
- Order info cards: 2 columns desktop, 1 column mobile
- Form: 2 columns desktop, 1 column mobile
- Product hero: 2 columns (text + image), 1 column on tablet
