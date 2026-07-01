

export const THEME = {

  colors: {
    primary: '#0B1F33',        
    brandBlue: '#1E5FA8',      
    techCyan: '#35B7D8',       
    lightWater: '#78D9E8',     
    champagneGold: '#E6B36A',  
    neutralGray: '#D9E2EC',    
    text: '#102030',           
    white: '#FFFFFF',
    lightBg: '#F5F8FC',
  },

  fonts: {
    family: 'Inter, system-ui, -apple-system, sans-serif',
    headingFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },

  typography: {
    h1: { size: '48px', weight: '700', lineHeight: '1.2' },
    h2: { size: '36px', weight: '700', lineHeight: '1.25' },
    h3: { size: '28px', weight: '700', lineHeight: '1.3' },
    h4: { size: '20px', weight: '700', lineHeight: '1.35' },
    body: { size: '16px', weight: '400', lineHeight: '1.6' },
    small: { size: '14px', weight: '400', lineHeight: '1.5' },
  },

  breakpoints: {
    tablet: '1024px',   
    mobile: '767px',    
  },

  tabletTypography: {
    h1: { size: '40px', weight: '700' },
    h2: { size: '32px', weight: '700' },
    h3: { size: '24px', weight: '700' },
    h4: { size: '20px', weight: '700' },
    body: { size: '16px', weight: '400' },
  },

  mobileTypography: {
    h1: { size: '36px', weight: '700' },
    h2: { size: '28px', weight: '700' },
    h3: { size: '24px', weight: '700' },
    h4: { size: '20px', weight: '700' },
    body: { size: '16px', weight: '400' },
  },

  layout: {
    contentWidth: '90%',
    maxWidth: '1200px',
    borderRadius: '8px',
    sectionSpacing: '80px',
    sectionSpacingMobile: '48px',
  },

  button: {
    primaryBg: '#E6B36A',
    primaryColor: '#0B1F33',
    primaryHoverBg: '#D4A050',
    secondaryBg: 'transparent',
    secondaryColor: '#E6B36A',
    secondaryBorder: '#E6B36A',
    secondaryHoverBg: '#E6B36A',
    secondaryHoverColor: '#0B1F33',
    borderRadius: '6px',
    paddingX: '24px',
    paddingY: '12px',
    fontSize: '16px',
    fontWeight: '600',
  },
} as const;
