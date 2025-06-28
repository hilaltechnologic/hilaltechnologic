# 🚀 GTM Quick Setup Guide

Panduan cepat untuk mengaktifkan Google Tag Manager di website Hilal Technologic.

## ⚠️ Status Saat Ini

GTM saat ini **DINONAKTIFKAN** untuk mencegah error 404. Untuk mengaktifkan GTM, ikuti langkah-langkah berikut:

## 📋 Langkah Setup

### 1. Buat GTM Container

1. Kunjungi [Google Tag Manager](https://tagmanager.google.com/)
2. Buat akun baru atau login
3. Buat container baru:
   - **Container name**: Hilal Technologic
   - **Target platform**: Web
4. Dapatkan GTM ID (format: `GTM-XXXXXXX`)

### 2. Update Konfigurasi

Edit file `src/config/site.ts`:

```typescript
// GTM Configuration
gtm: {
  id: 'GTM-XXXXXXX', // Ganti dengan GTM ID Anda
  enableInDevelopment: false,
  enabled: true, // Ubah ke true untuk mengaktifkan
  autoTracking: {
    scrollDepth: true,
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: true,
    videoEngagement: true,
    pagePerformance: true,
    webVitals: true
  }
},
```

### 3. Test Implementation

```bash
# Build website
npm run build

# Preview website
npm run preview

# Buka http://localhost:4321
# Check browser console untuk konfirmasi GTM loading
```

### 4. Verifikasi GTM

Di browser console, check:

```javascript
// GTM loaded
console.log(window.dataLayer);

// GTM helper functions
console.log(window.gtmHelper);

// Test event
window.gtmHelper.trackEvent('test_event', {
  test_parameter: 'test_value'
});
```

## 🎯 GTM Container Setup

### Recommended Tags

#### 1. Google Analytics 4
```
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: G-GP3FQFYJ6W
Trigger: Consent Initialization - All Pages
```

#### 2. Scroll Depth Tracking
```
Tag Type: Google Analytics: GA4 Event
Event Name: scroll
Trigger: Custom Event - scroll_depth
```

#### 3. Outbound Link Tracking
```
Tag Type: Google Analytics: GA4 Event
Event Name: click
Trigger: Custom Event - click_outbound_link
```

### Recommended Triggers

#### 1. Consent Update
```
Trigger Type: Custom Event
Event Name: consent_update
```

#### 2. Scroll Depth
```
Trigger Type: Custom Event
Event Name: scroll_depth
```

#### 3. File Downloads
```
Trigger Type: Custom Event
Event Name: file_download
```

### Recommended Variables

#### 1. Page Path
```
Variable Type: Data Layer Variable
Data Layer Variable Name: page_path
```

#### 2. Event Category
```
Variable Type: Data Layer Variable
Data Layer Variable Name: event_category
```

## 🔧 Custom HTML Tags

Jika Anda ingin menggunakan Custom HTML tags, lihat file `docs/GTM_CUSTOM_TAGS.md` untuk template lengkap.

## 🔍 Troubleshooting

### GTM Not Loading
- Pastikan GTM ID benar (format: GTM-XXXXXXX)
- Pastikan `enabled: true` di config
- Check browser console untuk error

### Events Not Firing
- Pastikan GTM container sudah published
- Check GTM Preview mode
- Verify triggers di GTM

### Console Errors
- Check browser console untuk JavaScript errors
- Pastikan tidak ada conflict dengan script lain

## 📊 Event Tracking yang Tersedia

### Automatic Events
- ✅ **scroll_depth** - User scroll behavior
- ✅ **click_outbound_link** - External link clicks
- ✅ **file_download** - File download tracking
- ✅ **form_submit** - Form submission tracking
- ✅ **video_play/pause/complete** - Video engagement
- ✅ **button_click** - Button interaction tracking
- ✅ **page_performance** - Loading time metrics
- ✅ **web_vital** - Core Web Vitals monitoring
- ✅ **search** - Search query tracking
- ✅ **page_engagement** - Time on page tracking
- ✅ **javascript_error** - Error monitoring

### Manual Tracking
```javascript
// Custom event
window.gtmHelper.trackEvent('newsletter_signup', {
  source: 'footer',
  email_domain: 'gmail.com'
});

// Page view
window.gtmHelper.trackPageView('/custom-page', 'Custom Page Title');

// E-commerce
window.gtmHelper.trackPurchase({
  transaction_id: 'T12345',
  value: 25.99,
  currency: 'USD'
});
```

## 🎉 Setelah Setup

1. **Test semua events** di GTM Preview mode
2. **Publish container** di GTM
3. **Monitor data** di Google Analytics
4. **Check performance** dengan PageSpeed Insights

## 📞 Support

Jika ada masalah dengan setup GTM, check:
1. Browser console untuk error messages
2. GTM Preview mode untuk debugging
3. Google Analytics Real-time reports

---

> **Note**: GTM saat ini dinonaktifkan untuk mencegah error 404. Aktifkan hanya setelah Anda memiliki GTM Container ID yang valid.
