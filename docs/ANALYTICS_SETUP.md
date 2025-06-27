# Google Analytics & Privacy Compliance Setup

Dokumentasi lengkap untuk setup Google Analytics dengan privacy compliance (GDPR) di website Astro.

## 🎯 Fitur yang Tersedia

### Google Analytics 4 (GA4)
- ✅ Tracking page views
- ✅ Custom events (search, scroll, clicks, downloads)
- ✅ Core Web Vitals monitoring
- ✅ User engagement tracking
- ✅ Consent management integration

### Privacy Compliance
- ✅ Cookie consent banner
- ✅ GDPR compliance
- ✅ Google Consent Mode v2
- ✅ Analytics enable/disable controls
- ✅ Local storage management

## 📋 Komponen yang Digunakan

### 1. GoogleAnalytics.astro
Komponen utama untuk Google Analytics dengan consent mode.

**Fitur:**
- Consent mode default (denied)
- Automatic consent checking
- Privacy-first configuration
- Cookie settings optimization

### 2. AnalyticsEvents.astro
Komponen untuk tracking custom events dan user interactions.

**Events yang di-track:**
- Search queries
- Scroll depth (25%, 50%, 75%, 90%, 100%)
- Outbound link clicks
- File downloads
- Page engagement time
- Core Web Vitals (LCP, CLS)

### 3. CookieConsent.astro
Banner consent untuk privacy compliance.

**Fitur:**
- Responsive design
- Accept/Reject options
- Local storage management
- Analytics integration
- GDPR compliance

## 🚀 Cara Kerja

### 1. Initial Load
```javascript
// Google Analytics dimuat dengan consent denied
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});
```

### 2. User Consent
```javascript
// Jika user accept cookies
localStorage.setItem('analytics-enabled', 'true');
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

### 3. Event Tracking
```javascript
// Custom events hanya dikirim jika consent granted
if (this.trackingEnabled) {
  gtag('event', 'search', {
    search_term: query,
    event_category: 'engagement'
  });
}
```

## 📊 Events yang Di-track

### 1. Page Views
```javascript
gtag('event', 'page_view', {
  page_type: 'article',
  page_location: window.location.href,
  page_title: document.title
});
```

### 2. Search Events
```javascript
gtag('event', 'search', {
  search_term: 'astro tutorial',
  event_category: 'engagement',
  event_label: 'site_search'
});
```

### 3. Scroll Tracking
```javascript
gtag('event', 'scroll', {
  event_category: 'engagement',
  event_label: '75%',
  value: 75
});
```

### 4. Outbound Links
```javascript
gtag('event', 'click', {
  event_category: 'outbound',
  event_label: 'https://external-site.com',
  transport_type: 'beacon'
});
```

### 5. File Downloads
```javascript
gtag('event', 'file_download', {
  event_category: 'engagement',
  event_label: 'document.pdf',
  file_extension: 'pdf',
  file_name: 'document.pdf'
});
```

### 6. Core Web Vitals
```javascript
gtag('event', 'web_vitals', {
  event_category: 'Web Vitals',
  event_label: 'LCP',
  value: 2100,
  metric_name: 'largest_contentful_paint',
  metric_value: 2.1
});
```

## 🔧 Konfigurasi

### Environment Variables
```bash
# .env
GA_MEASUREMENT_ID=G-GP3FQFYJ6W
```

### Google Analytics Settings
```javascript
gtag('config', GA_MEASUREMENT_ID, {
  enhanced_measurement: true,
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
  cookie_expires: 63072000, // 2 years
  send_page_view: false // Controlled manually
});
```

## 🛡️ Privacy Compliance

### GDPR Compliance
- ✅ Consent banner sebelum tracking
- ✅ Opt-out mechanism
- ✅ Data anonymization
- ✅ Cookie expiration control
- ✅ Local storage management

### Cookie Categories
```javascript
gtag('consent', 'default', {
  'analytics_storage': 'denied',      // Analytics cookies
  'ad_storage': 'denied',            // Advertising cookies
  'functionality_storage': 'denied',  // Functionality cookies
  'personalization_storage': 'denied', // Personalization cookies
  'security_storage': 'granted'       // Security cookies (always granted)
});
```

## 📱 Responsive Design

Cookie consent banner responsive untuk semua device:

```css
/* Mobile */
@media (max-width: 768px) {
  #cookie-consent .container {
    text-align: center;
  }
}

/* Desktop */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## 🎨 Customization

### Styling Cookie Banner
```css
#cookie-consent {
  background: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark #cookie-consent {
  background: #1f2937;
  border-top: 1px solid #374151;
}
```

### Custom Events
```javascript
// Track custom events
window.analyticsTracker.track('custom_event', {
  event_category: 'user_action',
  event_label: 'button_click',
  value: 1
});
```

## 🔍 Testing & Debugging

### 1. Check Consent Status
```javascript
// Console
console.log(localStorage.getItem('analytics-enabled'));
console.log(window.cookieManager.isAnalyticsEnabled());
```

### 2. Test Events
```javascript
// Console
window.analyticsTracker.track('test_event', {
  test_parameter: 'test_value'
});
```

### 3. Google Analytics Debug
```javascript
// Enable debug mode
gtag('config', GA_MEASUREMENT_ID, {
  debug_mode: true
});
```

## 📈 Analytics Dashboard

### Key Metrics to Monitor
1. **Page Views** - Traffic overview
2. **Search Terms** - Content interests
3. **Scroll Depth** - Content engagement
4. **Core Web Vitals** - Performance metrics
5. **File Downloads** - Resource usage
6. **Outbound Clicks** - External engagement

### Custom Dimensions
- `page_type` - Homepage, article, category
- `web_vitals_metric` - LCP, CLS, FID values
- `search_term` - Site search queries
- `file_extension` - Downloaded file types

## 🚨 Troubleshooting

### Common Issues

1. **Analytics not tracking**
   - Check consent status
   - Verify GA_MEASUREMENT_ID
   - Check browser console for errors

2. **Cookie banner not showing**
   - Clear localStorage
   - Check CSS z-index
   - Verify component import

3. **Events not firing**
   - Check tracking enabled status
   - Verify event selectors
   - Test in incognito mode

### Debug Commands
```javascript
// Check tracking status
console.log(window.analyticsTracker.isTrackingEnabled());

// Check consent
console.log(localStorage.getItem('cookie-consent-v1'));

// Test event
window.analyticsTracker.track('debug_test');
```

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [GDPR Compliance Guide](https://gdpr.eu/compliance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

> Setup ini memastikan website Anda compliant dengan regulasi privacy sambil tetap mendapatkan insights analytics yang valuable.
