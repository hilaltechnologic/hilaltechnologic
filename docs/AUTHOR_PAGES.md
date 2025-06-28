# Author Pages Documentation

Dokumentasi lengkap untuk sistem halaman author di website Astro.

## 🎯 Fitur Author Pages

### Halaman yang Tersedia
1. **Author Index** (`/author/`) - Daftar semua penulis
2. **Author Profile** (`/author/[slug]/`) - Profil detail penulis

### URL Structure
- `/author/` - Halaman daftar authors
- `/author/admin/` - Profil author admin (Hilal Technologic)

## 📋 Komponen yang Dibuat

### 1. src/pages/author/index.astro
Halaman daftar semua penulis dengan informasi ringkas.

**Fitur:**
- Grid layout responsive
- Author cards dengan avatar, bio, dan stats
- Expertise tags
- Latest post preview
- Call-to-action untuk bergabung sebagai penulis

### 2. src/pages/author/[slug].astro
Halaman profil detail penulis dengan dynamic routing.

**Fitur:**
- Header profil lengkap dengan avatar dan bio
- Statistics (jumlah artikel, keahlian, tahun bergabung)
- Contact information dan social links
- Expertise section dengan tags
- Latest articles grid (6 artikel terbaru)
- SEO optimization

## 👤 Author Data Structure

```javascript
const author = {
  slug: 'admin',
  name: 'Hilal Technologic',
  bio: 'Tech enthusiast dan content creator...',
  avatar: '/images/team/hilal-avatar.webp',
  email: 'admin@hilaltechnologic.info',
  website: 'https://hilaltechnologic.info',
  social: {
    twitter: 'https://twitter.com/hilaltech',
    github: 'https://github.com/hilaltech',
    linkedin: 'https://linkedin.com/in/hilaltech',
    youtube: 'https://youtube.com/@hilaltechnologic'
  },
  expertise: ['Web Development', 'JavaScript', 'React', 'Astro', 'Node.js', 'SEO'],
  joinDate: '2023-01-01',
  location: 'Indonesia'
}
```

## 🎨 Design Features

### Author Index Page
- **Hero Section** dengan judul dan deskripsi
- **Author Grid** dengan cards responsive
- **Author Stats** (artikel count, expertise count)
- **Latest Post Preview** untuk setiap author
- **Call-to-Action** untuk recruitment

### Author Profile Page
- **Header Section** dengan avatar besar dan info lengkap
- **Statistics Bar** dengan metrics penting
- **Contact Info** dengan location dan join date
- **Social Links** dengan styling konsisten
- **Expertise Section** dengan colored tags
- **Articles Grid** dengan hover effects

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Centered content alignment
- Stacked social buttons
- Compact stats display

### Tablet (768px - 1024px)
- 2-column grid untuk author cards
- Balanced layout untuk profile page
- Optimized spacing

### Desktop (> 1024px)
- 3-column grid untuk author cards
- Side-by-side layout untuk profile
- Full social links display

## 🔍 SEO Optimization

### Author Index
```javascript
const seoData = {
  title: 'Authors - Tim Penulis Hilal Technologic',
  description: 'Kenali tim penulis di Hilal Technologic...',
  type: 'website',
  image: '/images/blog/hilal-blog.webp',
  tags: ['authors', 'team', 'web development']
};
```

### Author Profile
```javascript
const seoData = {
  title: `${author.name} - Author Profile`,
  description: `Profil lengkap ${author.name}. ${author.bio}`,
  type: 'article',
  image: author.avatar,
  author: author.name,
  tags: author.expertise
};
```

## 🔗 Integration dengan Blog

### Author Attribution
Artikel blog sudah terintegrasi dengan author system melalui:

```yaml
# Di frontmatter artikel
author:
  name: "Hilal Technologic"
  url: "https://hilaltechnologic.info/author/admin"
```

### Article Filtering
Author profile menampilkan artikel yang ditulis oleh author tersebut:

```javascript
const authorPosts = allPosts
  .filter(post => post.data.author?.name === author.name)
  .sort((a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime());
```

## 🎯 Features Highlights

### Author Index Features
- ✅ Responsive grid layout
- ✅ Author statistics
- ✅ Expertise preview
- ✅ Latest post preview
- ✅ Direct profile links
- ✅ Social media links
- ✅ Recruitment CTA

### Author Profile Features
- ✅ Comprehensive author info
- ✅ Professional avatar display
- ✅ Contact information
- ✅ Social media integration
- ✅ Expertise showcase
- ✅ Latest articles grid
- ✅ Responsive design
- ✅ SEO optimization

## 🚀 Adding New Authors

Untuk menambah author baru, update array `authors` di kedua file:

```javascript
const authors = [
  {
    slug: 'admin',
    name: 'Hilal Technologic',
    // ... existing data
  },
  {
    slug: 'new-author',
    name: 'New Author Name',
    bio: 'Author bio...',
    avatar: '/images/team/new-author.webp',
    email: 'author@example.com',
    website: 'https://author-website.com',
    social: {
      twitter: 'https://twitter.com/author',
      github: 'https://github.com/author'
    },
    expertise: ['Skill 1', 'Skill 2'],
    joinDate: '2025-01-01',
    location: 'Location'
  }
];
```

## 📁 File Structure

```
src/pages/author/
├── index.astro          # Author listing page
└── [slug].astro         # Dynamic author profile

public/images/team/
├── hilal-avatar.webp    # Author avatars
└── default-avatar.webp  # Fallback avatar
```

## 🎨 Styling Classes

### Key CSS Classes
- `.line-clamp-2` - Text truncation untuk preview
- `.aspect-video` - Aspect ratio untuk gambar artikel
- `.group` - Hover effects untuk cards
- `.transition-*` - Smooth animations

### Color Scheme
- **Blue** (`blue-600`) - Primary actions dan links
- **Green** (`green-600`) - Expertise count
- **Purple** (`purple-600`) - Years experience
- **Gray** - Text dan backgrounds

## 🔧 Customization

### Avatar Images
- **Recommended size:** 200x200 pixels
- **Format:** WebP untuk optimal performance
- **Fallback:** default-avatar.webp

### Social Links
Mudah ditambah/dikurangi di object `social`:

```javascript
social: {
  twitter: 'https://twitter.com/username',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  youtube: 'https://youtube.com/@username',
  instagram: 'https://instagram.com/username' // New platform
}
```

### Expertise Tags
Warna dan styling bisa dikustomisasi:

```css
.expertise-tag {
  @apply px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium;
}
```

## 📈 Analytics Integration

Author pages sudah terintegrasi dengan Google Analytics untuk tracking:
- Page views per author
- Click tracking pada social links
- Engagement metrics
- Author popularity

## 🔗 Navigation Integration

Author pages terintegrasi dengan navigasi website:
- Link dari artikel ke author profile
- Breadcrumb navigation
- Related authors suggestions

---

> Author pages system memberikan platform yang profesional untuk showcase tim penulis dan membangun kredibilitas website.
