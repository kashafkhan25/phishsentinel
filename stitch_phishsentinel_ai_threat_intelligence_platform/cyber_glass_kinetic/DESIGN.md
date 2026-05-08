---
name: Cyber-Glass Kinetic
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffd1dc'
  on-tertiary: '#650031'
  tertiary-container: '#ffa8c1'
  on-tertiary-container: '#9d0150'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c6'
  on-tertiary-fixed: '#3f001c'
  on-tertiary-fixed-variant: '#8e0048'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin: 2rem
  section-gap: 5rem
  element-gap: 1rem
  grid-unit: 4px
---

## Brand & Style

The design system is engineered to evoke a sense of absolute security, high-velocity performance, and elite technical superiority. It targets a sophisticated enterprise audience that demands both aesthetic precision and functional clarity. 

The visual direction is a hybrid of **Glassmorphism** and **High-Contrast Minimalism**. It utilizes deep, infinite backgrounds to provide a sense of scale, layered with semi-transparent surfaces that suggest a "command center" interface. The atmosphere is cold and clinical, punctuated by high-energy neon accents that signify active data and "living" security protocols. Motion and depth are central, using animated gradients and subtle grid patterns to create a tactile sense of a digital fortress.

## Colors

The color palette is built on a foundation of "True Deep" neutrals, shifting from absolute black to a dense, oxygen-rich navy. This provides the necessary contrast for the neon accent system.

- **Primary (Neon Cyan):** Used for primary actions, success states, and critical data nodes. It carries a subtle outer glow (0px 0px 12px) in high-priority contexts.
- **Secondary (Electric Blue):** Used for interactive elements, secondary navigation, and structural accents.
- **Tertiary (Cyber Pink):** Reserved exclusively for high-priority alerts, threat detection, and destructive actions.
- **Backgrounds:** The interface utilizes `#000000` for the base canvas, with `#020617` and `#0D0C22` forming the "glass" containers.
- **Surface Accents:** High-frequency lines and borders use `#FFFFFF` at 10% opacity to maintain a translucent feel.

## Typography

This design system utilizes a dual-font approach. **Inter** serves as the structural workhorse, providing maximum readability for complex security logs and administrative controls. It is set with tight letter-spacing for headlines to maintain a premium, editorial feel.

**Space Grotesk** is introduced as a specialized accent for technical data, labels, and code snippets. It conveys the "futuristic" brand personality without compromising the utility of the primary interface. All uppercase labels should use Space Grotesk with expanded tracking to ensure a technical, "scanned" aesthetic.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a 12-column grid system that centers at 1440px, but background patterns (like the cyber grid) extend to the edges of the viewport to create an immersive environment.

A strict 4px spacing unit is used to maintain visual density—a hallmark of high-end SaaS tools. Small components use 8px (2 units) or 12px (3 units) padding, while sections use larger 80px (20 units) gaps. Consistent alignment to the grid is mandatory to reinforce the "engineered" feel of the product.

## Elevation & Depth

Depth is not communicated through traditional shadows, but through **Tonal Stacking** and **Glassmorphism**.

- **Level 0 (Base):** Pure Black (#000000) with a faint CSS-generated grid pattern (1px lines every 40px, at 5% opacity).
- **Level 1 (Sub-surface):** Deep Navy (#020617) with a subtle inner glow.
- **Level 2 (Glass Cards):** Semi-transparent background (#FFFFFF at 3% opacity) with a `backdrop-blur` of 12px. These elements feature a "hairline border" (1px) with a linear gradient stroke (Top-Left: White 15% to Bottom-Right: White 2%).
- **Level 3 (Popovers/Modals):** Increased blur (24px) and a subtle Cyan outer glow to indicate they are "floating" above the system.

## Shapes

The shape language reflects "Sophisticated Precision." We avoid the overly friendly feel of heavy rounding in favor of **Softened Sharpness**. 

Primary containers and buttons use a consistent 4px (0.25rem) radius. This provides just enough softness to feel modern and premium while maintaining the aggressive, high-contrast look of a cybersecurity platform. Progress bars and status tags may use a full pill-radius to differentiate them from interactive surface areas.

## Components

- **Buttons:** Primary buttons are solid Neon Cyan with black text. On hover, they emit a cyan glow. Secondary buttons use a transparent background with a 1px Electric Blue border.
- **Glass Cards:** The primary container for all content. Must include `backdrop-filter: blur(12px)` and a subtle gradient border.
- **Input Fields:** Dark backgrounds (#000000) with 1px borders that transition from Gray to Cyan on focus. Use Space Grotesk for placeholder text.
- **Data Visualizations:** Charts should use animated gradient strokes. Use Neon Cyan for positive trends and Cyber Pink (#EA4C89) for anomalies or threats.
- **Cyber Grid Pattern:** A background utility component. Use a 40px grid mesh with 0.5pt lines, fixed to the background to provide a sense of orientation during scroll.
- **Status Chips:** Small, high-contrast indicators. "Secure" uses a Cyan dot; "Warning" uses an Amber dot; "Threat Detected" uses a Pink pulsing glow.
- **Monospace Readouts:** For IP addresses, hash keys, and timestamps, always use the `data-mono` typography tier.