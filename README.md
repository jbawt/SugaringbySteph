# Sugaring by Steph

A beautiful, responsive website for Sugaring by Steph - a natural, organic hair removal business.

## Tech Stack

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Netlify** - Hosting and form handling

## Features

- 5 responsive pages: Home, Services, About, FAQ, Contact
- Mobile-friendly navigation with hamburger menu
- Contact form with Netlify Forms integration
- SEO-optimized with meta tags
- Gold/cream color palette matching brand guidelines
- Smooth scroll and page transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd sugaring-by-steph
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
sugaring-by-steph/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation with mobile menu
│   │   ├── Footer.jsx      # Site footer
│   │   ├── ServiceCard.jsx # Reusable service pricing card
│   │   └── FAQItem.jsx     # Expandable FAQ accordion item
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Services.jsx    # Service listings with pricing
│   │   ├── About.jsx       # About Steph page
│   │   ├── FAQ.jsx         # Frequently asked questions
│   │   └── Contact.jsx     # Contact form
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml            # Netlify configuration
└── README.md
```

## Deployment to Netlify

### Option 1: Git-based Deploy (Recommended)

1. Push this repository to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select this repository
5. Build settings will be auto-detected from `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Custom Domain Setup

After deploying to Netlify:

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter `sugaringbysteph.ca`
4. Follow the DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

## Contact Form

The contact form uses Netlify Forms for handling submissions. Form submissions can be viewed in the Netlify dashboard under Forms.

To receive email notifications:
1. Go to Site settings → Forms → Form notifications
2. Add an email notification for the "contact" form
3. Enter the email address to receive submissions

## Customization

### Colors

The color palette is defined in `tailwind.config.js`:

- **Gold**: Primary brand color (`gold-500`: #D4AF37)
- **Bronze**: Text and accents (`bronze-500`: #8B6914)
- **Cream**: Backgrounds (`cream-100`: #FAF8F5)

### Fonts

- **Cormorant Garamond**: Script/display font for headings
- **Lato**: Sans-serif font for body text

Fonts are loaded from Google Fonts in `index.html`.

### Logo

To add the actual logo:
1. Add the logo image to `public/logo.png`
2. Update the SVG placeholders in `Navbar.jsx` and `Footer.jsx`
3. Optionally add to hero section in `Home.jsx`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

Private - All rights reserved.

---

Built with ❤️ for Sugaring by Steph
