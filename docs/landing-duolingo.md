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

Final production regression: **102/102 passed in 6.1 minutes** on installed Chrome, desktop and Pixel 7 viewport emulation. Production build, TypeScript, ESLint, Prettier and diff checks passed; unit suite 17/17 passed. New coverage verifies hero alpha/dimensions/payload, placement at four widths, mobile CTA visibility, compact sticky navigation/anchor clearance, section order/frame roles, and press feedback without layout shift. Existing tests retain duration handoff, no-JavaScript behavior, reduced motion, keyboard, large text, app state, PWA and reminder checks.

### Observed checks before final regression

- Production build, TypeScript, ESLint and Prettier pass; six unit files / 17 tests pass. Taste source lint reports 0 FAIL / 0 WARN. Impeccable regex scan reports 0 primary findings and 15 advisory font/radius notes, which are documented landing-specific sizes rather than replacements for app tokens.
- At 1920 px / DPR 1, the same new hero renders at 516.28 px. The explicit sizing hint selects a 640 px optimized image (23,866 encoded bytes), while the reproduced oversized `52vw` hint selects 1080 px (50,888 bytes). This compares two hints for the same asset, not overall page speed or the previous hero.
- Direct browser review at 1440 × 900 and 390 × 844 confirms open hero composition, CTA visibility, intact art and compact mobile header. Full-page production screenshots show all three large category illustrations and the retained user-control/English closing sections.
- One preliminary landing run found a test expectation using `studio-demo` as the first class while the incumbent first class is `hero-demo`; the expectation was corrected without changing production markup for the test.
- The first full run had 100 passes and two mobile failures. An exact `02:00` assertion read the timer after real time had advanced; the clock now pauses before starting. Axe also sampled the existing app entrance at opacity 0.75, blending muted text to `#7B8B89`; keyboard/Axe snapshots now use reduced motion to audit settled states, with motion coverage retained separately. No app production code was changed. The four affected desktop/mobile cases passed in a focused repeat.
- The next full run passed 101 cases; the four-Axe/two-screenshot keyboard case exceeded its original 30-second total deadline. Its deadline is now 90 seconds with all assertions retained. In the final full run, this case passed in 15.9 seconds on desktop and 11.7 seconds on mobile; all 102 cases passed together.
- Physical Android installation/notification behavior, real screen-reader use and a new physical-device zoom check are not proven by this work. Viewport emulation and CSS text enlargement remain distinct from those checks.

## Render critique

ROUND 1

Seen in one second: the sage C1 face and the two-line invitation to begin.

Idea (one sentence): C1 takes a first step away from the phone, and each subsequent activity gets a clear place in the page.

Live thing: a real duration choice changes the example and the app-entry URL.

Layout words by section: hero=open split / duration=interactive panel / benefits=alternating open gallery / how-to=sequence / control=statement / close=action / footer=wordmark.

Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.2. Self-assessment, not independent user research or an external award score.

Caps applied: the Taste photography criterion caps design at 6.5 for an illustration-only world. Keep the user-approved C1 artwork and material instead of adding unrelated photography to improve the score.

Top three remaining tradeoffs, most visible first:

1. The mobile gallery makes the page longer. Full mobile sheets retain all three illustrations at a useful size; the compact sticky header keeps an app entry available.
2. The cream canvas triggers the inspector's palette warning. Preserve the fixed brand token, with existing action/ink colors and the tested contrast states.
3. No footage is present. The hero and bounded motion carry the expressive moment; generic stock video would not explain a real Nudge capability.

The inspector at 1440/768/390 reports 0 FAIL and 2 WARN (cream/no footage). It measures the headline at 72/42.2/40 px, two lines at every sampled width, Nunito throughout, about four desktop screens and ten images. Source lint: 0 FAIL / 0 WARN. All desktop/tablet/mobile page sheets were opened and compared with the actual browser review. No covered headline, broken image, blank reveal region or additional visible blocker was observed.

Review artifacts are local and ignored: `.taste-skill/duolingo-review/` contains the inspector JSON and sheets; `.impeccable/review/duolingo-landing-{desktop,tablet,mobile}.png` contains direct browser captures. These are observations of emulated viewports, not physical-device results.

## Anti Slop delivery gate

| Block / rules | Result and evidence |
| --- | --- |
| Hard: R-02/R-03 | PASS: authored text has no em dash; five-width and 320 px / 200% text regressions pass without clipped text or horizontal overflow. |
| Hard: R-17/R-18/R-23/R-36/R-38 | PASS: no metrics, testimonials or outcome claims were invented. The user approved the new scene, with C1 reference, source and exact prompt recorded. |
| Hard: R-24/R-26/R-27/R-28/R-34 | PASS: app links and the how-to anchor are real. Preview controls, client-ready and no-JavaScript fallback states pass. No FAQ or theme switch was introduced; app loading/empty/error paths remain in the regression suite. |
| Hard: R-25/R-32/R-35 | PASS: tested settled-state Axe and keyboard paths pass; production build, actual browser review and full 102-case suite completed. This is not a certification of physical-device or screen-reader behavior. |
| Hard: R-33/R-37 | PASS: UI source was changed through patches, with direction/dials stated before implementation. The asset export script processes images only. |
| Purpose: R-01/R-04/R-06/R-07/R-08/R-09/R-10/R-12/R-13/R-14 | PASS: preserve Nunito/Phosphor and Nudge tokens. The tonal CTA border supports press feedback; the one blue shell frame identifies movement. No new gradients, glow, glass, decorative grids, shadow panels or generic icon-card sections. |
| Purpose: R-19/R-22 | PASS: original C1 art carries the small-step story; existing finite entrances and directional category motion retain cancellation/reduced-motion coverage. |
| Liveliness | PASS: all six checks are affirmative. Dials match the approved direction; C1/headline form the hero focal point; spacing separates content roles; blue movement frame is the large color accent; footprints repeat the small-step identity; Design Read was declared before UI edits. |
| Craft: C-1 through C-5 | PASS: decisions have product reasons, controls function, sections use real content, tested responsive/keyboard/fallback states pass, and claims are source-faithful. |
| Consistency: R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 | PASS: varied split/panel/gallery/sequence/statement rhythm, radius hierarchy and action-specific copy remain. Nudge retains its original character, palette and tone while applying the reference principles. |

The gate covers the approved landing refinement and tested environments. Remaining physical Android, screen-reader and user-observation work stays open in the main verification record.
