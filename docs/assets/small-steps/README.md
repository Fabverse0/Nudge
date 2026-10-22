# Small steps: C1 illustrations

Created 22 October 2026 with the built-in ImageGen tool. The existing `public/brand/mascot/nudge-turtle-idle.png` was the character reference for all three generations. No external stock artwork was used. The original reference and existing production assets remain available.

| Master | Production file | Use | Export |
| --- | --- | --- | --- |
| sources/pause.png | public/brand/small-steps/pause.webp | Landing user-control section and empty favorites | 720 square, 42,758 bytes |
| sources/stretch.png | public/brand/small-steps/stretch.webp | Moving category and suggestion artwork | 720 square, 40,052 bytes |
| sources/content.png | public/brand/small-steps/content.webp | Completion | 720 square, 33,712 bytes |

Masters are transparent 1254-square PNGs. Production exports preserve transparency and use WebP quality 86 / alpha quality 100. Export with `node scripts/export-motion-art.mjs <generated-image-directory>` in the same installed environment; the script uses the Sharp runtime supplied with Next.js. Runtime delivery uses Next Image sizing. These are static illustrations, not articulated animation or sprite frames.

## Generation prompts

### Pause

Create one production website illustration, transparent RGBA background. Use the provided C1 turtle as strict character and material reference: enormous rounded sage-teal shell that frames a warm sand cream rounded face, teal oval eyes with small cream highlights, simple teal smile, short cream chunky feet, plush matte softly shaded 3D toy look. Retain this exact identity and palette (#679F9E sage shell, #E6D4BE warm cream body, #7EADDB small blue accent). New scene: C1 turtle gently putting a small muted-blue phone FACE DOWN beside itself with one front foot, looking content and present, gaze toward viewer. Full character visible, uncluttered three-quarter view, isolated cutout, phone clearly face down, no writing or UI, no badges or hearts or sparkle or ground plane or backdrop. Composition roughly square with modest transparent safety margins, soft directional lighting matching reference. This is a gentle break from scrolling, no tired/sad expression. Do not add a second turtle. No text.

### Stretch

One transparent background full-body cutout website illustration. Strictly match the reference C1 turtle: oversize smooth domed sage shell wrapping the head, cream sand soft chunky face and feet, teal oval shiny eyes and simple teal smile. Plush matte 3D soft toy, minimal features and soft lighting. Create a clearly active gentle stretching pose: turtle leaning to one side, one cream front foot lifted high outward in a big overhead side stretch, the other front foot planted supporting its body, rear cream feet firmly grounded and visible. Entire face happy relaxed, eyes open. Keep reference shell proportions, no neck, no fingers or human hands, no clothes or gym equipment. Sage #679F9E and warm cream #E6D4BE, no extra colors. Full silhouette visible, generous transparent safety margins, three quarter view. No ground, shadow rectangle, text, sparkles, stars, arrows, or background. Isolated character only.

### Content

Create a production UI mascot illustration on genuinely transparent background. Exactly retain provided C1 turtle identity: giant round dome smooth sage shell frames its cream sand round face, teal oval eyes and tiny crescent teal smile, chunky soft short cream feet. Same plush matte softly shaded 3D material, sage #679F9E and warm cream #E6D4BE. New pose: C1 sits content after finishing a small activity, gently raises ONE front cream foot in a small low friendly wave at shoulder level, both eyes open kind and proud, body three quarter toward viewer. Small affirmative friendly gesture, not exuberant jumping. Other front foot resting on ground, hind feet visible; no fingers, claws, thumb, arm joints, clothing. Full turtle visible, square composition with transparent safety margins, no other objects, no text, stars, confetti, hearts, badges, background or floor. Match the simple face and very large dome of the reference.

## Inspection

All three generated masters were visually inspected before integration. Pause shows the phone camera on the upward-facing back; stretch has a clear side lean and raised front foot; content has a small friendly wave. No generated text or background is present. Exported dimensions and payload sizes above come from Sharp output, not estimates.
