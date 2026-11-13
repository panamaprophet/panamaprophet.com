# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

An npm-workspaces monorepo: `packages/site` (static Vite + React site on GitHub Pages) and `packages/api` (Lambdas behind an API Gateway HTTP API, deployed with CDK, proxying SoundCloud). README.md covers one-time AWS/GitHub/DNS setup.

## Commands

Run everything from the repo root (Node 24, see `.nvmrc`).

```sh
npm run dev                      # site dev server (needs VITE_STREAM_API_URL in packages/site/.env.local)
npm run build                    # site → packages/site/dist
npm run typecheck                # tsc -b over all project references (site app, vite config, api + cdk)
npm run lint
npm run cdk -- synth --quiet     # any CDK command: npm run cdk -- <command>
```

There is no test suite. CI (`.github/workflows/checks.yml`) runs exactly typecheck, lint, build and `cdk synth`; run these to validate a change.

Local API: `npm run cdk -- synth --quiet`, then `cd packages/api && sam local start-api -t cdk.out/www-panamaprophet-com.template.json --port 3001 --region eu-west-1`, and point the site at `http://127.0.0.1:3001`. SAM serves the bundle of the last synth, so re-synth and restart after API changes. Local Lambdas run with the developer's AWS credentials against the real SSM parameters and SoundCloud, sharing the stored token with production.

## Architecture

**Data flow.** Releases and their tracks are static data in `packages/site/src/pages/home/model`; each track is `{ title, duration: 'm:ss', url }` with a public SoundCloud track URL. Nothing is fetched at build time. The page hands all tracks, in page order, to the player once (`playback.setQueue`). On play, the site calls `GET <VITE_STREAM_API_URL>/api/stream?url=<track url>` and gets `{ url, protocol: 'hls' | 'progressive' }`. Signed stream URLs expire, so one is fetched per play and again on the single automatic retry.

**Playback (site).** `features/playback/model` is a module-level store read via `useSyncExternalStore`; the current track is identified by its URL. `shared/lib/audio` owns one audio element outside the React tree: HLS goes through lazily imported `hls.js/light` where Media Source Extensions exist and plays natively otherwise (iPhone). `unlock()` must run synchronously inside the click handler, before any `await` (iOS autoplay rules). The retry budget is refilled only by a click or auto-advance, never by a successful `play()`.

**API.** One Lambda per route, all bundled from the single entry `packages/api/src/handlers/index.ts`, which re-exports each `handlers/<name>/index.ts` `handler` under a unique name; CDK's `NodejsFunction` selects it via `handler: '<name>'`. Adding a route means a new handler folder, a re-export there, and a function + route in `cdk/index.ts`.

**SoundCloud auth** (`src/shared/soundcloud-api/auth`). Access token: in-memory → SSM SecureString `/www-panamaprophet-com/soundcloud/token` → renew (refresh grant, falling back to `client_credentials` with HTTP Basic) and store back to SSM. Client id/secret are SSM SecureStrings too. The token is persisted and shared because SoundCloud limits `client_credentials` tokens (50 per 12h per app). Concurrent renewals can log a harmless SSM `TooManyUpdates` warning. Parameter names live in `auth/secrets.ts` (`PARAMETERS`) and the CDK app imports them for IAM grants. Stream URLs on `api.soundcloud.com` are turned into signed URLs by following the redirect manually (`client/toPlayableUrl`).

**Infrastructure and deploy.** Stack `www-panamaprophet-com`; region and allowed CORS origins come from `packages/api/cdk.json` context. The stack output `url` is read by `.github/workflows/deploy.yml` and baked into the site build as `VITE_STREAM_API_URL`. A push to `main` runs checks → `cdk deploy` → site build → GitHub Pages.

## Conventions

- API and CDK TypeScript runs directly on Node (type stripping, `node cdk/index.ts`): relative imports carry `.ts` extensions and only erasable syntax is allowed (`erasableSyntaxOnly`: no enums, namespaces or parameter properties).
- The site follows Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`); slices expose a public `index.ts`, and `@/` maps to `packages/site/src`. Code used in one place lives next to its consumer; only genuinely shared code goes to `shared`.
- Components are `Component/index.tsx` + `Component/index.css`: plain CSS, class names prefixed with the component (`track-list__title`, `track-list__track_active`).
- No code comments; one blank line between imports and code.
- Prefer explicit, simple code over clever mechanisms, and keep tooling minimal (no prerendering, extra build steps or architecture linters).
