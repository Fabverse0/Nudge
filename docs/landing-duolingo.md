# Landing: open C1 composition

## Sources and direction

Approved 23 October 2026: strong adaptation of the Duolingo landing and one new C1 hero. Source website: https://id.duolingo.com/, observed in-browser at desktop and 390 px mobile. The user supplied [Duolingo Bright](./references/duolingo-design.md), an `alpha` reference document. Its measurements describe the reference; they are not mandatory Nudge tokens or independently verified specifications.

Taste direction remains `one-motif`: C1's shell and footprints turn the first small step into the visual thread. Design Read: an open scene invites action, and the page gives each activity room to breathe. Mode Persuade; ENERGY 2 / RHYTHM 2 / MOTION 2. Anti Slop `during` is the user's explicit session choice.

Keep C1, Nunito, sage `#679F9E`, action `#315F5E`, blue `#7EADDB`, sand `#E6D4BE`, canvas `#FAF8F4`, Indonesian content and the approved English close. Feather, Duolingo Sans, lime green, Duo artwork, login, course selectors and efficacy claims do not become Nudge requirements.

## Reference mapping

| Observed/reference principle | Nudge decision |
| --- | --- |
| Open expressive character composition | New transparent first-step scene, left of the copy on desktop and above it on mobile. No enclosing hero panel. |
| Short message and obvious action | Existing two-line headline, one short supporting sentence, real app action and no-account reassurance. |
| Generous alternating benefit sections | Three real activity categories precede the compact how-to. Tidy/journal artwork is open; moving retains one blue shell frame. |
| Substantial controls and restrained depth | Landing primary buttons use a darker 4 px bottom border and a 2 px press translation. No floating-card shadow or new depth treatment in the app. |
| Responsive stacked actions | CTA width is capped at 330 px and can shrink; height is a minimum, never a clipping fixed height. Header logo/action fit one row at 320 px with normal text. |
| Persistent navigation | Opaque sticky header and a real how-to anchor with clearance. No sticky bottom overlay. |

Reference spacing values inform rhythm; Nudge keeps a coherent 8-based spacing family and fluid type. Larger viewport whitespace does not become fixed-height empty mobile sections. Heading/body colors stay legible and decorative accents do not convey status alone.

## Content and boundaries

Sequence: hero → real 2/5/10-minute preview → activity benefits → Pick/Try/Do → user control → English closing → footer. The preview remains an illustration of activity selection, not an auto-started session. Its duration link carries only `minutes` to `/app`; the app still asks for the activity goal.

The new scene's source, exact prompt and WebP export are in [the asset inventory](./assets/landing-duolingo/README.md). Exported production asset: 1200 × 900 with alpha, 75,690 bytes. Existing category artwork is reused. Domain logic, storage, reminder behavior, app UI and PWA entry route remain unchanged.

## Motion and resilience

Keep the existing 760 ms once-only hero entrance and bounded footprint sequence; category motion follows composition. Press translation runs only with no reduced-motion preference. Reduced motion retains immediate color/border/icon feedback. Existing offscreen and hidden-document cancellation stays active. Content remains visible without JavaScript; the preview controls are disabled in that fallback and its normal app links remain usable.

## Verification

Implementation in progress. Final results, browser critique and Anti Slop delivery gate will be recorded after the production review. New regression coverage targets hero placement and payload, compact sticky navigation/anchor clearance, section order and frame roles, and press feedback without layout shift.
