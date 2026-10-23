# Landing studio C1

23 October 2026 refinement: the approved Duolingo-reference adaptation supersedes the earlier hero framing and section order below. See [landing-duolingo.md](./landing-duolingo.md) for the open C1 scene, scoped tactile controls, reference mapping and final 102/102 production verification. Earlier sections remain as history.

Later approved refinement: three new C1 poses, footprint/shell motifs, varied entrances and bounded accent motion are recorded in [small-steps-motion.md](./small-steps-motion.md). Latest production regression: 94/94 passed. The sections below retain the original studio direction and its earlier verification history.

## Approved direction

22 October 2026. The user chose an illustration studio, directed expressive motion, one new hero scene, and reuse of the three existing activity illustrations. Preserve C1, Nunito, sage/blue/sand, rounded forms, Indonesian copy, and real navigation to the app. Mode: Persuade.

Taste direction: `one-motif`, seed `221026`. On this page, C1's arched shell becomes the frame for leaving the screen and trying one small activity. The live interaction remains the 2/5/10-minute preview, with real links carrying the chosen duration into `/app`.

Subject inventory: C1's sage arch, sand face, friendly oval eyes, short rounded feet, two-minute starts, three activity goals, optional mood, one suggestion at a time, journaling outside the app, per-device favorites, and reminders controlled by the user.

## Argument and composition

| Claim | Material that supports it |
| --- | --- |
| A small activity is an approachable next step. | Existing headline and action, with C1 leaving a face-down phone for a notebook and storage box. |
| A short amount of time is enough to begin. | Working duration control and concrete examples, not an invented product screenshot. |
| Starting requires only a few choices. | Existing Pick, Try, Do copy, arranged as an open sequence. |
| Different needs have different activities. | Large tidy, move, and journal illustrations with existing category descriptions. |
| The user controls the pace. | Explicit skip, change, stop, local favorites, and opt-in reminder copy. |
| The next step is available immediately. | Real app links and a clear closing action. |

## Asset and motion decisions

The new [hero inventory](./assets/landing-studio/README.md) records source, exact prompt, optimized output, dimensions and hashes. No stock media, fake testimonials, video or new factual claims were introduced. Illustrations are marketing artwork, not screenshots of app capabilities.

The hero enters once over 760 ms, with at most 18 px vertical and 12 px horizontal travel and a 0.96 starting scale. Below it, illustration frames settle over 600 ms; copy and the three steps arrive over 480 ms with 70 ms sibling offsets. The preview changes over 220 ms and cancels interrupted transitions. Controls respond over 140–180 ms. There are no perpetual loops or scroll hijacking.

Content is visible before scripts and between animations. Reduced motion removes spatial movement; hiding the document cancels current animations. Motion cleanup also runs on unmount. A no-script note identifies the fixed five-minute preview and directs users to choose their time in the app.

## Direction-sheet reconciliation

The automatically dealt striped hero, four-field process, switches, sentence input and looping crossfade do not match the approved content and non-looping motion plan. Keep the selected shell motif and approved studio composition rather than inventing a fourth step, form or new interactions. These are documented adaptations, not claims of implementing those blueprints verbatim. The full sheet and baseline are local artifacts in `.taste-skill/landing-studio/`.

DESIGN.md's fixed palette and rounded identity take precedence over Taste's generic cream/radius preferences. Absence of video follows the approved still-illustration direction. No rule is suppressed to conceal overflow, missing content or broken images.

## Final visual critique

ROUND 2, after static layout and interaction corrections. This is a self-review of rendered screenshots, not an independent jury score.

Seen in one second: a large friendly C1 leaving the phone, beside one short invitation.

Idea (one sentence): the arch of C1's shell frames small activities away from scrolling.

Live thing: change 2/5/10 minutes and open the app with that duration selected.

Layout words by section: hero=split illustration / preview=horizontal control / process=open sequence / activities=alternating gallery / control=statement / close=color band / footer=wordmark.

Scores: design 7.8 · usability 8.3 · creativity 7.4 · content 8.0 → overall 7.9.

Caps applied: none from the final inspector; no claim of passing real-device or screen-reader acceptance.

Top three problems from the prior rounds, each with its render and correction:

1. Baseline `desktop-fold.jpg`: the small mascot and modest type did not establish a focal point. The new scene and larger title now lead the first screen.
2. Baseline `mobile-page-01.jpg`: activity artwork was subordinate to text. Each category now has a large arched illustration and a separate reading group.
3. The 320 px browser measurements found the brand hit areas narrower than their content; enlarged text also overflowed controls and step labels. Header wrapping, intrinsic logo width and flexible text/control layouts now pass the narrow-screen checks. Final images are `.impeccable/review/studio-320-desktop.png` and the corresponding mobile/other-width files.

Final inspector images at 1440/768/390 were visually reviewed. All four main raster illustrations are present; standard headings remain within two lines, no headline is covered, and controls remain distinguishable from illustration frames. The gallery deliberately reuses the shell frame; the illustrative texture is part of C1, not a new material system. No further visible blocker was identified in this review.

Further exploration could add individually articulated character motion, but that was not part of the chosen single-image asset scope. No character limbs are fabricated or warped in this implementation.

## Annotated review revisions, 22 October 2026

The user subsequently authorized these five targeted changes:

| Comment | Revision |
| --- | --- |
| Checkmark looked like a thin line. | Use a filled 24 px Phosphor CheckCircle as a high-contrast selection badge, with the native radio state preserved. |
| Movement illustration looked stationary. | Generate a new walking pose with a raised front foot and a visible trail; keep C1's identity and the old source. |
| Closing CTA icon lacked character. | Use Phosphor Footprints in a 34 px circular inset, with a small hover step and reduced-motion support. |
| Closing invitation should be philosophical English. | Use “Small steps. A fuller life.” and “Make room for what matters, one small act at a time.”, marked `lang="en"`. |
| Hero CTA icon looked ordinary. | Reuse the same step icon to connect both primary actions to Nudge's small-step idea. |

The English copy is an explicit user-directed exception limited to the closing invitation. Action labels remain Indonesian and still link to `/app`. The walking scene extends the original one-new-hero scope following the user's request; [asset inventory](./assets/landing-studio/README.md) contains the exact prompt, source and web output. No shared app mascot mapping was replaced.

## Impeccable refinement, 22 October 2026

Two independent assessments reviewed design and implementation. The initial live URL returned the offline fallback, so the critique used current source and matching stored screenshots: provisional design score 22/28 and technical audit 17/20. Those scores are not post-fix measurements or WCAG certification. The user selected all relevant improvements while explicitly retaining the large gallery on both desktop and mobile.

The implemented direction keeps all three arched illustrations at up to 320 px desktop and 280 px mobile. Shorter process copy and reduced mobile section/list gaps make the middle more concise. Generic app links now say “Mulai kegiatan”; the duration demo says “Lanjut ke Nudge” and explains that time transfers while the goal is chosen in the app. The hero reassures “Tanpa akun. Dua menit juga boleh.” The English closing, C1 artwork, icons and motion remain intact.

Landing layout rules now live in the scoped landing stylesheet, with 700/900 px breakpoints; shared application rules stay global. Review caught and removed a leftover 720 px step-grid rule, and 710 px was added to the reflow checks. Hero alt uses the public character name rather than the internal C1 code.

Production image measurement isolates the old and new `sizes` hints on the same 1920 px layout in fresh DPR-1 Chrome contexts. Render width is 672.17 px: the new hint chooses a 750 px resource (28,376 encoded bytes), while the old hint chooses 1080 px (48,938 bytes). This is about 42% less image payload in that scenario, not a measured CWV or physical-mobile improvement. Browser caches may retain a larger previously downloaded image when resizing an existing tab. See [verification](./verification.md) for test results and remaining limits.
