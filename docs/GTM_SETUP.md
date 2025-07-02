# Google Tag Manager (GTM) Setup Documentation

Dokumentasi lengkap untuk implementasi Google Tag Manager di website Astro dengan privacy compliance dan consent mode.

## 🎯 Overview

Google Tag Manager telah diintegrasikan dengan:
- ✅ Privacy-first approach dengan consent mode
- ✅ GDPR compliance
- ✅ Automatic event tracking
- ✅ Cookie consent integration
- ✅ TypeScript support
- ✅ Development/production environment handling

## 📋 Komponen yang Dibuat

### 1. GoogleTagManager.astro
Komponen utama GTM dengan consent mode dan privacy-first configuration.

**Fitur:**
- Consent mode v2 implementation
- Development environment toggle
- DataLayer initialization
- NoScript fallback
- Helper functions untuk tracking

### 2. GTMEvents.astro
Komponen untuk automatic event tracking dengan berbagai jenis interaksi user.

**Event Tracking:**
- Scroll depth tracking (25%, 50%, 75%, 90%, 100%)
- Outbound link clicks
- File downloads
- Form submissions
- Video engagement
- Button clicks
- Page performance metrics
- JavaScript errors
- Core Web Vitals

### 3. Site Configuration
Update pada `src/config/site.ts` untuk GTM configuration.

## 🔧 Configuration

### GTM ID Setup
```typescript
// src/config/site.ts
export const SITE_CONFIG = {
  // ... existing config
  
  googleTagManager: 'GTM-WXDGG6KQ', // Your GTM Container ID
  
  gtm: {
    id: 'GTM-WXDGG6KQ', // Your GTM Container ID
    enableInDevelopment: false,
    autoTracking: {
      scrollDepth: true,
      outboundLinks: true,
      fileDownloads: true,
      formSubmissions: true,
      videoEngagement: true,
      pagePerformance: true,
      webVitals: true
    }
  }
};
```

### Environment Variables
Untuk keamanan, Anda bisa menggunakan environment variables:

```bash
# .env
PUBLIC_GTM_ID=GTM-WXDGG6KQ
```

```typescript
// src/config/site.ts
gtm: {
  id: import.meta.env.PUBLIC_GTM_ID || 'GTM-WXDGG6KQ',
  // ...
}
```

## 🚀 Implementation

### 1. BaseLayout Integration
GTM sudah terintegrasi di `src/layouts/BaseLayout.astro`:

```astro
<!-- Google Tag Manager -->
<GoogleTagManager 
  gtmId={SITE_CONFIG.gtm.id}
  enableInDevelopment={SITE_CONFIG.gtm.enableInDevelopment}
/>
<GTMEvents
  enableAutoTracking={true}
  trackScrollDepth={SITE_CONFIG.gtm.autoTracking.scrollDepth}
  trackOutboundLinks={SITE_CONFIG.gtm.autoTracking.outboundLinks}
  trackFileDownloads={SITE_CONFIG.gtm.autoTracking.fileDownloads}
  trackFormSubmissions={SITE_CONFIG.gtm.autoTracking.formSubmissions}
  trackVideoEngagement={SITE_CONFIG.gtm.autoTracking.videoEngagement}
/>
```

### 2. Cookie Consent Integration
GTM terintegrasi dengan cookie consent untuk privacy compliance:

```javascript
// Cookie consent granted
if (window.gtmHelper) {
  window.gtmHelper.grantConsent();
}

// Cookie consent denied
if (window.gtmHelper) {
  window.gtmHelper.denyConsent();
}
```

## 📊 DataLayer Structure

### Default DataLayer
```javascript
window.dataLayer = [{
  'gtm.start': new Date().getTime(),
  event: 'gtm.js',
  'gtag_consent_mode': {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  }
}];
```

### Custom Events
```javascript
// Page view
dataLayer.push({
  event: 'page_view',
  page_path: '/current-page',
  page_title: 'Page Title',
  page_location: 'https://example.com/current-page'
});

// Scroll depth
dataLayer.push({
  event: 'scroll_depth',
  scroll_depth: 75,
  page_path: '/current-page'
});

// Outbound link click
dataLayer.push({
  event: 'click_outbound_link',
  link_url: 'https://external-site.com',
  link_text: 'Link Text',
  link_domain: 'external-site.com'
});

// File download
dataLayer.push({
  event: 'file_download',
  file_url: '/path/to/file.pdf',
  file_name: 'document.pdf',
  file_extension: 'pdf'
});
```

## 🎛️ GTM Helper Functions

### Available Methods
```javascript
// Push custom data
window.gtmHelper.push({
  event: 'custom_event',
  custom_parameter: 'value'
});

// Update consent
window.gtmHelper.updateConsent({
  ad_storage: 'granted',
  analytics_storage: 'granted'
});

// Grant all consent
window.gtmHelper.grantConsent();

// Deny all consent
window.gtmHelper.denyConsent();

// Track custom events
window.gtmHelper.trackEvent('button_click', {
  button_text: 'Subscribe',
  button_location: 'header'
});

// Track page views
window.gtmHelper.trackPageView('/new-page', 'New Page Title');

// Track user engagement
window.gtmHelper.trackEngagement({
  engagement_time: 30,
  scroll_depth: 50
});
```

## 🏷️ GTM Container Setup

### 1. Create GTM Container
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create new account/container
3. Get your GTM ID (GTM-XXXXXXX)
4. Update `SITE_CONFIG.gtm.id`

### 2. Recommended Tags

#### Google Analytics 4
```
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: G-XXXXXXXXXX
Trigger: Consent Initialization - All Pages
```

#### Enhanced Ecommerce (if needed)
```
Tag Type: Google Analytics: GA4 Event
Event Name: purchase
Trigger: Custom Event - purchase
```

### 3. Recommended Triggers

#### Consent Granted
```
Trigger Type: Custom Event
Event Name: consent_update
Condition: analytics_storage equals granted
```

#### Scroll Depth
```
Trigger Type: Custom Event
Event Name: scroll_depth
```

#### Outbound Links
```
Trigger Type: Custom Event
Event Name: click_outbound_link
```

### 4. Recommended Variables

#### Page Path
```
Variable Type: Data Layer Variable
Data Layer Variable Name: page_path
```

#### Scroll Depth
```
Variable Type: Data Layer Variable
Data Layer Variable Name: scroll_depth
```

## 🔒 Privacy & Consent

### Consent Mode Implementation
```javascript
// Default consent (denied)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted'
});

// Update consent when user accepts
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'analytics_storage': 'granted',
  'functionality_storage': 'granted',
  'personalization_storage': 'granted'
});
```

### GDPR Compliance Features
- ✅ Consent mode v2 implementation
- ✅ Default consent denied
- ✅ User consent management
- ✅ Cookie consent integration
- ✅ Data minimization
- ✅ Opt-out mechanism

## 📈 Event Tracking Details

### Automatic Events

#### Scroll Depth
```javascript
// Triggered at 25%, 50%, 75%, 90%, 100%
{
  event: 'scroll_depth',
  scroll_depth: 75,
  page_path: '/current-page',
  page_title: 'Page Title'
}
```

#### Outbound Links
```javascript
{
  event: 'click_outbound_link',
  link_url: 'https://external.com',
  link_text: 'External Link',
  link_domain: 'external.com',
  source_page: '/current-page'
}
```

#### File Downloads
```javascript
{
  event: 'file_download',
  file_url: '/downloads/document.pdf',
  file_name: 'document.pdf',
  file_extension: 'pdf',
  link_text: 'Download PDF',
  source_page: '/current-page'
}
```

#### Form Submissions
```javascript
{
  event: 'form_submit',
  form_id: 'contact-form',
  form_name: 'contact',
  form_fields: 'name,email,message',
  form_action: '/submit-contact',
  source_page: '/contact'
}
```

#### Video Engagement
```javascript
// Video play
{
  event: 'video_play',
  video_title: 'Tutorial Video',
  video_url: '/videos/tutorial.mp4',
  video_duration: 300,
  source_page: '/tutorials'
}

// Video complete
{
  event: 'video_complete',
  video_title: 'Tutorial Video',
  video_duration: 300,
  source_page: '/tutorials'
}
```

#### Page Performance
```javascript
{
  event: 'page_performance',
  page_load_time: 1250,
  dom_content_loaded: 800,
  first_byte: 200,
  source_page: '/current-page'
}
```

#### Core Web Vitals
```javascript
{
  event: 'web_vital',
  metric_name: 'LCP',
  metric_value: 1.2,
  metric_rating: 'good',
  source_page: '/current-page'
}
```

## 🛠️ Custom Implementation

### Manual Event Tracking
```javascript
// Track custom button click
document.getElementById('cta-button').addEventListener('click', function() {
  window.gtmHelper.trackEvent('cta_click', {
    button_text: 'Get Started',
    button_location: 'hero_section',
    page_path: window.location.pathname
  });
});

// Track search
function trackSearch(searchTerm) {
  window.gtmHelper.trackEvent('search', {
    search_term: searchTerm,
    search_results: getSearchResultsCount(),
    source_page: window.location.pathname
  });
}

// Track newsletter signup
function trackNewsletterSignup(email) {
  window.gtmHelper.trackEvent('newsletter_signup', {
    email_domain: email.split('@')[1],
    source_page: window.location.pathname,
    signup_location: 'footer'
  });
}
```

### E-commerce Tracking
```javascript
// Track purchase
window.gtmHelper.trackPurchase({
  transaction_id: 'T12345',
  value: 25.99,
  currency: 'USD',
  items: [{
    item_id: 'SKU123',
    item_name: 'Product Name',
    category: 'Electronics',
    quantity: 1,
    price: 25.99
  }]
});
```

## 🔍 Debugging & Testing

### GTM Preview Mode
1. Open GTM container
2. Click "Preview"
3. Enter your website URL
4. Test events and triggers

### Browser Console
```javascript
// Check if GTM is loaded
console.log(window.dataLayer);

// Check GTM helper
console.log(window.gtmHelper);

// Manually trigger event
window.gtmHelper.trackEvent('test_event', {
  test_parameter: 'test_value'
});
```

### Chrome Extensions
- **Google Tag Assistant**: Verify tag implementation
- **GTM/GA Debugger**: Debug tracking issues
- **DataLayer Checker**: Inspect dataLayer events

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] GTM Container ID configured
- [ ] Privacy policy updated
- [ ] Cookie consent implemented
- [ ] Test events in GTM Preview
- [ ] Verify consent mode working

### Post-deployment
- [ ] Verify GTM loading in production
- [ ] Test automatic events
- [ ] Check Google Analytics data
- [ ] Monitor error tracking
- [ ] Validate privacy compliance

## 📚 Best Practices

### Performance
- ✅ Async loading
- ✅ Minimal initial payload
- ✅ Lazy load non-critical tags
- ✅ Use built-in variables when possible

### Privacy
- ✅ Implement consent mode
- ✅ Default consent denied
- ✅ Clear privacy policy
- ✅ Easy opt-out mechanism
- ✅ Data retention policies

### Tracking
- ✅ Consistent naming conventions
- ✅ Meaningful event names
- ✅ Structured data layer
- ✅ Error handling
- ✅ Testing procedures

## 🔗 Resources

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [Consent Mode Documentation](https://developers.google.com/tag-manager/consent)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GTM Best Practices](https://developers.google.com/tag-manager/best-practices)

---

> GTM implementation memberikan tracking yang powerful sambil menjaga privacy compliance dan user experience yang optimal.
