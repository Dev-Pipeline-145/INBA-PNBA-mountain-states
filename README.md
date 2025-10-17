# INBA/PNBA Mountain States Website

## Project Overview

A professional, responsive web application for showcasing natural bodybuilding competitions across Utah, Colorado, and the Mountain States region. This platform provides event information, competitor registration, results tracking, and community resources for natural bodybuilding athletes, fans, trainers, and sponsors.

**Design Theme**: Dark mode with futuristic cyberpunk aesthetic featuring cyan and purple accents.

---

## Table of Contents

1. [Project Goals](#project-goals)
2. [Target Audience](#target-audience)
3. [Design System](#design-system)
4. [Technical Requirements](#technical-requirements)
5. [Site Structure](#site-structure)
6. [Page Requirements](#page-requirements)
7. [Component Library](#component-library)
8. [Development Guidelines](#development-guidelines)
9. [Deliverables](#deliverables)

---

## Project Goals

### Purpose
- Showcase natural bodybuilding shows in Utah, Colorado, and surrounding areas
- Provide detailed information about upcoming competitions, schedules, and venues
- Highlight sponsors, trainers, and support resources for natural bodybuilding athletes
- Streamline competitor registration and event management

### Key Objectives
- Create an energetic, professional, and athletic brand presence with dark mode design
- Provide clean navigation between events and resources
- Build a supportive community around natural bodybuilding
- Enable easy registration and check-in processes
- Showcase champion achievements and success stories with interactive elements

---

## Target Audience

1. **Primary**: Competitive bodybuilders seeking local and regional shows
2. **Secondary**: Bodybuilding fans and event supporters
3. **Tertiary**: Trainers, coaches, gyms, and sponsors
4. **Quaternary**: Event organizers and promoters

---

## Design System

### Brand Identity

#### Tone & Style
- **Energetic**: Dynamic layouts, bold typography, action-oriented CTAs, neon glow effects
- **Professional**: Organized information architecture, clean code, modern dark UI
- **Athletic**: Strong visual presence, competition-focused content, powerful imagery
- **Futuristic**: Cyberpunk aesthetic with glowing accents, gradients, and interactive elements

#### Color Palette

```scss
// Primary Colors - Cyan
$primary-cyan: #00FFFF;           // RGB(0, 255, 255) - Electric Cyan
$primary-dark: #00B8B8;           // Darker cyan for hover states
$primary-light: #5AFFFF;          // Lighter cyan for highlights

// Secondary Colors - Purple
$secondary-purple: #9D4EDD;       // RGB(157, 78, 221) - Vibrant Purple
$secondary-dark: #7B2CBF;         // Darker purple
$secondary-light: #C77DFF;        // Lighter purple

// Dark Mode Backgrounds
$bg-dark: #0a0a0a;                // Deep black background
$bg-dark-secondary: #141414;      // Secondary dark (sections)
$bg-dark-elevated: #1e1e1e;       // Elevated elements (header, footer)
$bg-dark-card: #1a1a1a;           // Card backgrounds

// Text Colors
$text-primary: #ffffff;           // Primary text (headings, important content)
$text-secondary: #b0b0b0;         // Secondary text (body copy)
$text-muted: #808080;             // Muted text (labels, meta info)

// Border Colors
$border-dark: #2a2a2a;            // Subtle borders
$border-medium: #404040;          // Medium emphasis borders

// Accent Colors
$success: #00ff88;                // Bright neon green (badges, success states)
$accent-gold: #ffd700;            // Gold (champions, awards)
$accent-pink: #FF006E;            // Hot pink (optional highlights)
```

#### Typography

```scss
// Font Families
$font-heading: 'Montserrat', sans-serif;    // Headers (Black/900 weight)
$font-body: 'Roboto', sans-serif;           // Body text (Regular/400)

// Font Weights
$weight-light: 300;
$weight-regular: 400;
$weight-medium: 500;
$weight-bold: 700;
$weight-black: 900;

// Heading Styles
// All headings: UPPERCASE, letter-spacing: 0.5px-1px, weight: 900
// Cyan color with neon glow text-shadow effects
```

#### Spacing System

```scss
$spacing-xs: 8px;
$spacing-sm: 16px;
$spacing-md: 24px;
$spacing-lg: 32px;
$spacing-xl: 48px;
$spacing-xxl: 64px;
```

#### Design Elements
- **Bold borders**: 3-5px solid borders with neon glow effects
- **Gradients**: Cyan to purple gradients throughout
- **Box shadows**: Glowing shadows using rgba(0, 255, 255, 0.x) and rgba(157, 78, 221, 0.x)
- **Sharp corners**: Border-radius at 0 for sharp, athletic look (except badges and social icons)
- **Uppercase headings**: All major headings in uppercase with letter-spacing
- **Neon effects**: Text-shadow and box-shadow for glowing cyberpunk aesthetic
- **Animations**: Hover effects with transform, scale, and glow transitions
- **Interactive elements**: Stats reveal, action buttons fade in, pulse animations

---

## Technical Requirements

### File Structure

```
project-root/
│
├── index.html ✅ (COMPLETE - Dark Mode with Cyan/Purple theme)
│
├── pages/
│   ├── shows/
│   │   ├── utah-state-naturals.html
│   │   ├── colorado-rapids.html
│   │   ├── red-rock.html
│   │   └── night-of-champions.html
│   │
│   ├── champions.html
│   ├── results.html
│   └── contact.html
│
├── assets/
│   ├── images/
│   │   ├── heroes/
│   │   ├── shows/
│   │   ├── champions/
│   │   ├── logos/
│   │   └── icons/
│   │
│   ├── videos/
│   │   └── (training montages, event highlights)
│   │
│   ├── css/
│   │   └── style.css (compiled from SCSS)
│   │
│   ├── scss/
│   │   ├── abstracts/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _functions.scss
│   │   │
│   │   ├── base/
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── _utilities.scss
│   │   │
│   │   ├── components/
│   │   │   ├── _buttons.scss
│   │   │   ├── _nav.scss
│   │   │   ├── _hero.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _feature-list.scss
│   │   │   ├── _show-list.scss
│   │   │   ├── _champion.scss
│   │   │   └── _trainer.scss
│   │   │
│   │   ├── layout/
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _section.scss
│   │   │   └── _container.scss
│   │   │
│   │   ├── pages/
│   │   │   ├── _home.scss
│   │   │   ├── _shows.scss
│   │   │   ├── _champions.scss
│   │   │   ├── _results.scss
│   │   │   └── _contact.scss
│   │   │
│   │   └── main.scss (imports all partials)
│   │
│   └── js/
│       └── main.js
│
└── README.md
```

### Responsive Breakpoints (Mobile-First)

```scss
$breakpoint-mobile: 320px;        // Base styles
$breakpoint-mobile-lg: 480px;     
$breakpoint-tablet: 768px;        // Tablet landscape
$breakpoint-desktop: 1024px;      // Desktop
$breakpoint-desktop-lg: 1280px;   // Large desktop
$breakpoint-desktop-xl: 1440px;   // Extra large
```

### Coding Standards

#### HTML
- Use semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- **No inline styles, no inline JavaScript, no inline comments**
- Descriptive alt attributes for all images
- ARIA labels for accessibility
- SEO-friendly meta tags
- HTML comments for placeholder images/videos

#### SCSS
- **BEM naming convention** (Block__Element--Modifier)
- Mobile-first approach
- Maximum nesting depth: 3 levels
- Use variables, mixins, and functions
- Modular partials structure
- Compile to single minified CSS file

#### JavaScript
- External file only (`/assets/js/main.js`)
- Unobtrusive event listeners
- No inline JavaScript in HTML
- Minimal, clean, and readable code

#### Accessibility
- WCAG 2.1 Level AA compliant
- Color contrast ratio minimum 4.5:1 (verified for dark mode)
- Keyboard navigation support
- Focus indicators on interactive elements
- Proper form labels
- Video with autoplay must be muted

---

## Site Structure

### Navigation Menu

```
Home
Shows (Dropdown)
  ├── Utah State Naturals
  ├── Colorado Rapids
  ├── Red Rock
  └── Utah's Night of Champions
Champions
Results
Contact
[Register Now Button - Primary CTA]
```

### Pages to Build

1. **index.html** ✅ (Complete - Dark mode with interactive elements)
2. **pages/shows/utah-state-naturals.html**
3. **pages/shows/colorado-rapids.html**
4. **pages/shows/red-rock.html**
5. **pages/shows/night-of-champions.html**
6. **pages/champions.html**
7. **pages/results.html**
8. **pages/contact.html**

---

## Page Requirements

### 1. Home Page (index.html) ✅

**Status**: Complete and approved - Dark mode design with cyan/purple theme

**Sections**:
- Hero with gym background image and gradient overlay
- Why Natural Bodybuilding (4 features with subtle background images)
- Upcoming Shows (list format with show images)
- Recent Champions (video background with interactive cards)
- Featured Trainers (with trainer photos)
- CTA Section with training background
- Footer

**Key Features Implemented**:
- Dark mode throughout (#0a0a0a background)
- Cyan (#00FFFF) and Purple (#9D4EDD) color scheme
- Neon glow effects on interactive elements
- Image placeholders throughout (12 total)
- Video background on champions section
- Interactive champion cards with:
  - Hover effects (lift, scale, glow)
  - Animated champion badges
  - Stats reveal on hover
  - Action buttons fade in
  - Social media icons
  - Centered text layout
- Mobile responsive navigation
- Smooth animations and transitions

---

### 2. Show Detail Pages (Template for all 4 shows)

**File Pattern**: `pages/shows/[show-name].html`

#### Shows to Create:
1. **Utah State Naturals** - Springville, UT (May)
2. **Colorado Rapids** - Colorado (TBD)
3. **Red Rock** - St. George, UT (October)
4. **Utah's Night of Champions** - Syracuse, UT (November/December)

#### Required Sections:

**Hero Section**
- Show name and tagline
- Location and venue
- Date
- Dramatic background image with dark overlay
- Cyan/purple gradient accents

**Show Image Gallery**
- Venue photos
- Past event highlights
- Competition action shots

**Quick Facts Box**
- Registration deadline
- Venue address
- Show time
- Contact information
- Dark card with cyan border

**Event Services**
- **Hair Services**: Stylist name, booking info, pricing
- **Makeup Services**: Artist name, portfolio, booking
- **Host Hotel**: Name, address, group rate code, amenities, booking deadline
- **Show Tanner**: Official tanner, application times, pricing
- **Show Sponsors**: Logo grid with sponsor names and links

**Event Schedule**
- Friday: Check-in times, tanning services
- Saturday: Prejudging, finals, awards
- Important events to not miss
- Timeline visualization

**Competition Divisions**
- Men's Bodybuilding (weight classes)
- Women's Figure
- Women's Bikini
- Men's Physique
- Classic Physique
- Masters Divisions (40+, 50+)

**Last Year's Champions**
- Overall winners by division
- Photos and achievements
- Reigning champion spotlight
- Use same interactive card design as homepage

**All Natural Section**
- INBA/PNBA drug testing protocols
- Banned substances information
- Natural athlete commitment
- Testing process overview

**Support Our Athletes**
- Sponsorship opportunities
- Community involvement
- How to help

**Local Trainers**
- Featured prep coaches in the area
- Specialties and contact info
- Trainer photos

**Registration CTA**
- Prominent "Register Now" button with glow effect
- Link to contact page with registration form

---

### 3. Champions Page

**File**: `pages/champions.html`

#### Sections:

**Hero**
- "Celebrating Natural Bodybuilding Excellence"
- Background video or image

**Filter/Sort Options**
- By show
- By division
- By year
- Interactive buttons with cyan/purple styling

**Hall of Fame**
- Multi-year champions
- Career achievements
- Special recognition section

**Recent Winners Gallery**
- Use the same interactive card design from homepage
- Filterable and sortable
- Photo galleries with winner information
- Stats on hover
- Action buttons

**Pro Card Recipients**
- Athletes who earned pro status
- Their journey and achievements
- Timeline or grid layout

**Success Stories**
- Testimonials and transformations
- Before/after photos
- Inspirational quotes
- Video testimonials (optional)

**Competition Highlights**
- Notable moments from recent shows
- Record holders
- Image/video carousel

---

### 4. Results Page

**File**: `pages/results.html`

#### Sections:

**Hero**
- "Competition Results and Archives"
- Dark background with cyan accents

**Current Year Results**
- Latest show results
- Division-by-division breakdown
- Overall winners
- Interactive tables with hover effects
- Download results PDF button

**Results Archive**
- Searchable/filterable by:
  - Year
  - Show
  - Division
  - Athlete name
- Historical data back several years
- Data tables with dark theme
- Pagination

**Statistics Dashboard**
- Total competitors by year
- Most successful athletes
- Division popularity charts
- Growth trends
- Use charts/graphs with cyan/purple colors

**Photo Galleries**
- Competition day photos
- Awards ceremonies
- Behind the scenes

---

### 5. Contact Page

**File**: `pages/contact.html`

#### Sections:

**Hero**
- "Get in Touch with INBA/PNBA Mountain States"
- Contact-themed background

**Contact Information**
- Promoter/organizer details
- Email addresses
- Phone numbers
- Mailing address
- Social media links
- Office hours
- Map embed (optional)

**Contact Form**
```html
Dark themed form with cyan accents:

Fields:
- Name* (required)
- Email* (required)
- Phone
- Subject (dropdown):
  * General Inquiry
  * Competition Question
  * Sponsorship Opportunity
  * Media Inquiry
  * Other
- Message* (required, textarea)
- Submit Button (primary cyan button with glow)

Validation:
- Client-side validation
- Error messages in red
- Success message in green
```

**Bodybuilder Registration Form** (Anchor: #register)
```html
Multi-section form with dark theme:

Personal Information Section:
- Full Name*
- Email*
- Phone*
- Date of Birth*
- City/State*
- Profile Photo Upload

Competition Information Section:
- Show Selection* (dropdown of 4 shows)
- Division* (dropdown):
  * Men's Bodybuilding
  * Women's Figure
  * Women's Bikini
  * Men's Physique
  * Classic Physique
  * Masters 40+
  * Masters 50+
- Weight Class (if applicable)
- Previous Competition Experience (textarea)
- Pro Card Status (yes/no)

Optional Information Section:
- Trainer Name
- Gym/Training Facility
- Instagram Handle
- Facebook Profile
- Website
- How did you hear about us?

Medical Information:
- Any medical conditions to note
- Emergency contact name
- Emergency contact phone

Agreements Section:
- [ ] I agree to INBA/PNBA drug testing protocols*
- [ ] I have read and agree to competition rules*
- [ ] I acknowledge the waiver and release of liability*
- Link to full rules document

Payment Section:
- Registration fee information
- Payment method selection
- Secure payment integration (note: backend required)

Submit Button:
- Large cyan button "Complete Registration"
- Loading state
- Success/error messaging
```

**FAQ Section**
- Common questions about registration
- Show day information
- Competition rules overview
- Expandable/collapsible accordion style

---

## Component Library

### BEM Class Naming Examples

**DO** ✅
```html
<div class="show">
  <div class="show__image">
    <img src="" alt="">
  </div>
  <div class="show__content">
    <h3 class="show__title">Show Name</h3>
    <span class="show__badge show__badge--upcoming">Upcoming</span>
  </div>
</div>
```

**DON'T** ❌
```html
<div class="show">
  <div class="showImage">
    <img src="" alt="">
  </div>
  <div class="content">
    <h3 class="title">Show Name</h3>
    <span class="badge upcoming">Upcoming</span>
  </div>
</div>
```

### Reusable Components

#### Header/Navigation (Dark Mode)
```html
<header class="header">
  <nav class="nav">
    <div class="nav__brand">
      <img class="nav__logo" src="" alt="INBA/PNBA Mountain States">
    </div>
    <button class="nav__toggle">
      <span class="nav__toggle-line"></span>
      <span class="nav__toggle-line"></span>
      <span class="nav__toggle-line"></span>
    </button>
    <div class="nav__menu">
      <ul class="nav__list">
        <li class="nav__item">
          <a href="/" class="nav__link">Home</a>
        </li>
        <!-- More items -->
      </ul>
    </div>
  </nav>
</header>

<!-- Styling Notes:
- Background: var(--bg-dark-elevated)
- Border-bottom: 3px solid var(--primary-cyan)
- Links: Cyan on hover with glow effect
- Toggle lines: Cyan with glow
-->
```

#### Buttons (Cyan/Purple Theme)
```html
<!-- Primary Button (Cyan) -->
<a href="#" class="btn btn--primary">Primary Action</a>

<!-- Secondary Button (Purple) -->
<a href="#" class="btn btn--secondary">Secondary Action</a>

<!-- Large Button -->
<a href="#" class="btn btn--primary btn--lg">Register Now</a>

<!-- Styling Notes:
- Primary: Cyan background, dark text, glowing box-shadow
- Secondary: Transparent with cyan border, cyan text
- Hover: Transform, enhanced glow, color shifts
- Uppercase text, bold weight, letter-spacing
-->
```

#### Hero Section (Dark with Image)
```html
<section class="hero">
  <div class="hero__container container">
    <div class="hero__content">
      <h1 class="hero__title">Page Title</h1>
      <p class="hero__subtitle">Subtitle text</p>
      <div class="hero__actions">
        <a href="#" class="btn btn--primary btn--lg">Primary CTA</a>
        <a href="#" class="btn btn--secondary btn--lg">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>

<!-- Styling Notes:
- Background: Image with dark gradient overlay
- Cyan/purple radial gradients for depth
- White text with glowing cyan shadows on title
- Border-bottom: cyan accent
-->
```

#### Section Layout (Dark Mode)
```html
<section class="section">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Section Title</h2>
      <p class="section__subtitle">Section subtitle or description</p>
    </div>
    <!-- Section content -->
  </div>
</section>

<!-- Gray background variant -->
<section class="section section--gray">
  <!-- Content -->
</section>

<!-- Video background variant -->
<section class="section section--video">
  <video class="section__video-bg" autoplay muted loop playsinline>
    <source src="video.mp4" type="video/mp4">
  </video>
  <div class="section__video-overlay"></div>
  <div class="section__video-content container">
    <!-- Content -->
  </div>
</section>

<!-- Styling Notes:
- Default: var(--bg-dark)
- Gray: var(--bg-dark-secondary)
- Title: Cyan color with underline accent (gradient)
- Subtitle: Secondary text color
-->
```

#### Champion Card (Interactive)
```html
<article class="champion">
  <div class="champion__image-wrapper">
    <div class="champion__image">
      <!-- Photo -->
    </div>
    <span class="champion__badge">Champion</span>
    <div class="champion__stats">
      <div class="champion__stat">
        <div class="champion__stat-label">Division</div>
        <div class="champion__stat-value">Figure</div>
      </div>
      <div class="champion__stat">
        <div class="champion__stat-label">Year</div>
        <div class="champion__stat-value">2025</div>
      </div>
    </div>
  </div>
  <div class="champion__content">
    <h3 class="champion__name">Name</h3>
    <p class="champion__title">Title</p>
    <p class="champion__show">Show Name</p>
    <blockquote class="champion__quote">"Quote"</blockquote>
  </div>
  <div class="champion__actions">
    <a href="#" class="champion__link">View Profile</a>
    <div class="champion__social">
      <a href="#" class="champion__social-link">📷</a>
      <a href="#" class="champion__social-link">f</a>
    </div>
  </div>
</article>

<!-- Interactive Features:
- Hover: Lift, scale, enhanced glow
- Badge: Pulse animation (gold)
- Stats: Reveal on hover (slide up)
- Actions: Fade in on hover
- Image: Zoom on hover
- Centered text layout
-->
```

#### Show Card with Image
```html
<article class="show">
  <div class="show__image">
    <!-- Venue/event image -->
  </div>
  <div class="show__content">
    <div class="show__header">
      <div class="show__info">
        <h3 class="show__title">Show Name</h3>
        <p class="show__location">Location</p>
        <p class="show__date">Date</p>
      </div>
      <span class="show__badge">Upcoming</span>
    </div>
    <p class="show__description">Description</p>
    <a href="#" class="btn btn--primary">Learn More</a>
  </div>
</article>

<!-- Styling Notes:
- Image: 220px height with gradient overlay
- Border-left: Cyan (5px) with animated gradient on hover
- Badge: Green with glow
- Dark card background
-->
```

#### Footer (Dark Mode)
```html
<footer class="footer">
  <div class="container">
    <div class="footer__main">
      <div class="footer__brand">
        <img class="footer__logo" src="" alt="">
        <p class="footer__brand-text">Description</p>
      </div>
      <div class="footer__links">
        <div class="footer__column">
          <h4 class="footer__column-title">Column Title</h4>
          <ul class="footer__list">
            <li class="footer__list-item">
              <a href="#" class="footer__link">Link</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2025 INBA/PNBA Mountain States</p>
      <ul class="footer__legal">
        <li class="footer__legal-item">
          <a href="#" class="footer__link">Privacy</a>
        </li>
      </ul>
    </div>
  </div>
</footer>

<!-- Styling Notes:
- Background: var(--bg-dark-elevated)
- Border-top: 4px cyan
- Column titles: Cyan with glow
- Links: Hover shifts left, cyan glow
- Social icons: Gradient cyan/purple with glow
-->
```

---

## Development Guidelines

### Phase 1: Setup
1. Create file structure as outlined
2. Set up SCSS compilation workflow
3. Create SCSS partial files with dark mode variables
4. Build reusable component SCSS files with neon effects

### Phase 2: Page Development
1. Use `index.html` as the styling reference (dark mode, cyan/purple)
2. Build show detail pages (use template approach with images)
3. Build champions page (interactive cards)
4. Build results page (data tables)
5. Build contact page (forms with validation)

### Phase 3: Media Integration
1. Add hero images to all pages
2. Add section background images/videos
3. Optimize all images for web
4. Test video autoplay across devices
5. Ensure proper fallbacks

### Phase 4: Interactivity
1. Implement hover effects and animations
2. Add form validation
3. Test mobile navigation
4. Verify all interactive elements work
5. Add loading states where needed

### Phase 5: Testing & Optimization
1. Test responsive behavior at all breakpoints
2. Validate HTML (W3C validator)
3. Check accessibility (WAVE, Lighthouse)
4. Test dark mode contrast ratios
5. Optimize images and videos
6. Minify CSS and JS
7. Cross-browser testing
8. Performance testing (aim for <3s load)

### Phase 6: Documentation
1. Document component usage
2. Create style guide
3. Deployment instructions
4. Custom JavaScript functionality notes

---

## Content Guidelines

### Writing Style
- Active voice
- Clear, concise sentences
- Industry terminology explained when necessary
- Motivational and supportive tone
- Action-oriented CTAs
- Professional yet energetic

### Image Requirements
- **Hero images**: Minimum 1920px width, gym/fitness themed
- **Show images**: 800px width minimum, venue/competition photos
- **Champion photos**: 400px square minimum, professional athlete shots
- **Trainer photos**: 600px width minimum, professional headshots
- **Background images**: High resolution, dark/moody atmosphere
- **Format**: WebP with JPG fallback preferred
- **Optimization**: Compressed for web (under 500KB for heroes)
- **Style**: Professional quality, diverse representation

### Video Requirements
- **Background videos**: 1920x1080 minimum, compressed (under 5MB)
- **Format**: MP4 (H.264 codec)
- **Length**: 10-30 seconds looping
- **Content**: Gym training, competition action, motivational
- **Audio**: Muted (autoplay requirement)
- **Fallback**: Poster image for non-supporting browsers

### SEO Best Practices
- Unique page titles (50-60 characters)
- Meta descriptions (150-160 characters)
- Descriptive alt text for images
- Semantic HTML structure
- Internal linking between pages
- Schema markup for events (optional enhancement)
- Dark mode considerations in meta tags

---

## Key Features to Implement

### Navigation
- Sticky header with dark background on scroll
- Mobile hamburger menu with smooth animation
- Dropdown submenu for Shows with dark theme
- Active state for current page (cyan highlight)
- Smooth scroll for anchor links
- Glowing cyan toggle lines

### Interactive Elements
- Hover effects on buttons, links, cards (glow, lift, scale)
- Form validation (client-side with error styling)
- Smooth transitions and animations (0.3-0.4s)
- Image zoom on hover
- Stats reveal animations
- Action buttons fade in
- Pulse animations on badges
- Video background with overlay

### Forms
- Contact form with validation
- Registration form with multi-step approach
- Dark theme styling
- Cyan accent colors
- Success/error messaging with appropriate colors
- Proper label associations
- Loading states

### Visual Effects
- Neon glow on interactive elements
- Gradient overlays (cyan to purple)
- Text shadows for depth
- Box shadows for elevation
- Transform animations
- Backdrop blur effects
- Pulse keyframe animations

---

## Testing Checklist

### Functionality
- [ ] All internal links work correctly
- [ ] External links open in new tab
- [ ] Mobile navigation toggles properly
- [ ] Dropdown menus function on hover/click
- [ ] Forms validate correctly
- [ ] All buttons have proper hover states with glow
- [ ] Interactive elements respond to touch
- [ ] Videos autoplay muted
- [ ] Champion cards reveal stats on hover
- [ ] Action buttons fade in properly

### Responsive Design
- [ ] Mobile (320px-767px): Content stacks, readable text, functional nav
- [ ] Tablet (768px-1023px): Optimized layouts, multi-column grids
- [ ] Desktop (1024px+): Full-width layouts, horizontal champion cards
- [ ] No horizontal scrolling at any breakpoint
- [ ] Images scale appropriately
- [ ] Videos responsive
- [ ] Hover effects work on touch devices

### Dark Mode Specific
- [ ] Text contrast meets WCAG AA standards
- [ ] Cyan (#00FFFF) visible on dark backgrounds
- [ ] Purple (#9D4EDD) visible on dark backgrounds
- [ ] Gold accents readable
- [ ] Glow effects enhance readability
- [ ] Form inputs have proper dark styling
- [ ] Borders visible but not harsh

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible (cyan glow)
- [ ] ARIA labels present
- [ ] Alt text on all images
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] Form labels properly associated
- [ ] Videos have captions (if dialogue present)
- [ ] Skip navigation links

### Performance
- [ ] Page load time under 3 seconds
- [ ] Images optimized and compressed
- [ ] Videos compressed appropriately
- [ ] CSS and JS minified
- [ ] No console errors
- [ ] Smooth 60fps animations
- [ ] Lazy loading implemented (optional)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Video autoplay works across browsers
- [ ] CSS gradients render correctly
- [ ] Neon glow effects display properly

---

## Deliverables

### Required Files
1. `index.html` ✅ (Complete - Dark mode with cyan/purple theme)
2. All page HTML files (7 additional pages)
3. Compiled `style.css` from SCSS
4. `main.js` with navigation and interactive functionality
5. SCSS source files (all partials organized by category)
6. Image assets (or specifications for each)
7. Video assets (or specifications)
8. This README documentation

### Optional
- Video assets (or specifications)
- Additional documentation
- Style guide reference
- Deployment configuration files

---

## Quick Start Guide

### 1. Project Setup
```bash
# Clone the repository
git clone <repository-url>
cd inba-pnba-mountain-states

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. File Structure Creation
```bash
# Create main directories
mkdir -p pages/shows assets/{css,js,images/{logos,champions,trainers,shows,backgrounds},videos} components styles/{abstracts,base,layout,components,pages}

# Create SCSS partials
touch styles/abstracts/{_variables.scss,_mixins.scss,_functions.scss}
touch styles/base/{_reset.scss,_typography.scss,_utilities.scss}
touch styles/layout/{_header.scss,_footer.scss,_section.scss,_container.scss}
touch styles/components/{_buttons.scss,_nav.scss,_hero.scss,_forms.scss,_feature-list.scss,_show-list.scss,_champion.scss,_trainer.scss}
touch styles/pages/{_home.scss,_shows.scss,_champions.scss,_results.scss,_contact.scss}
touch styles/main.scss
```

### 3. Development Workflow
```bash
# Watch SCSS changes
npm run watch:scss

# Build for production
npm run build

# Serve locally
npm run serve
```

---

## Component Usage Examples

### Creating a New Show Page
1. Copy `pages/shows/template.html`
2. Update show-specific content
3. Add show images to `assets/images/shows/`
4. Update navigation menu
5. Test responsive behavior

### Adding a New Champion
1. Add champion data to JSON file
2. Create champion card using existing component
3. Add champion photo to `assets/images/champions/`
4. Update champions page

### Customizing Colors
1. Update variables in `styles/abstracts/_variables.scss`
2. Recompile SCSS
3. Test contrast ratios
4. Update documentation

---

## Deployment Checklist

### Pre-Deployment
- [ ] All pages tested and functional
- [ ] Images optimized and compressed
- [ ] CSS and JS minified
- [ ] No broken links
- [ ] Mobile responsive verified
- [ ] Dark mode contrast checked
- [ ] Forms validated
- [ ] Performance optimized

### Post-Deployment
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Videos autoplay (muted)
- [ ] Forms submit successfully
- [ ] Mobile navigation works
- [ ] Cross-browser compatibility verified
- [ ] Analytics tracking implemented (if applicable)

---

## Support & Maintenance

### Regular Updates
- **Monthly**: Check for broken links, update show information
- **Quarterly**: Review and update champion profiles
- **Annually**: Refresh images, update content, review design

### Content Management
- Show information stored in JSON format for easy updates
- Champion profiles maintained in structured data
- Trainer directory regularly verified for accuracy
- Image assets organized by category and date

### Technical Maintenance
- Monitor page load speeds
- Update dependencies regularly
- Test new browser versions
- Maintain accessibility standards
- Backup content and assets

---

## Contact Information

**Project**: INBA/PNBA Mountain States Website  
**Design System**: Dark Mode with Cyan/Purple Theme  
**Last Updated**: January 2025  
**Version**: 1.0  

For questions about implementation, customization, or maintenance, refer to this documentation or contact the development team.

---

**Built with ❤️ for the natural bodybuilding community**

*This README serves as the complete guide for building and maintaining the INBA/PNBA Mountain States website. Follow the guidelines, use the provided components, and maintain the dark mode aesthetic with cyan and purple accents throughout the development process.*