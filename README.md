# MDM Traders - Professional Communication Solutions

A modern, high-performance Next.js website for MDM Traders Limited - Bangladesh's leading provider of two-way radio, wireless, and networking solutions.

![MDM Traders](https://mdm-traders.vercel.app/Screenshot_7.png)

## 🌟 Features

### Core Features
- **Dynamic Product Catalog** - Browse Motorola Solutions & Cambium Networks products with advanced filtering
- **Product Comparison** - Compare up to 4 products side-by-side with detailed specifications
- **Project Showcase** - View completed and in-progress telecommunication projects
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **SEO Optimized** - Server-side rendering with Next.js 16 App Router
- **GSAP Animations** - Smooth, professional animations throughout the site
- **CMS Integration** - Content managed through Sanity CMS

### Pages
- **Home** - Hero section, About, Services, Projects (last 6), Partners, Clients
- **About** - Company history, Mission & Vision, Board of Directors, Activities
- **Projects** - Filterable project gallery (All/Completed/In Progress)
- **Products** - Categorized product listings with search and filters
- **Product Detail** - Comprehensive product information with related products
- **Product Comparison** - Side-by-side comparison tool (2-4 products)
- **Gallery** - Image gallery of company activities
- **Contact** - Contact form with location map

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP 3.14.2
- **Icons:** Lucide React 0.563.0
- **Forms:** React Hook Form 7.71.1
- **State Management:** Zustand 5.0.11 (for compare feature)
- **Image Carousel:** Swiper 12.1.0

### Backend/CMS
- **CMS:** Sanity.io
- **Client:** @sanity/client 7.14.1
- **Image URLs:** @sanity/image-url 2.0.3
- **Rich Text:** @portabletext/react 6.0.2
- **Content Types:**
  - Products (Motorola Solutions, Cambium Networks)
  - Projects (with status tracking)

### Typography
- **Headings:** Space Grotesk (Google Font)
- **Body Text:** Nunito Sans (Google Font)

### Performance
- **ISR:** Incremental Static Regeneration (60s revalidation)
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic with Next.js
- **React Compiler:** Enabled with Babel plugin

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account and project

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mdm-traders.git
cd mdm-traders
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=13zwx11y
NEXT_PUBLIC_SANITY_DATASET=production
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
mdm-traders/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   ├── category/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx          # Dynamic category pages
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact page
│   │   ├── gallery/
│   │   │   └── page.tsx              # Gallery page
│   │   ├── products/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Product detail page
│   │   │   └── page.tsx              # Products listing page
│   │   ├── products-compare/
│   │   │   └── page.tsx              # Product comparison page
│   │   ├── projects/
│   │   │   └── page.tsx              # Projects page
│   │   ├── favicon.ico
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── common/                   # Reusable components
│   │   │   ├── PageHeader.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductImages.tsx
│   │   │   └── SectionHeading.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── pages/                    # Page-specific components
│   │       ├── About/
│   │       │   ├── Activities.tsx
│   │       │   ├── CompanyOverview.tsx
│   │       │   ├── MissionVision.tsx
│   │       │   └── Teams.tsx
│   │       ├── Contact/
│   │       │   └── Contact.tsx
│   │       ├── Home/
│   │       │   ├── About.tsx
│   │       │   ├── Clients.tsx
│   │       │   ├── Hero.tsx
│   │       │   ├── Partners.tsx
│   │       │   ├── Projects.tsx
│   │       │   └── Services.tsx
│   │       ├── Products/
│   │       │   ├── product/
│   │       │   │   └── ProductDetail.tsx
│   │       │   ├── ProductsContent.tsx
│   │       │   ├── ProductsItems.tsx
│   │       │   └── ProductsSidebar.tsx
│   │       ├── ProductsCompare/
│   │       │   └── ProductsCompare.tsx
│   │       └── Projects/
│   │           └── ProjectsContent.tsx
│   ├── hooks/
│   │   └── useCompare.ts             # Product comparison hook (Zustand)
│   ├── lib/
│   │   ├── queries.ts                # GROQ queries for Sanity
│   │   └── sanity.ts                 # Sanity client configuration
│   └── types/
│       ├── product.ts                # Product type definitions
│       └── project.ts                # Project type definitions
├── .eslintrc.json
├── .gitignore
├── next.config.ts                     # Next.js configuration
├── package.json
├── postcss.config.mjs
├── README.md                          # This file
├── tailwind.config.ts                 # Tailwind CSS config
└── tsconfig.json                      # TypeScript config
```

## 🎨 Key Features Explained

### Product Comparison
- Add up to 4 products to compare
- Persistent comparison list using Zustand with localStorage
- Side-by-side feature comparison
- Visual indicators when limit reached
- Direct links to detailed product pages
- Clear all functionality

**Files:**
- State management: `src/hooks/useCompare.ts`
- Compare page: `src/app/products-compare/page.tsx`
- Component: `src/components/pages/ProductsCompare/ProductsCompare.tsx`

### Category System
- **Main Categories:** Motorola Solutions, Cambium Networks
- **Sub-Categories:** APX Series, Talkabout, TETRA, MOTOTRBO
- Dynamic routing: `/category/motorola-solutions/apx-series`
- URL-based filtering with clean URLs
- Breadcrumb navigation

**Files:**
- Dynamic routes: `src/app/category/[...slug]/page.tsx`
- Sidebar: `src/components/pages/Products/ProductsSidebar.tsx`

### Project Filtering
- Filter by status: All, Completed, In Progress
- GSAP scroll animations for cards
- Last 6 projects shown on homepage
- Full project listing on `/projects` page
- Status badges with color coding

**Files:**
- Home component: `src/components/pages/Home/Projects.tsx`
- Projects page: `src/app/projects/page.tsx`
- Content component: `src/components/pages/Projects/ProjectsContent.tsx`

### Typography System

**Google Fonts Configuration:**
```typescript
// In your layout or CSS
import { Space_Grotesk, Nunito_Sans } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk'
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
})
```

**Usage in Tailwind:**
- Headings: `font-grotesk`
- Body text: `font-nunito`

### Performance Optimizations
- **Image Optimization:** Next.js Image component with Sanity CDN
- **ISR (Incremental Static Regeneration):** 60-second revalidation
- **Code Splitting:** Automatic route-based splitting
- **React Compiler:** Optimized re-renders
- **GSAP Animations:** Hardware-accelerated with proper cleanup
- **Lazy Loading:** Images and components load on demand

## 🔧 Configuration

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['var(--font-grotesk)'],
        nunito: ['var(--font-nunito)'],
      },
    },
  },
}
```

### Next.js Configuration

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    reactCompiler: true,
  },
}
```

### GSAP Animations
- **Scroll Triggers:** Animations triggered on scroll
- **Hover Effects:** Smooth scale and gradient transitions
- **Stagger Animations:** Sequential element animations
- **Context Cleanup:** Proper GSAP context management

## 🗂️ Content Management

### Sanity Schemas

**Products:**
- Categories: Motorola Solutions, Cambium Networks
- Sub-categories with conditional visibility
- Multiple images with main image selection
- Rich text descriptions with formatting
- Manual sort ordering

**Projects:**
- Status tracking (Completed/In Progress)
- Contract date with formatted display
- Client and location information
- Featured image with alt text
- Optional detailed descriptions

**Query Examples:**

```typescript
// Get all products
*[_type == "product"] | order(sortOrder asc, _createdAt desc)

// Get product by slug
*[_type == "product" && slug.current == $slug][0]

// Get last 6 projects
*[_type == "project"] | order(sortOrder asc, contractDate desc) [0...6]
```

See `sanity/README.md` for complete backend documentation.

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Environment Variables**
   - Add `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Add `NEXT_PUBLIC_SANITY_DATASET`

4. **Deploy**
   - Vercel will automatically build and deploy
   - Every push to `main` triggers redeployment

### Other Platforms (Netlify, Railway, etc.)

**Build Settings:**
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+
- Environment variables: Same as above

### Manual Deployment

```bash
# Build the project
npm run build

# Test production build locally
npm start

# Deploy the .next folder to your hosting
```

## 🔒 Environment Variables

### Required Variables

```env
# Sanity Configuration (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=xxxxxxxxxxxxxxxxx

# Optional: For authenticated requests
SANITY_API_TOKEN=your_token_here
```

### Getting Sanity Credentials

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Project ID is in the project settings
4. Dataset is usually "production"

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Product filtering works
- [ ] Product comparison (add/remove/clear)
- [ ] Navigation links work
- [ ] Images load properly
- [ ] Forms submit successfully
- [ ] Responsive design on mobile/tablet
- [ ] GSAP animations run smoothly

### Common Issues

**Images not loading:**
- Check Sanity project ID in `.env.local`
- Verify image domains in `next.config.ts`

**Comparison not persisting:**
- Check browser localStorage
- Clear cache and test again

**Build failing:**
- Delete `.next` folder: `rm -rf .next`
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 📚 Dependencies

### Core Dependencies
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "typescript": "^5"
}
```

### Sanity/CMS
```json
{
  "@sanity/client": "^7.14.1",
  "@sanity/image-url": "^2.0.3",
  "@portabletext/react": "^6.0.2",
  "next-sanity": "^12.0.16"
}
```

### UI/Animations
```json
{
  "gsap": "^3.14.2",
  "lucide-react": "^0.563.0",
  "swiper": "^12.1.0"
}
```

### State/Forms
```json
{
  "zustand": "^5.0.11",
  "react-hook-form": "^7.71.1"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Coding Standards
- Use TypeScript for all new files
- Follow existing component structure
- Use Tailwind utility classes
- Add proper TypeScript types
- Clean up GSAP contexts
- Test on mobile devices

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📄 License

This project is proprietary and confidential.

© 2024 MDM Traders Limited. All rights reserved.

## 👥 Contact

**MDM Traders Limited**
- **Website:** [mdmtraders.net](https://mdmtraders.net)
- **Email:** delwar@mdmtbd.net / momen@mdmtbd.net / khalid@mdmtbd.net
- **Phone:** +880 193 244 8883
- **Telephone:** 088 02 911 5872
- **Fax:** 088 02 883 5337
- **Address:** House 1247, Road 10, Ave 02, Mirpur DOHS, Dhaka 1216, Bangladesh

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible framework
- **Sanity.io** - For the headless CMS
- **GSAP** - For smooth animations
- **Tailwind CSS** - For utility-first styling
- **Vercel** - For hosting and deployment
- **Google Fonts** - For Space Grotesk and Nunito Sans

## 📈 Future Enhancements

- [ ] Product search functionality
- [ ] Advanced filtering options
- [ ] User authentication for quotes
- [ ] Email notifications for inquiries
- [ ] Multi-language support
- [ ] Blog/News section
- [ ] Product wishlists
- [ ] Advanced analytics

---

**Built with ❤️ by MDM Traders Development Team**
