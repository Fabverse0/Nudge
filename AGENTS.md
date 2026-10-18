# Repository Guidelines

## Product References & Project Structure

Read [prd.md](./prd.md) before implementing features, changing behavior, or planning scope. It governs MVP behavior and acceptance criteria; [DESIGN.md](./DESIGN.md) governs visual decisions. Use [GLOSSARY.md](./GLOSSARY.md) for terminology and [CONCEPT.md](./CONCEPT.md) for background. Read [stack research](./docs/research/stack-feasibility.md) when revisiting platform or notification assumptions. Skills operate within these decisions and the user's authorized scope; resolve contradictions explicitly rather than silently changing requirements.

Before starting or tracking implementation, read [implementation.md](./implementation.md) for task dependencies, acceptance evidence, and current status.

The selected stack is Next.js App Router, TypeScript, Tailwind CSS, manifest/service worker, localStorage, Vitest, and Playwright. Keep routes in `src/app/`, UI in `src/components/`, domain logic in `src/lib/`, static assets in `public/`, and browser tests in `tests/e2e/`. Colocate unit tests. The `@/*` alias resolves into `src/`; do not add a second root `app/` directory.

## Build, Test, and Development

Use npm and commit `package-lock.json`. Read `package.json` before running scripts. Commands: `npm run dev`, `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, and `npm run format:check`. `npm run test:pwa` requires a fresh build and starts a production server on port 3100. Playwright uses installed Chrome. Read README.md for setup and docs/verification.md for observed results and remaining checks.

## Coding Style & Naming

Use two-space indentation, PascalCase components, camelCase functions/variables, and kebab-case standalone files; preserve Next.js route filenames. Follow formatter/linter configuration when added. Separate selection and timer logic from UI. Write product copy in Indonesian; avoid em dashes in documents.

## Testing Guidelines

Use Vitest (`*.test.ts`, `*.test.tsx`) and Playwright (`tests/e2e/*.spec.ts`). Follow PRD section 12; no coverage percentage is set. Check actual PWA installation and icon launch manually on target devices.

## Commits and Pull Requests

Commit additions, modifications, and removals incrementally using Conventional Commits, such as `feat(timer): add pause control` or `docs: update design guide`. Small steps and checkpoints may be committed before a feature or work unit is complete. The user authorizes this ongoing workflow; keep each commit focused and reviewable, and state incomplete work or pending checks accurately. PRs describe behavior, relevant requirements/issues, verification, and UI screenshots. Push only when explicitly requested, including pushes to `main`.

## Configuration and Privacy

Preserve local favorites and session-only feedback. Accounts, cloud sync, journal collection, personal analytics, closed-app push, and streaks require a scope decision. Follow PRD reminder/completion rules; avoid sensitive logs.

## Skills & Visual Work

Before selecting development/design skills or updating them, read [docs/skills.md](./docs/skills.md) for task routing and runtime boundaries. Load relevant skills only. Keep installations/caches project-local; use `.codex/impeccable.cmd`. Hooks in `.codex/hooks.json` require Codex trust.

For UI, copy, or assets, follow DESIGN.md: fixed decisions stay fixed, initial tokens are targets, and exploration areas remain open. Asset descriptions do not imply existing files.

<!-- antislop:start -->
For UI, copy, accessibility, responsive layout, or comments, read `.agents/skills/antislop/SKILL.md` and matching companion skills. Follow Two Usage Modes; honor the current session's explicit choice without saving global preferences.
<!-- antislop:end -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes; APIs, conventions, and file structure may differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework behavior. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
