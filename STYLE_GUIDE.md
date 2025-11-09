# 🎨 FoodShare Style Guide

## Color Palette

### Primary Colors
```css
--primary-green: #4CAF50    /* Main brand color */
--primary-dark: #388E3C     /* Darker shade for hover states */
--dark-green: #2E7D32       /* Headers and emphasis */
```

### Secondary Colors
```css
--secondary-orange: #FF9800 /* Call-to-action, receivers */
--beige: #F5F1E8           /* Background accents */
--light-beige: #FAF8F3     /* Light backgrounds */
```

### Neutral Colors
```css
--text-dark: #2C3E50       /* Main text */
--text-light: #6C757D      /* Secondary text */
--white: #FFFFFF           /* Pure white */
```

### Usage
- **Primary Green**: Buttons, donors, main branding
- **Secondary Orange**: Receiver actions, secondary buttons
- **Beige Tones**: Backgrounds, soft sections
- **Text Colors**: Hierarchy and readability

---

## Typography

### Font Family
**Primary**: `Poppins` - Modern, clean, highly readable
**Fallback**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

### Font Weights
- **300**: Light - for subtitles and quotes
- **400**: Regular - body text
- **500**: Medium - navigation
- **600**: Semibold - subheadings
- **700**: Bold - headings and emphasis

### Font Sizes

#### Desktop
- Hero Title: `3.5rem` (56px)
- Page Title: `3rem` (48px)
- Section Title: `2.5rem` (40px)
- Large Text: `1.5rem` (24px)
- Body Text: `1.1rem` (17.6px)
- Small Text: `0.9rem` (14.4px)

#### Mobile
- Hero Title: `1.8rem` (28.8px)
- Page Title: `2.2rem` (35.2px)
- Section Title: `1.8rem` (28.8px)
- Body Text: `1rem` (16px)

---

## Components

### Buttons

#### Primary Button
```css
background: var(--primary-green);
color: white;
padding: 15px 35px;
border-radius: 30px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
transition: all 0.3s ease;
```

**Hover**: Lift up 3px, darker background

#### Secondary Button
```css
background: var(--secondary-orange);
/* Same styling as primary */
```

#### Outline Button
```css
background: transparent;
color: var(--primary-green);
border: 2px solid var(--primary-green);
```

**Hover**: Fill with primary color

### Cards

```css
background: white;
padding: 40px 30px;
border-radius: 15px;
box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
```

**Hover**: Lift up 10px, stronger shadow

### Form Inputs

```css
padding: 12px 16px;
border: 2px solid transparent;
border-radius: 8px;
background: white;
font-family: 'Poppins', sans-serif;
transition: all 0.3s ease;
```

**Focus**:
```css
border-color: var(--primary-green);
box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
```

---

## Layout

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
```

### Spacing Scale
- Small: `20px`
- Medium: `40px`
- Large: `60px`
- Extra Large: `80px`

### Section Padding
- Desktop: `80px 0`
- Tablet: `60px 0`
- Mobile: `40px 0`

---

## Responsive Breakpoints

```css
/* Desktop First */
@media (max-width: 968px)  { /* Tablet */ }
@media (max-width: 768px)  { /* Large Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

### Grid Systems

#### Three Columns
```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 40px;
```

#### Two Columns
```css
grid-template-columns: 1fr 1fr;
gap: 60px;
```

**Mobile**: All grids become single column

---

## Shadows

### Light Shadow (cards at rest)
```css
box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
```

### Medium Shadow (hover state)
```css
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
```

### Strong Shadow (prominent elements)
```css
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
```

---

## Animations

### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Bounce
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
```

### Standard Transition
```css
transition: all 0.3s ease;
```

---

## Icons

### Style
- Use emoji icons for universal recognition
- Font size: `3rem` for large icons
- Font size: `2rem` for medium icons
- Font size: `1.2rem` for inline icons

### Common Icons
- 🍲 Logo/Food
- 🍽️ Donate Food
- 🤲 Receive Food
- ❤️ Love/Impact
- 👥 Community
- 📝 Register
- 🤝 Connect
- ✨ Success
- 📧 Email
- 📞 Phone
- 📍 Location
- 🔐 Admin

---

## Images

### Hero Images
- Source: Unsplash
- Resolution: 1920x1080 minimum
- Focus: People sharing food, community meals
- Overlay: Dark gradient for text readability

### Content Images
- Resolution: 600x400 to 800x600
- Style: Natural, warm tones
- Focus: Food, community, sharing

### Image Overlay Pattern
```css
background: linear-gradient(
  135deg, 
  rgba(46, 125, 50, 0.8), 
  rgba(56, 142, 60, 0.7)
);
```

---

## Quotes & Messaging

### Style
```css
font-style: italic;
font-weight: 300;
opacity: 0.9;
```

### Key Quotes
1. "Sharing Surplus, Serving Hope"
2. "Every plate shared is a story continued"
3. "Your leftovers could be someone's fresh start"
4. "No one should go hungry while food goes to waste"
5. "Food wasted is hope wasted"
6. "Because compassion isn't a service — it's a habit"
7. "Kindness begins with one login"
8. "Together, we can make hunger rare"

---

## Navigation

### Desktop Navigation
- Horizontal layout
- Links with subtle hover background
- Active state with bottom border
- Sticky header on scroll

### Mobile Navigation
- Hamburger menu toggle
- Full-width dropdown
- Vertical stack of links
- Slide-in animation

---

## Footer

### Layout
- Four-column grid on desktop
- Single column on mobile
- Dark green background
- White text with reduced opacity

### Content Sections
1. Logo & tagline
2. Quick links
3. Social media
4. Contact information

---

## Accessibility

### Contrast Ratios
- Text on white: 4.5:1 minimum
- Text on green: AA compliant
- Buttons: Clear focus states

### Focus States
- Visible outline
- Color change
- Shadow enhancement

### Alt Text
- All images have descriptive alt text
- Icons supplemented with aria-labels

---

## Best Practices

### Do's ✅
- Use consistent spacing
- Maintain visual hierarchy
- Provide clear hover states
- Use semantic HTML
- Test on multiple devices
- Optimize images
- Use meaningful quotes

### Don'ts ❌
- Don't use too many colors
- Don't make text too small
- Don't forget mobile users
- Don't overuse animations
- Don't sacrifice readability
- Don't ignore loading times

---

## Component Library

### Stat Card
Used for: Dashboard statistics, homepage metrics

### Step Card
Used for: How it works section, process flows

### Testimonial Card
Used for: User stories, reviews, impact

### Value Card
Used for: Core values, features, benefits

### Team Card
Used for: Team member profiles

### Food Card
Used for: Food listings, donations

---

## Brand Voice

### Tone
- **Warm**: Friendly and welcoming
- **Compassionate**: Empathetic and caring
- **Hopeful**: Optimistic and inspiring
- **Action-Oriented**: Encouraging participation

### Writing Style
- Clear and concise
- Use active voice
- Include calls-to-action
- Emphasize community impact
- Avoid jargon

---

## Loading States

### Skeleton Screens
Use for: Data loading, image placeholders

### Spinners
Use for: Form submissions, quick actions

### Progress Bars
Use for: Multi-step processes, file uploads

---

## Error States

### Style
```css
background: #ffebee;
color: #c62828;
border-left: 4px solid #c62828;
padding: 15px;
border-radius: 8px;
```

### Success States
```css
background: #e8f5e9;
color: #2e7d32;
border-left: 4px solid #4caf50;
```

---

**This style guide ensures consistency across the FoodShare platform**

*Last Updated: October 2025*
