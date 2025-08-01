export const SITE_CONFIG = {
  // Site Information
  title: 'Hilal Technologic',
  description: 'Hilal Technologic menyajikan artikel, tutorial, dan pembahasan menarik seputar teknologi, web development, Astro, Tailwind CSS, dan dunia digital lainnya.',
  author: 'Hilal Technologic Team',
  
  // URLs
  url: 'https://hilaltechnologic.info', // Base URL dari astro.config.mjs
  baseUrl: 'https://hilaltechnologic.info',
  
  // Social Media
  social: {
    twitter: '@hilaltechnologi',
    github: 'https://github.com/hilaltechnologic',
    linkedin: 'https://linkedin.com/company/hilalabdillah',
    email: 'hilal@technologist.com'
  },
  
// SEO
keywords: [
  'Hilal Technologic',
  'Hilal Technology',
  'Hilal Technologi',
  'Hilal Teknologi',
  'Technologic Hilal',
  'Technology Hilal',
  'web development',
  'programming',
  'javascript',
  'typescript',
  'react',
  'astro',
  'tailwind css',
  'tutorial',
  'blog teknologi',
  'blog',
  'teknologi',
  'framework astro',
  'HTML',
  'CSS',
  'JavaScript',
  'frontend',
  'UI/UX',
  'coding',
  'website modern',
  'SEO',
  'template website',
  'desain web',
  'developer Indonesia',
  'open source',
  'performance web',
  'tips coding',
  'artikel teknologi',
  'update teknologi'
],

  
  // Organization Info for Schema.org
  organization: {
    name: 'Hilal Technologic',
    url: 'https://hilaltechnologic.info',
    logo: 'https://hilaltechnologic.info/images/logo.png',
    description: 'Platform blog untuk berbagi pengetahuan tentang web development dan teknologi.',
    foundingDate: '2024-01-01',
    founders: [
      {
        name: 'Hilal Technologic Blog',
        url: 'https://hilaltechnologic.info/author/admin'
      }
    ]
  },
  
  // Default Images
  defaultImage: 'https://hilaltechnologic.info/images/og-default.jpg',
  favicon: '/favicon.svg',
  
  // Language and Locale
  language: 'id',
  locale: 'id_ID',
  
  // Analytics (optional)
  googleAnalytics: 'G-GP3FQFYJ6W', // GA4 Measurement ID
  googleSiteVerification: 'ajHackFsUur9XVseIEfo2KoIO9d6NA-daOLzXSXiXV8', // Google Search Console verification
  
  // RSS
  rss: {
    title: 'Hilal Technologic RSS Feed',
    description: 'Update terbaru dari Hilal Technologic',
    customData: `<language>id-id</language>`
  }
} as const;

export type SiteConfig = typeof SITE_CONFIG;
