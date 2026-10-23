---
version: alpha
name: Duolingo Bright
description: A playful, high-contrast learning system built around bright green accents, light surfaces, and friendly rounded controls.
colors:
  primary: "#58CC02"
  secondary: "#3C3C3C"
  tertiary: "#FFFFFF"
  neutral: "#E5E7EB"
  surface: "#FFFFFF"
  on-surface: "#3C3C3C"
  background: "#FFFFFF"
  accent: "#58CC02"
  border: "#E5E7EB"
  link: "#1CB0F6"
  error: "#FF4B4B"
typography:
  headline-display:
    fontFamily: feather
    fontSize: 64px
    fontWeight: 700
    lineHeight: 77px
    letterSpacing: -1.28px
  headline-lg:
    fontFamily: feather
    fontSize: 48px
    fontWeight: 700
    lineHeight: 58px
    letterSpacing: 0px
  headline-md:
    fontFamily: sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  headline-sm:
    fontFamily: sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: duolingo-sans
    fontSize: 17px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-md:
    fontFamily: duolingo-sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  body-sm:
    fontFamily: duolingo-sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: duolingo-sans
    fontSize: 15px
    fontWeight: 700
    lineHeight: 18px
    letterSpacing: 0px
  label-md:
    fontFamily: duolingo-sans
    fontSize: 14px
    fontWeight: 700
    lineHeight: 17px
    letterSpacing: 0px
  label-sm:
    fontFamily: duolingo-sans
    fontSize: 12px
    fontWeight: 700
    lineHeight: 14px
    letterSpacing: 0.04em
  caption:
    fontFamily: duolingo-sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 10px
  sm: 14px
  md: 16px
  lg: 40px
  xl: 50px
  gutter: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    padding: "18px 16px"
    height: "50px"
    width: "330px"
  button-primary-hover:
    backgroundColor: "#46B700"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.lg}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "18px 16px"
    height: "50px"
    width: "330px"
  button-secondary-border:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
---

# Duolingo Bright

## Overview
This system feels playful, upbeat, and highly approachable, with a clear emphasis on motivation over formality. The composition is spacious and uncluttered, leaving plenty of white space so the brand marks, illustration, and calls to action can breathe. It targets a broad consumer audience and should always feel friendly, simple, and optimistic.

## Colors
- **Primary (#58CC02):** Duolingo’s signature green, used for the main action button, brand marks, and energetic highlights. It should feel lively and unmistakably optimistic.
- **Secondary (#3C3C3C):** A soft charcoal used for body copy, supporting labels, and neutral UI text. It provides contrast without feeling as severe as pure black.
- **Surface (#FFFFFF):** The default canvas for the interface, creating a clean, airy learning environment with minimal visual noise.
- **Background (#FFFFFF):** Matches the page surface and reinforces the bright, open layout.
- **Neutral (#E5E7EB):** A light border and divider tone used to separate cards and controls without adding weight.
- **On-surface (#3C3C3C):** The primary readable text color inside cards and standard content areas.
- **Accent (#58CC02):** A duplicate semantic reinforcement of the brand green for tokens that need a named accent role.
- **Link (#1CB0F6):** A bright blue reserved for secondary interactive cues and alternate navigation states.
- **Error (#FF4B4B):** A clear alert red for validation and destructive feedback, used sparingly to preserve the cheerful tone.

## Typography
The typography system uses a distinctive display face, Feather, for large headlines, paired with a clean sans-serif system for supporting UI text. Headlines are bold and compact, with the largest display style using tight negative letter spacing for a confident, friendly brand voice. Body text uses duolingo-sans at 17px/24px for readability, while labels and buttons are heavier and slightly smaller to feel efficient and action-oriented. Uppercase treatment appears in navigation and button labels, often with modest tracking to make short commands feel crisp.

## Layout
The page is intentionally sparse, with a centered hero composition and generous surrounding whitespace. Spacing follows a loose but consistent rhythm based on 10px, 14px, 40px, 50px, and 64px increments, producing a roomy, low-pressure feel. Controls are stacked vertically with clear separation, and the bottom language selector bar uses a fixed horizontal strip with evenly spaced items. Cards and surfaces should keep padding moderate, around 16px, while larger sections can expand to 40px or more.

## Elevation & Depth
Depth is subtle rather than dramatic. The interface relies on contrast, borders, and strong color blocking instead of heavy shadows; the primary button uses a crisp solid fill, while secondary controls use thin outlines and light separators. When shadow is present, it is minimal and soft, preserving the flat, lightweight learning experience. Use tonal layering and border definition before reaching for elevation.

## Shapes
The shape language is soft and approachable, with rounded corners used consistently on interactive elements. Primary buttons use a 12px radius for a friendly pill-like feel, while secondary controls stay slightly tighter at 4px to keep the hierarchy clear. Cards use 8px rounding, and fully rounded chips or pills can use `full` for compact navigation elements. Avoid sharp corners unless a component is intentionally utilitarian.

## Components
Buttons should feel bold and highly tappable. Use `button-primary` for the main call to action: green fill, white text, 50px height, and 18px/16px padding, with a minimum width of 330px. `button-secondary` is an outlined alternative with transparent background, dark text, and a 1px border; it should look quieter but still substantial. `button-link` is for lightweight inline actions only and should remain text-like with no box treatment. Hover states should stay true to the brand: slight darkening for primary buttons, not dramatic color shifts or motion-heavy effects.

Cards should be simple white containers with `card` styling: white surface, 1px light border, 8px radius, and 16px padding. Inputs should follow the same restrained geometry as secondary controls, with clear borders and comfortable internal padding. Chips and selectors should remain compact, rounded, and low-contrast so they support content rather than compete with it. Labels and buttons should use strong weights for clarity, while explanatory text should remain regular weight and highly legible.

## Do's and Don'ts
- Do keep the interface bright, open, and optimistic, with lots of white space.
- Do use the primary green for the most important action only.
- Do keep typography simple and highly legible, with bold labels and friendly headlines.
- Do prefer subtle borders and clean fills over heavy shadows and complex depth effects.
- Don't introduce dark, moody surfaces or high-contrast editorial styling.
- Don't over-round every element; preserve the tighter radius on secondary controls.
- Don't make secondary actions louder than the primary green CTA.
- Don't crowd layouts with too many components or dense multi-column content blocks.