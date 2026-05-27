# INBA/PNBA Mountain States - Deployment Guide

## Overview
This guide covers the deployment process for the INBA/PNBA Mountain States website.

## Prerequisites
- Git repository access
- Web server or hosting platform
- Domain name (optional)

## Deployment Steps

### 1. Build Process
```bash
# Compile SCSS to CSS
sass src/styles/main.scss src/assets/css/style.css

# Minify CSS for production
sass src/styles/main.scss src/assets/css/style.css --style compressed

# Minify JavaScript
# (Add minification process if needed)
```

### 2. File Structure for Production
```
project-root/
├── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── pages/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   └── styles/
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
└── docs/
```

### 3. Hosting Options

#### Option A: Static Hosting (Recommended)
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Automatic deployments from Git
- **Vercel**: Fast static site hosting
- **AWS S3**: Scalable static hosting

#### Option B: Traditional Web Hosting
- Upload all files to web server
- Ensure proper file permissions
- Configure web server for SPA routing

### 4. GitHub Pages Deployment (staging / preview)

**Live URL:** [https://dev-pipeline-145.github.io/INBA-PNBA-mountain-states/](https://dev-pipeline-145.github.io/INBA-PNBA-mountain-states/)

This repo uses a GitHub Actions workflow (`.github/workflows/pages.yml`) to publish the static site. Pushes to `main` or `sh/updates` trigger a deploy.

#### One-time setup (repo admin)

1. Open [repository Settings → Pages](https://github.com/Dev-Pipeline-145/INBA-PNBA-mountain-states/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push this repo (or merge your branch into `main`).

#### Deploy updates

```bash
git add .
git commit -m "Your message"
git push origin main   # or sh/updates
```

Check progress under the repo’s **Actions** tab. The site usually updates within 1–2 minutes after the workflow succeeds.

#### Notes

- `.nojekyll` at the project root tells GitHub not to run Jekyll (avoids issues with paths and assets).
- Use **relative** links (`index.html`, `../index.html`), not root-absolute paths (`/`), so links work under the project subpath.
- The shop’s `/api/process-payment` endpoint requires the Node server (`server.js`); checkout will not work on GitHub Pages alone.

### 5. Netlify Deployment
1. Connect GitHub repository to Netlify
2. Set build command: `sass src/styles/main.scss src/assets/css/style.css`
3. Set publish directory: `.` (root)
4. Deploy automatically on git push

### 6. Environment Variables
No environment variables required for this static site.

### 7. Domain Configuration
- Point domain to hosting provider
- Configure SSL certificate
- Set up redirects if needed

### 8. Post-Deployment Checklist
- [ ] Test all pages load correctly
- [ ] Verify all images display
- [ ] Check form functionality
- [ ] Test responsive design
- [ ] Validate HTML/CSS
- [ ] Check page load speeds
- [ ] Test cross-browser compatibility

### 9. Monitoring
- Set up Google Analytics
- Monitor page load times
- Check for broken links
- Monitor form submissions

### 10. Updates
- Make changes in development
- Test locally
- Commit and push to main branch
- Verify deployment

## Troubleshooting

### Common Issues
1. **404 Errors**: Check file paths and case sensitivity
2. **CSS Not Loading**: Verify CSS file paths and compilation
3. **Images Not Displaying**: Check image paths and file permissions
4. **Forms Not Working**: Ensure JavaScript is loading correctly

### Support
For deployment issues, contact the development team or check the project documentation.
