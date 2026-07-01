---
# Skill: Trust Page Template
# Type: Business Page Module
# Usage: /trust/ pages (Quality Control, Cold Storage, Packaging, Processing, Supply)

## Page Structure
1. Page Header (h1 + lead)
2. Feature Cards Grid (4 cards, 2x2)
3. CTA Section

## Required Props for BaseLayout
- title: "[Topic] | CIDE FISHERY"
- description: Unique description about the trust topic
- breadcrumbs: [{ name: "Trust", url: "/trust/[slug]/" }, { name: "[Topic]", url: "/trust/[slug]/" }]
- showBreadcrumb: true

## Feature Cards Pattern
Each card: icon + h3 title + short description
Icons use emoji: factory, snowflake, package, export, shrimp, fish

## SEO Rules
- Unique title + description
- Links to related trust pages
- Links to product pages
- Links to contact

## Cross-Linking Rules
Trust pages should link to:
- At least 1 product page
- At least 1 other trust page
- Contact page
