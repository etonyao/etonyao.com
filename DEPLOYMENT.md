# Deployment Guide: Vercel + IONOS Domain

This guide will walk you through deploying your portfolio to Vercel and connecting your IONOS domain.

## Part 1: Deploy to Vercel

### Step 1: Push Your Code to GitHub

1. Make sure you're in the portfolio directory:
   ```bash
   cd /Users/etonyao/portfolio
   ```

2. Your project already has Git initialized. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it something like "portfolio" or "personal-website"
   - Don't initialize with README (already exists)
   - Click "Create repository"

3. Connect your local project to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up/login (use your GitHub account)

2. Click "Add New..." → "Project"

3. Import your GitHub repository:
   - You'll see your "portfolio" repository
   - Click "Import"

4. Configure your project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)
   - Click "Deploy"

5. Wait for deployment (usually 1-2 minutes)
   - You'll get a URL like: `your-portfolio.vercel.app`
   - Your site is now live!

## Part 2: Connect Your IONOS Domain

### Step 1: Get Your Vercel Nameservers (Recommended Method)

1. In your Vercel dashboard, click on your deployed project

2. Go to "Settings" → "Domains"

3. Enter your IONOS domain (e.g., `yourdomain.com`)

4. Vercel will provide you with DNS settings. You have two options:

#### Option A: Using Nameservers (Recommended - Easier)

Vercel will show you nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: Using A Records

Vercel will show you:
```
A Record: 76.76.21.21
```

### Step 2: Configure IONOS DNS

1. Log in to your IONOS account at https://my.ionos.com/

2. Go to "Domains & SSL" → Click on your domain

3. Click "DNS" or "DNS Settings"

#### If Using Nameservers (Option A - Recommended):

4. Look for "Nameserver Settings" or "Use Custom Nameservers"

5. Change from IONOS nameservers to Vercel nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

6. Save changes

#### If Using A Records (Option B):

4. Add/Edit DNS Records:
   - **A Record for root domain:**
     - Type: A
     - Host: @ (or leave blank for root)
     - Value: `76.76.21.21`
     - TTL: 3600

   - **CNAME for www:**
     - Type: CNAME
     - Host: www
     - Value: cname.vercel-dns.com
     - TTL: 3600

5. Save changes

### Step 3: Verify in Vercel

1. Go back to Vercel → Settings → Domains

2. Your domain should show "Valid Configuration" (may take a few minutes)

3. Enable "Redirect www to apex domain" or vice versa (your preference)

4. Vercel will automatically provision an SSL certificate (HTTPS)

### Step 4: Wait for DNS Propagation

- DNS changes can take 1-48 hours to fully propagate worldwide
- Usually works within 15 minutes to a few hours
- Test your domain: `https://yourdomain.com`

## Part 3: Customize Your Portfolio

Edit these files in `/Users/etonyao/portfolio`:

### 1. Update Personal Information (`app/page.tsx`)

Replace placeholder text:
- "Your Name" → Your actual name
- "[your role]" → e.g., "Full-Stack Developer"
- Update email, GitHub, LinkedIn links
- Add your projects
- Update skills

### 2. Update Metadata (`app/layout.tsx`)

Change:
- Title: "Your Name - Portfolio"
- Description: Your personal description

### 3. Add Your Projects

In `app/page.tsx`, replace the placeholder project cards with real projects:
```tsx
{[
  {
    title: "Project Name",
    description: "What it does",
    link: "https://project-url.com",
    github: "https://github.com/you/project"
  }
].map((project) => (
  // ... project card JSX
))}
```

## Part 4: Deploy Updates

Every time you make changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Vercel automatically deploys your changes when you push to GitHub!

## Troubleshooting

### Domain not working?

1. Check DNS settings in IONOS
2. Verify domain in Vercel dashboard
3. Wait longer (DNS can take up to 48 hours)
4. Try incognito/private browsing
5. Clear browser cache

### Build failing on Vercel?

1. Check build logs in Vercel dashboard
2. Make sure your code works locally: `npm run build`
3. Check for TypeScript errors
4. Ensure all dependencies are in package.json

### SSL/HTTPS not working?

- Vercel automatically provisions SSL
- If using A records, make sure you added the CNAME for verification
- Wait a few hours for certificate issuance

## Testing Your Setup

1. **Local development:**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

2. **Production build test:**
   ```bash
   npm run build
   npm start
   ```

3. **Live site:**
   - Vercel URL: `https://your-portfolio.vercel.app`
   - Your domain: `https://yourdomain.com`

## Next Steps

- [ ] Customize all placeholder content
- [ ] Add your real projects
- [ ] Add your profile photo
- [ ] Set up analytics (Vercel Analytics)
- [ ] Add a blog section (optional)
- [ ] Connect Google Search Console
- [ ] Add OG images for social sharing

## Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- IONOS DNS Help: https://www.ionos.com/help/domains/
- Vercel Support: https://vercel.com/support
