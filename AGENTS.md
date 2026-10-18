# Repository Guidelines

## Project Structure & Product Scope

This repository currently contains `README.md`, `CONCEPT.md`, and this guide. Application source, tests, assets, and build configuration have not been created yet. Keep product decisions documented in `CONCEPT.md` until implementation begins. The discussed candidate stack is Next.js App Router, TypeScript, Tailwind CSS, a web manifest/service worker for PWA support, and `localStorage` for favorites; it has not been finalized or implemented. Once chosen, keep routes in `app/`, reusable UI in `components/`, shared logic in `lib/`, static assets in `public/`, and tests beside the code or in `tests/`.

Preserve the MVP boundary: one responsive desktop web and mobile PWA experience, per-device favorites, and no accounts or cloud sync. Keep Nudge focused on one small activity at a time. Reminders must be user-requested and configurable; streaks are optional. Do not describe Nudge as a health or therapy app.

## Build, Test, and Development

No build, test, or development commands are configured yet because this folder has no `package.json` or lockfile. After scaffolding, document the actual package manager and scripts here. Run commands through those scripts (for example, `npm run dev`) only when they exist; do not add dependencies or assume a toolchain without checking the project configuration.

## Coding Style & Naming

No formatter or lint rules are configured. Follow repository configuration once added. If the discussed React/TypeScript stack is adopted, use two-space indentation unless the formatter specifies otherwise, PascalCase for React components, camelCase for functions and variables, and clear kebab-case names for standalone files. Keep UI components focused and put reusable selection or timer logic in shared modules.

## Testing Guidelines

No test framework or coverage target exists yet. When tests are introduced, add a documented package script and cover the behavior changed. For activity selection, include cases for available time, goal, mood, location, and equipment; for the timer, cover pause, early exit, completion, and restarting the flow.

## Commits and Pull Requests

Git history currently contains one `Initial commit`, which is too little to establish a commit convention. Use short imperative Conventional Commit subjects, such as `feat: add activity timer`. Pull requests should explain the user-facing change, list verification performed, link related issues when available, and include screenshots for UI changes.

## Configuration and Privacy

Do not introduce accounts, cloud synchronization, or collection of journaling text without an explicit product decision. Keep user reminders under user control, and avoid logging sensitive user-entered content.
