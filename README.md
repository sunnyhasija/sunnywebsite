# Sunny Hasija PhD - Personal Website

A modern, responsive academic website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📦 Deployment to GitHub Pages

### Current Setup
This website is configured for GitHub Pages deployment with the repository name "sunnywebsite".

### Deployment Steps

1. **Push your changes:**
```bash
git add .
git commit -m "Update website"
git push origin main
```

2. **GitHub Actions will automatically:**
   - Build the Next.js application
   - Export static files
   - Deploy to GitHub Pages

### Your Website URL
- Production: https://sunnyhasija.github.io/sunnywebsite
- Development: http://localhost:3000

## 🎨 Customization

### Colors
The sophisticated purple theme is defined in `tailwind.config.js`. You can adjust:
- `primary`: Main purple colors
- `secondary`: Gray/charcoal colors  
- `accent`: Violet accent colors

### Content
Main content is in `pages/index.tsx`. Key sections:
- **Hero**: Update tagline and introduction
- **About**: Modify bio and research interests
- **Research**: Add or modify research areas
- **Publications**: Add publications when ready
- **Contact**: Update contact information

### Adding Publications
When ready to add publications, modify the Publications section in `pages/index.tsx`:

```tsx
// Replace the placeholder with:
<div className="space-y-6">
  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Your Publication Title
    </h3>
    <p className="text-primary-600 mb-2">Journal Name, Year</p>
    <p className="text-gray-600 mb-4">
      Brief description or abstract excerpt...
    </p>
    <a href="your-doi-link" className="text-primary-600 hover:text-primary-700 font-medium">
      View Publication →
    </a>
  </div>
</div>
```

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📱 Features

- ✅ Fully responsive design
- ✅ Modern sophisticated purple theme
- ✅ Smooth scrolling navigation
- ✅ Mobile-first approach
- ✅ Professional academic layout
- ✅ Fast loading and SEO optimized
- ✅ Automatic deployment

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files
```

## 📞 Support

If you need help with customization or deployment, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🎯 Current Status

✅ Modern Next.js website with sophisticated purple theme
✅ Responsive design optimized for all devices
✅ Professional academic layout
✅ GitHub Pages deployment configured
✅ Job market ready content structure

## 🎯 Next Steps

1. ⏳ Customize content as needed
2. ⏳ Add publications when ready
3. ⏳ Consider adding a blog section
4. ⏳ Add CV/resume download link
5. ⏳ Consider adding Google Analytics

---

Built with ❤️ for academic and industry success