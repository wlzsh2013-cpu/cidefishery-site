

export const SEO_DEFAULTS = {

  robots: 'index, follow',

  og: {
    type: 'website',
    siteName: 'CIDE FISHERY',
    locale: 'en_US',
    imageWidth: 1200,
    imageHeight: 630,
  },

  twitter: {
    card: 'summary_large_image',
  },

  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CIDE FISHERY',
    url: 'https://cidefishery.com',
    logo: 'https://cidefishery.com/images/logo.svg',
    description:
      'CIDE FISHERY supplies quality Artemia cysts and brine shrimp eggs for hatcheries, aquaculture farms and global distributors.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@cidefishery.com',
      contactType: 'sales',
    },
  },

  breadcrumbBase: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cidefishery.com',
      },
    ],
  },
} as const;

export const URL_RULES = {
  lowercase: true,
  separator: '-',      
  noTrailingSlash: false,
  noQueryParams: true,
} as const;

export const NO_INDEX_PATHS = ['/404', '/thank-you'];
