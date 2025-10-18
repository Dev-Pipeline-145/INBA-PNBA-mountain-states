# INBA/PNBA Mountain States - Code Structure

## 📁 Project Organization

```
INBA-PNBA-mountain-states/
├── index.html                          # Homepage (master template)
├── pages/                              # All page templates
│   ├── contact.html                    # Contact & registration page
│   ├── champions.html                  # Champions showcase
│   ├── results.html                    # Competition results
│   ├── shows.html                      # Shows overview
│   └── shows/                          # Individual show pages
│       ├── utah-state-naturals.html
│       ├── colorado-rapids.html
│       ├── red-rock.html
│       └── night-of-champions.html
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css              # Main stylesheet (clean architecture)
│   │   └── js/
│   │       └── main.js                # Main JavaScript (modular)
│   └── components/
│       ├── layout/
│       │   ├── header.html            # Global header component
│       │   └── footer.html            # Global footer component
│       └── forms/
│           ├── body-builder-form.html # Registration form component
│           └── contact-form.html      # Contact form component
└── docs/
    ├── README.md
    └── deployment.md
```

## 🎨 CSS Architecture

### Clean, Modular Structure
- **CSS Custom Properties**: Centralized variables for colors, spacing, typography
- **Logical Sections**: Reset, Typography, Layout, Components, Responsive
- **BEM Methodology**: Consistent naming convention
- **Mobile-First**: Responsive design approach
- **Dark Mode**: Cyberpunk theme with cyan/purple color scheme

### Key Features
- ✅ **13 organized sections** with clear comments
- ✅ **Consistent spacing system** using CSS variables
- ✅ **Reusable utility classes**
- ✅ **Smooth animations and transitions**
- ✅ **Accessibility considerations**

## 🚀 JavaScript Architecture

### Modular Design
- **Configuration Object**: Centralized settings and selectors
- **Utility Functions**: Reusable helper functions
- **Module Pattern**: Separate modules for different functionality
- **Error Handling**: Safe DOM manipulation
- **Event Delegation**: Efficient event handling

### Modules
1. **Navigation**: Mobile menu, dropdowns, smooth scrolling
2. **Forms**: Form handling and validation
3. **FAQ**: Accordion functionality
4. **Filter**: Content filtering system
5. **Sort**: Table sorting functionality

## 🧩 Component System

### Global Components
- **Header**: Consistent navigation across all pages
- **Footer**: Site-wide footer with links and social media
- **Forms**: Reusable form components

### Page Templates
- **Homepage**: Master template with hero, features, CTA
- **Contact Page**: Two-column layout with form and contact methods
- **Show Pages**: Individual competition pages with details
- **Champions/Results**: Content showcase pages

## 🔧 Maintenance Features

### Easy Updates
- **Global Changes**: Update homepage to affect all pages
- **Consistent Styling**: All pages use same CSS variables
- **Modular JavaScript**: Easy to add/remove functionality
- **Clean Code**: Well-documented and organized

### Best Practices
- ✅ **Semantic HTML5** structure
- ✅ **Accessibility** considerations (ARIA labels, keyboard navigation)
- ✅ **Performance** optimized (minified CSS, efficient JS)
- ✅ **SEO** friendly (meta tags, structured data)
- ✅ **Cross-browser** compatibility

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interface elements
- Optimized navigation for mobile

## 🎯 Key Benefits

1. **Maintainable**: Clean, organized code structure
2. **Scalable**: Easy to add new pages and features
3. **Consistent**: Global styling and component system
4. **Performance**: Optimized CSS and JavaScript
5. **Accessible**: WCAG guidelines compliance
6. **Modern**: Latest web standards and best practices

## 🚀 Getting Started

1. **Edit Homepage**: Make changes to `index.html` for global updates
2. **Update Styles**: Modify `src/assets/css/style.css` for styling changes
3. **Add Functionality**: Extend `src/assets/js/main.js` modules
4. **Create Pages**: Follow existing page structure in `pages/` directory
5. **Test Responsive**: Check all breakpoints and devices

---

**This structure ensures clean, maintainable, and scalable code that follows modern web development best practices.**
