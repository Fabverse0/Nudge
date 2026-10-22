# Small steps: motion and decoration

## Direction

Approved 22 October 2026. Expand the established C1 world using footsteps and the shell arch. Taste Skill leads the landing page (Persuade); Impeccable leads app feedback and continuity (Operate). ImageGen supplies three new transparent C1 illustrations, recorded with prompts and masters in [the asset inventory](./assets/small-steps/README.md).

Design Read: a small step becomes visible, then the interface makes room for the user. Landing ENERGY 2 / RHYTHM 2 / MOTION 2; application ENERGY 1 / RHYTHM 1 / MOTION 1. The app's precision remains more important than spectacle.

## Authored moments and budget

- Hero: existing 760 ms C1 entrance, shell outline opening in 700 ms, and six footsteps appearing over 750 ms. No CTA delay or hidden default content.
- Category gallery: alternate picture travel by 22 px to support the alternating composition; preserve large illustrations on mobile. Stretch replaces the walking illustration for the moving category.
- How-to: a short footprint trail closes the sequence. Control-of-pace section uses the phone-down illustration and a 640 ms settling entrance.
- Ambient accent: only the pace trail gently changes opacity, 1600 ms for three iterations, maximum 4.8 seconds. No infinite animation, sound, flash, scroll takeover, or full-screen particles.
- App steps: 200 ms forward/backward travel by 10 px, preserving values and focus. Suggestion/favorites/reminder screen entries use a 180 ms opacity transition.
- Feedback: selected check, saved favorite, and positive feedback acknowledge the action in 160 ms. State updates immediately.
- Completion: new content pose arrives once in 560 ms with a short footprint sequence. Timer, timer numbers, and timer mascot remain static.

## Runtime boundaries

Native CSS, WAAPI and IntersectionObserver only; no new animation dependency. The shared surface lifecycle cancels active animations when the document is hidden or reduced motion becomes active. Finished entrance targets are marked to prevent replay when returning. Landing targets cancel when offscreen. Feedback can run again after a real state change; keyed app steps get fresh entrance state.

Content is visible before JavaScript; decoration is `aria-hidden`, non-focusable, and ignores pointer events. Reduced motion keeps instant color, icon, text, and selected-state feedback without spatial motion. Images are real static cutouts; whole compositions move, with no simulated limb articulation. No API, storage, recommendation, completion, or notification contract changes.

## Verification

- Production build, TypeScript, ESLint, Prettier and `git diff --check`: passed. Unit suite: 17/17 passed. Focused landing/motion suite: 28/28 passed. Full configured production suite: 94/94 passed in 6.2 minutes on installed Chrome, desktop and Pixel 7 viewport emulation.
- `small-steps-motion.spec.ts` covers asset decoding, overflow, decorative hit-testing, finite timing, offscreen cancellation, step direction/focus, feedback, static timer, completion, live reduced motion and simulated document visibility events. The visibility event test validates the listener contract; it does not prove mobile OS background behavior.
- Existing regressions cover five widths, 320 px with CSS text enlarged to 200%, keyboard, Axe checks, reminder/storage failures, native service worker API acceptance, and no hydration/browser errors on the tested production flow. Physical Android and real screen-reader verification remain pending.
- Taste source lint: 0 FAIL, 0 WARN. Render inspector at 1440/768/390: 0 FAIL, 2 WARN (fixed cream canvas and no footage). Keep the approved canvas and C1 illustration world.
- Impeccable source detector: 13 files, 0 primary findings, 22 advisory font/radius notes across incumbent landing and app styles. This is a regex source scan, not a rendered accessibility audit.
- Browser review inspected hero, category gallery, phone-down section, closing and mobile app completion. Inspector sheets were opened for desktop, tablet and mobile. Local screenshots: `.impeccable/review/small-steps-*.png`; inspector sheets/JSON: `.taste-skill/small-steps-review/`. These are ignored review artifacts.
- Initial Turbopack runs failed while starting a PostCSS worker, including one elevated run. Moving the failed `.next` cache into `.impeccable/review/build-recovery-1022` followed by a clean build succeeded. No application/framework configuration change was needed. Root cause beyond the cache-dependent failure was not proven.

## Visual critique

ROUND 1

Seen in one second: C1 taking a small step out of its blue shell-shaped scene.

Idea (one sentence): follow the turtle's footsteps from scrolling toward one chosen activity.

Live thing: the 2/5/10-minute preview carries the chosen duration into the real app.

Layout words by section: hero=split / duration=interactive panel / how-to=open sequence / categories=alternating gallery / control=statement / closing=action / footer=wordmark.

Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.2. This is a self-assessment using the Taste rubric, not an independent user rating.

Caps applied: Taste's photography criterion caps design at 6.5 because this world is fully illustrated. Preserve the approved C1 direction rather than add unrelated photographs to increase a score.

Top three limitations, most visible first:

1. Illustration-only material throughout desktop/mobile sheets. Retained intentionally; the new scenes vary pose and action within the approved identity.
2. Cream canvas warning on all fold captures. Retained as fixed brand token `#FAF8F4`; tested Axe states pass with existing ink/action colors.
3. Multiple app-entry actions on the mobile fold and close. Existing functional navigation is retained; this motion pass adds no new competing CTA. Trails stay outside text and interaction areas.

## Anti Slop delivery gate

| Block / rules | Result and evidence |
| --- | --- |
| Hard: R-02/R-03 | PASS: authored documentation avoids em dashes; production overflow and large-text checks pass. |
| Hard: R-17/R-18/R-23/R-36/R-38 | PASS: no invented metrics, testimonials or claims; new assets were explicitly approved and sources/prompts are recorded. |
| Hard: R-24/R-26/R-27/R-28/R-34 | PASS: real routes/actions and loading/empty/error states remain; production interaction suite passes. No FAQ or theme switch was added. |
| Hard: R-25/R-32/R-35 | PASS: tested keyboard/focus and Axe states pass; build, interaction checks and actual browser review completed. Physical device/screen-reader limits remain explicit. |
| Hard: R-33/R-37 | PASS: source edits used patches; direction, dials and surface modes are declared above. No script rewrites UI source. |
| Purpose: R-01/R-04/R-06/R-07/R-08/R-09/R-10/R-12/R-13/R-14 | PASS: preserve Nunito/Phosphor and approved UI. No new gradients, glow, capsule claims, grids, glass or shadow layers. Footsteps and shell outline derive from C1 and the small-step premise. |
| Purpose: R-19/R-22 | PASS: hero choreography, directional category entrances and short app feedback serve different jobs; finite timing and cancellation are tested. All new artwork uses C1. |
| Liveliness | PASS: all six checks are affirmative. Dials match modes; C1 leads; spacing separates tasks; blue hero is the focal accent; footsteps repeat deliberately; Design Read preceded implementation. |
| Craft: C-1 through C-5 | PASS: product reasons, functioning controls, no filler sections, tested responsive/keyboard/reduced-motion states, and no invented content. |
| Consistency: R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 | PASS: preserve varied composition, radius hierarchy, action labels, light palette and original C1. No buzzwords, forced dark theme, extra palette or copied identity. |

The gate concerns this motion/decor scope and observed environments, not unperformed physical-device or user research acceptance.
