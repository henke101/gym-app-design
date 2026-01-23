# Design System

## Color Palette

MbareteGainz uses Tailwind CSS built-in colors:

| Role | Color | Usage |
|------|-------|-------|
| **Primary** | `lime` | Active states, primary actions, progress indicators |
| **Secondary** | `amber` | Highlights, streak indicators, warnings |
| **Neutral** | `zinc` | Backgrounds, text, borders |

### Usage Examples

```jsx
// Primary button
<button className="bg-lime-500 hover:bg-lime-400 text-zinc-900">
  Save Check-In
</button>

// Secondary accent
<div className="bg-amber-500/20 text-amber-400">
  🔥 7 day streak
</div>

// Neutral backgrounds
<div className="bg-zinc-100 dark:bg-zinc-900">
  Content area
</div>
```

## Typography

| Role | Font | Usage |
|------|------|-------|
| **Heading** | DM Serif Display | App title, section headers |
| **Body** | Inter | UI text, labels, descriptions |
| **Mono** | JetBrains Mono | Numbers, metrics, data values |

### Font Loading

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Tailwind Configuration

The fonts are applied via inline `font-family` classes in the components:

```jsx
// Heading
<h1 className="font-['DM_Serif_Display']">MbareteGainz</h1>

// Body text
<p className="font-['Inter']">Track your progress</p>

// Monospace numbers
<span className="font-['JetBrains_Mono']">85.4</span>
```

## Dark Mode

All components support light and dark modes using Tailwind's `dark:` variant:

```jsx
<div className="bg-white dark:bg-zinc-900">
  <p className="text-zinc-900 dark:text-zinc-100">
    Automatically adapts to system preference
  </p>
</div>
```

## Responsive Breakpoints

Standard Tailwind breakpoints are used:

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px), `lg:` (≥ 1024px)

The shell uses `md:` breakpoint for sidebar/bottom nav switch.
