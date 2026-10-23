# Landing motion sources

## Licensed animation derivatives

| Local asset | Creator and source | Changes |
| --- | --- | --- |
| `phone.json` | Handset outline adapted from Nafta R, [Scrolling Phone](https://lottiefiles.com/fr/free-animation/scrolling-phone-ZET2S501oM) | New Nudge storyboard: dimensional tilted handset, colorful illustrated feed, pause invitation, emerging book, plant and footprints. Playback at 0.65, a quiet ending phase and a 0.4-second cycle boundary. |
| `diary.json` | Brian Karungani, [Diary](https://lottiefiles.com/de/free-animation/dear-diary-U1ECFfrA2z) | Recolored to Nudge, outlined affirmation replaced with neutral strokes, playback at 0.95, 0.9-second rest between cycles. |

Both source pages identify the Lottie Simple License. The source archives are retained here. Reproduce derivatives using `python scripts/export-landing-motion.py`. They contain vector shapes, without embedded raster images, external requests, or editable text layers.

The phone storyboard was revised on 24 October 2026 after the user found the monochrome phone too plain. `phone-source.json` is the extracted original source. `scripts/build-phone-story.mjs` reuses its rounded handset path, creates the illustrated story, and outlines the short invitation in Nunito 800. The font source and OFL notice are already in `docs/assets/turtle-c1` and `docs/licenses`; a public copy accompanies the animation. The feed is an illustration, not a screenshot or a claim that Nudge monitors a user's phone.

The derivatives remain subject to the same license, independently of the application code. The full license is beside the public files. The landing footer links to their credits. No paid assets or third-party account are required.

The C1 portraits are landing-only WebP exports of existing Nudge artwork, reproducible with `node scripts/export-landing-portraits.mjs`. Shoes, trail, clock, books, cup, and supporting props are original code illustrations for this landing, not downloaded stock. Static SVG posters are actual rendered frames of the adapted animation, included for no JavaScript, reduced motion, and failed downloads. They share the animation's license.
