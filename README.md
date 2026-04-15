# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 16 and Tailwind CSS.

## Features

- Clean, professional design
- Fully responsive (mobile, tablet, desktop)
- Dark mode support
- Sections: Hero, About, Projects, Contact
- SEO optimized
- Fast page loads with Next.js
- Easy to customize

## Getting Started

### Development

1. Install dependencies (already done):
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to see your portfolio

### Customize Your Content

1. **Update personal info** in `app/page.tsx`:
   - Your name
   - Your role/title
   - About section
   - Skills
   - Projects
   - Contact links (email, GitHub, LinkedIn)

2. **Update site metadata** in `app/layout.tsx`:
   - Page title
   - Description

3. **Add project images**:
   - Place images in `/public` folder
   - Update image sources in project cards

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions on:
- Deploying to Vercel
- Connecting your IONOS domain
- Setting up HTTPS/SSL
- Troubleshooting

Quick deploy:
```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically deploy your changes!

## Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel
- **Domain:** IONOS

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx        # Main portfolio page
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles
├── public/             # Static assets
├── DEPLOYMENT.md       # Deployment guide
└── package.json
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [IONOS DNS Settings](https://www.ionos.com/help/domains/)
