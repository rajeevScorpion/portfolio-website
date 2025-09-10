# RK·Studio Design System

## 📋 Overview
This document contains the complete design system for the RK·Studio portfolio website. All styling decisions, color palettes, typography, and component patterns are documented here to ensure consistency across all future implementations.

---

## 🎨 Color Palette

### Primary Colors
- **Accent**: `#C7A86F` (Golden accent for CTAs and highlights)
- **Background Primary**: `#0b0b0f` (Main page background)
- **Background Secondary**: `#0e0e13` (Card backgrounds, panels)
- **Background Tertiary**: `#1a1a1f` (Form inputs, nested elements)

### Text Colors
- **Primary Text**: `white` (Main headings, important text)
- **Secondary Text**: `text-gray-300` (Body text, labels)
- **Tertiary Text**: `text-gray-400` (Subheadings, metadata)
- **Muted Text**: `text-gray-500` (Hints, secondary info)

### Border & UI Colors
- **Border Primary**: `border-white/10` (Subtle borders)
- **Border Secondary**: `border-white/20` (More prominent borders)
- **Hover Background**: `bg-white/5` (Subtle hover states)
- **Active Background**: `bg-white/10` (Active/selected states)
- **Admin Button Background**: `bg-gray-800/30` (Minimalist button base)
- **Admin Button Hover**: `bg-gray-700/50` (Minimalist button hover)

### Status Colors
- **Success**: `bg-green-500/20 text-green-400`
- **Info**: `bg-blue-500/20 text-blue-400`
- **Warning**: `bg-yellow-500/20 text-yellow-400`
- **Neutral**: `bg-gray-500/20 text-gray-400`

---

## ✍️ Typography

### Font Family
- **Primary**: Geist (font-extralight, font-light)
- **Weights**: 300 (light), 400 (normal)

### Text Sizes & Hierarchy
- **Hero Title**: `text-4xl md:text-6xl` (font-extralight)
- **Section Title**: `text-3xl md:text-4xl` (font-extralight)
- **Card Title**: `text-lg` (font-light)
- **Body Text**: `text-sm` (normal)
- **Metadata**: `text-xs` (normal)
- **Buttons**: `text-sm` (font-semibold)

### Letter Spacing
- **Logo/Branding**: `tracking-widest` (0.1em)
- **Navigation**: `tracking-wider` (0.05em)
- **Section Subtitles**: `tracking-[0.25em]` (0.25em)
- **Hero Subtitle**: `tracking-[0.35em]` (0.35em)

---

## 📐 Spacing System

### Container & Layout
- **Main Container**: `container mx-auto max-w-6xl px-6`
- **Section Padding**: `py-20`
- **Card Padding**: `p-5`, `p-4`
- **Header Padding**: `px-6 py-4`

### Gaps & Margins
- **Large Gap**: `gap-6` (between cards)
- **Medium Gap**: `gap-4` (between form elements)
- **Small Gap**: `gap-3` (between buttons)
- **Tiny Gap**: `gap-2` (between icon and text)
- **Bottom Margin**: `mb-2`, `mb-6`, `mb-8`, `mb-10`

### Component Spacing
- **Button Padding**: `px-5 py-2.5` (primary buttons)
- **Tag Padding**: `px-4 py-2`
- **Icon Button**: `p-2` (icon-only buttons)
- **Form Inputs**: `px-3 py-2`

---

## 🎭 Components

### Buttons
```css
/* Primary Action Button */
.btn-primary {
  @apply inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 
         text-sm font-semibold tracking-wide transition
         bg-[var(--accent)] text-black hover:brightness-110;
}

/* Secondary Button */
.btn-secondary {
  @apply inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 
         text-sm font-semibold tracking-wide transition
         border border-[var(--accent)] text-[var(--accent)] 
         hover:bg-[var(--accent)] hover:text-black;
}

/* Ghost Button */
.btn-ghost {
  @apply inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 
         text-sm font-semibold tracking-wide transition
         text-gray-300 hover:text-white hover:bg-white/5;
}

/* Admin Minimalist Button */
.btn-admin {
  @apply flex items-center gap-2 px-4 py-2 rounded-xl 
         bg-white/5 text-gray-300 hover:text-white 
         hover:bg-white/10 border border-white/10 transition-all;
}

/* Admin Icon Button */
.btn-admin-icon {
  @apply p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 
         text-gray-400 hover:text-white border border-gray-700 
         transition-all;
}
```

### Cards
```css
/* Standard Card */
.card {
  @apply rounded-3xl bg-white/5 ring-1 ring-white/10 
         backdrop-blur-sm overflow-hidden;
}

/* Card with Hover */
.card-hover {
  @apply rounded-3xl bg-white/5 ring-1 ring-white/10 
         backdrop-blur-sm overflow-hidden transition 
         hover:ring-white/30;
}

/* Admin Card */
.card-admin {
  @apply rounded-lg bg-[#1a1a1f] border border-white/10 
         overflow-hidden;
}
```

### Navigation
```css
/* Main Navigation */
.nav-item {
  @apply rounded-xl px-3 py-2 text-sm text-gray-300 
         hover:text-white hover:bg-white/5;
}

.nav-active {
  @apply rounded-xl px-3 py-2 text-sm text-white 
         ring-1 ring-white/10;
}

/* Admin Navigation */
.nav-admin {
  @apply rounded-xl px-3 py-2 text-sm text-gray-300 
         ring-1 ring-white/10;
}
```

### Forms
```css
/* Form Input */
.form-input {
  @apply w-full bg-[#1a1a1f] border border-white/10 rounded 
         px-3 py-2 text-white focus:outline-none 
         focus:border-[var(--accent)];
}

/* Form Textarea */
.form-textarea {
  @apply w-full bg-[#1a1a1f] border border-white/10 rounded 
         px-3 py-2 text-white focus:outline-none 
         focus:border-[var(--accent)] h-24 resize-none;
}

/* File Upload Label */
.upload-label {
  @apply flex items-center gap-2 px-3 py-2 rounded-lg 
         bg-white/5 hover:bg-white/10 text-gray-300 
         hover:text-white border border-white/10 
         cursor-pointer transition-all;
}
```

### Tags & Filters
```css
/* Tag Component */
.tag {
  @apply rounded-xl px-4 py-2 text-xs tracking-wide;
}

.tag-active {
  @apply rounded-xl px-4 py-2 text-xs tracking-wide
         bg-white/10 text-white border border-white/10;
}

.tag-inactive {
  @apply rounded-xl px-4 py-2 text-xs tracking-wide
         text-gray-400 hover:text-white hover:bg-white/5;
}
```

### Status Badges
```css
/* Status Badge */
.status-badge {
  @apply rounded-full px-3 py-1 text-xs font-medium;
}

.status-success {
  @apply bg-green-500/20 text-green-400;
}

.status-info {
  @apply bg-blue-500/20 text-blue-400;
}

.status-warning {
  @apply bg-yellow-500/20 text-yellow-400;
}

.status-neutral {
  @apply bg-gray-500/20 text-gray-400;
}
```

---

## 🎭 Images & Media

### Image Containers
```css
/* Project Card Image */
.image-project-card {
  @apply relative h-64 w-full overflow-hidden;
}

/* Admin Card Image */
.image-admin-card {
  @apply relative h-48 w-full overflow-hidden;
}

/* Modal Preview */
.image-preview {
  @apply w-full h-32 object-cover rounded;
}
```

### Image Overlay
```css
/* Gradient Overlay */
.image-overlay {
  @apply pointer-events-none absolute inset-0 
         bg-gradient-to-t from-black/50 to-transparent opacity-60;
}

/* Empty State */
.image-empty {
  @apply relative h-64 w-full overflow-hidden 
         bg-gray-800 flex items-center justify-center;
}
```

---

## 🎭 Animations & Transitions

### Hover Effects
```css
/* Scale Hover */
.hover-scale {
  @apply transition duration-500 hover:scale-[1.03];
}

/* Ring Hover */
.hover-ring {
  @apply transition hover:ring-white/30;
}

/* Background Hover */
.hover-bg {
  @apply transition hover:bg-white/5;
}

/* Text Hover */
.hover-text {
  @apply transition hover:text-white;
}
```

### Loading States
```css
/* Loading Text */
.loading-text {
  @apply text-gray-400;
}

/* Loading Spinner */
.loading-spinner {
  @apply animate-spin text-[var(--accent)];
}
```

### Reveal Animation
```css
/* Reveal Animation */
.reveal {
  opacity: 0.001;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: none;
}
```

---

## 🎭 Icons

### Icon Sizes
- **Small**: `w-4 h-4` (buttons, form elements)
- **Medium**: `w-5 h-5` (navigation, cards)
- **Large**: `w-6 h-6` (headers, special cases)

### Icon Colors
- **Default**: `text-gray-400`
- **Hover**: `hover:text-white`
- **Active**: `text-white`
- **Accent**: `text-[var(--accent)]`

### Icon Backgrounds
```css
/* Icon Background */
.icon-bg {
  @apply rounded-xl bg-white/5 p-2 ring-1 ring-white/10 
         hover:bg-white/10 transition-all;
}

/* Icon Only */
.icon-only {
  @apply text-gray-400 hover:text-white;
}
```

---

## 🎭 Responsive Design

### Breakpoints
- **Mobile**: Default (up to 640px)
- **Tablet**: `sm:` (640px and up)
- **Desktop**: `md:` (768px and up)
- **Large Desktop**: `lg:` (1024px and up)

### Grid Systems
```css
/* 2 Column Grid */
.grid-2 {
  @apply grid grid-cols-1 gap-6 sm:grid-cols-2;
}

/* 3 Column Grid */
.grid-3 {
  @apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3;
}

/* Responsive Text */
.text-responsive {
  @apply text-4xl leading-tight md:text-6xl md:leading-[1.1];
}
```

---

## 🎭 Accessibility

### Focus States
```css
/* Focus Visible */
.focus-visible {
  @apply focus:outline-none focus:ring-2 focus:ring-[var(--accent)] 
         focus:ring-offset-2 focus:ring-offset-[#0b0b0f];
}
```

### ARIA Labels
- Use descriptive alt text for images
- Provide aria-labels for icon-only buttons
- Use proper heading hierarchy
- Ensure keyboard navigation support

---

## 🎭 CSS Variables

### Root Variables
```css
:root {
  --accent: #C7A86F;
}
```

### Component Variables
- Use CSS custom properties for themable components
- Maintain consistency across dark/light modes
- Document any dynamic values

---

## 🎭 Best Practices

### Performance
- Use `loading="lazy"` for images
- Optimize image sizes and formats
- Minimize re-renders in React components
- Use CSS transforms instead of position changes

### Maintainability
- Follow BEM naming conventions
- Keep component specificity low
- Use utility classes for consistency
- Document any custom CSS

### Design Consistency
- Always use documented colors and spacing
- Maintain visual hierarchy
- Test across different screen sizes
- Ensure adequate contrast ratios

---

## 🎭 File Structure

```
src/
├── components/
│   ├── ui/
│   │   └── index.tsx              # UI component library
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page
│   │   ├── PortfolioPage.tsx     # Projects page
│   │   ├── AboutPage.tsx         # About page
│   │   ├── ResearchPage.tsx      # Research page
│   │   └── ContactPage.tsx       # Contact page
│   ├── PortfolioSite.tsx         # Main app component
│   ├── ProjectModal.tsx          # Project detail modal
│   └── Testimonials.tsx          # Testimonials component
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   └── api/
│       ├── projects/
│       │   └── route.ts          # Projects API
│       └── upload/
│           └── route.ts          # File upload API
├── data/
│   └── index.ts                  # Data and API functions
├── types/
│   └── index.ts                  # TypeScript interfaces
└── lib/
    └── utils.ts                  # Utility functions
```

---

## 🎭 Implementation Notes

### When Adding New Components
1. Check existing patterns first
2. Use documented colors and spacing
3. Follow the established naming conventions
4. Test across different screen sizes
5. Ensure accessibility compliance
6. Update this documentation if adding new patterns

### When Modifying Existing Components
1. Understand the current design system
2. Test changes thoroughly
3. Maintain backward compatibility
4. Update documentation if patterns change
5. Consider the impact on other components

---

**Last Updated**: September 9, 2025  
**Version**: 1.0.0  
**Maintainers**: RK·Studio Development Team  
**Status**: Active - Refer to this document for all styling decisions