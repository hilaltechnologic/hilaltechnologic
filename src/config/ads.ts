// Konfigurasi iklan untuk berbagai platform
export const ADS_CONFIG = {
  // Google AdSense
  adsense: {
    enabled: false, // Diaktifkan untuk Google AdSense
    publisherId: 'ca-pub-5573623649456971', // Publisher ID Anda
    slots: {
      header: 'auto',     // Menggunakan format auto untuk adaptive ads
      sidebar: 'auto',    // Anda bisa mengganti dengan slot ID spesifik
      content: 'auto',    // dari AdSense dashboard setelah
      footer: 'auto'      // membuat ad unit
    }
  },

  // Media.net
  medianet: {
    enabled: false,
    siteId: 'YOUR_SITE_ID',
    slots: {
      header: 'header-slot-id',
      sidebar: 'sidebar-slot-id',
      content: 'content-slot-id', 
      footer: 'footer-slot-id'
    }
  },

  // PropellerAds
  propellerads: {
    enabled: false,
    zoneIds: {
      header: 'zone-id-1',
      sidebar: 'zone-id-2',
      content: 'zone-id-3',
      footer: 'zone-id-4'
    }
  },

  // Custom/Direct ads
  custom: {
    enabled: false,
    ads: {
      header: {
        html: '<div>Custom Header Ad HTML</div>',
        script: ''
      },
      sidebar: {
        html: '<div>Custom Sidebar Ad HTML</div>',
        script: ''
      },
      content: {
        html: '<div>Custom Content Ad HTML</div>',
        script: ''
      },
      footer: {
        html: '<div>Custom Footer Ad HTML</div>',
        script: ''
      }
    }
  },

  // Global settings
  settings: {
    showInDevelopment: false, // Set ke true untuk melihat iklan di development
    lazyLoad: true, // Lazy load iklan untuk performa
    respectDoNotTrack: true, // Hormati pengaturan Do Not Track
    consentRequired: true // Memerlukan consent untuk GDPR
  }
};

// Helper function untuk mengecek apakah iklan harus ditampilkan
export function shouldShowAds(): boolean {
  // Cek environment - gunakan process.env untuk kompatibilitas
  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  if (isDev && !ADS_CONFIG.settings.showInDevelopment) {
    return false;
  }

  // Cek Do Not Track
  if (ADS_CONFIG.settings.respectDoNotTrack && 
      typeof navigator !== 'undefined' && 
      navigator.doNotTrack === '1') {
    return false;
  }

  // Cek apakah ada platform iklan yang aktif
  return ADS_CONFIG.adsense.enabled || 
         ADS_CONFIG.medianet.enabled || 
         ADS_CONFIG.propellerads.enabled || 
         ADS_CONFIG.custom.enabled;
}

// Helper function untuk mendapatkan konfigurasi iklan berdasarkan slot
export function getAdConfig(slot: 'header' | 'sidebar' | 'content' | 'footer') {
  if (ADS_CONFIG.adsense.enabled) {
    return {
      platform: 'adsense',
      publisherId: ADS_CONFIG.adsense.publisherId,
      slotId: ADS_CONFIG.adsense.slots[slot]
    };
  }

  if (ADS_CONFIG.medianet.enabled) {
    return {
      platform: 'medianet',
      siteId: ADS_CONFIG.medianet.siteId,
      slotId: ADS_CONFIG.medianet.slots[slot]
    };
  }

  if (ADS_CONFIG.propellerads.enabled) {
    return {
      platform: 'propellerads',
      zoneId: ADS_CONFIG.propellerads.zoneIds[slot]
    };
  }

  if (ADS_CONFIG.custom.enabled) {
    return {
      platform: 'custom',
      config: ADS_CONFIG.custom.ads[slot]
    };
  }

  return null;
}
