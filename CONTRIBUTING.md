# Contributing to Kettle UI

Thanks for helping. Bug fixes, new components, docs fixes and accessibility improvements are all welcome.

## Run it locally

Node 20.9 or newer.

```bash
git clone https://github.com/apurvamukherjee/kettle-ui.git
cd kettle-ui
npm install
npm run dev          # http://localhost:3000
```

## Checks

There is no test suite yet. CI runs these on every push and pull request to `main`, so run them before you open a PR:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run build        # static export to out/
```

## Changing or adding a component

1. Components live in `components/` (`kit/`, `motion/`, `illustrations/`, `cursor/`, `drag/`). Colour tokens and keyframes live in `app/globals.css`.
2. New component: add its entry, npm dependencies and registry dependencies to `scripts/build-registry.mjs`. If it needs new CSS variables or keyframes, add them to the `kettle-theme` item there as well as to `app/globals.css`.
3. Run `npm run registry`. This rewrites `registry.json` and `public/r/*.json`. Commit those generated files with your change, because the shadcn CLI installs from them.
4. Add a demo to the docs site so people can see it (`components/docs/demos.tsx` or `gallery-demos.tsx`).

## Code style

- TypeScript strict. Avoid `any`.
- Function components and hooks.
- Tailwind classes using the theme tokens (`bg-tunes`, `border-ink`, `shadow-hard`) rather than raw hex values.
- Respect `prefers-reduced-motion` and touch screens, like the existing components do.
- Comments explain why, not what.

## Pull requests

1. Fork the repo and branch from `main` (`fix/field-id`, `feat/toggle`).
2. Keep each PR to one change. Include a screenshot or short clip for anything visual.
3. Make sure the checks above pass, then open the PR against `main` and describe what changed and why.

## Issues and questions

- Bugs and feature requests: [open an issue](https://github.com/apurvamukherjee/kettle-ui/issues/new/choose) using a template.
- Questions and ideas: [Discussions](https://github.com/apurvamukherjee/kettle-ui/discussions).
- New to the project? Look for issues labelled [`good first issue`](https://github.com/apurvamukherjee/kettle-ui/labels/good%20first%20issue).

**Response time:** every new issue and PR gets a first reply within one day. A fix may take longer, but you won't be left without an answer.
