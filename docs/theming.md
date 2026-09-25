# Theming & CSS Variables — AgentComposerUI

AgentComposerUI is built on a modern design system using customizable CSS variables (`--acu-*`) compatible with light and dark mode, Tailwind CSS v3 & v4, and ReUI design aesthetics.

## Design Tokens

Every component uses scoped CSS custom properties that you can override globally or per component instance:

```css
:root {
  /* Brand Accents */
  --acu-primary: 24 24 27; /* Zinc 900 */
  --acu-primary-foreground: 255 255 255;
  --acu-accent: 99 102 241; /* Indigo 500 */
  --acu-accent-foreground: 255 255 255;

  /* Card Background & Borders */
  --acu-card: 255 255 255;
  --acu-card-foreground: 24 24 27;
  --acu-border: 228 228 231; /* Zinc 200 */
  --acu-muted: 244 244 245; /* Zinc 100 */
  --acu-muted-foreground: 113 113 122; /* Zinc 500 */

  /* Status Colors */
  --acu-success: 16 185 129; /* Emerald 500 */
  --acu-warning: 245 158 11; /* Amber 500 */
  --acu-danger: 239 68 68; /* Rose 500 */

  /* Radii & Typography */
  --acu-radius: 0.75rem; /* 12px */
  --acu-font-sans: system-ui, -apple-system, sans-serif;
  --acu-font-mono: ui-monospace, monospace;
}

.dark {
  --acu-primary: 250 250 250; /* Zinc 50 */
  --acu-primary-foreground: 24 24 27;
  --acu-card: 24 24 27; /* Zinc 900 */
  --acu-card-foreground: 250 250 250;
  --acu-border: 39 39 42; /* Zinc 800 */
  --acu-muted: 39 39 42;
  --acu-muted-foreground: 161 161 170; /* Zinc 400 */
}
```

## Dark Mode

All components natively respond to the `.dark` class on your `<html>` or `<body>` element.
