# panamaprophet.com

A static React site (Vite) on GitHub Pages, plus a small AWS API that talks to SoundCloud.
Releases and their tracks are part of the site; the API only fetches a track's (expiring) stream link when it's played.

```
packages/site/    the site (Vite + React), organised by Feature-Sliced Design
packages/api/     the API's Lambdas and their CDK app
```

npm workspaces: run everything from the repo root.

## Site

| Layer | Slices |
| --- | --- |
| `app` | `index.tsx` (mounts the app), `index.css` |
| `pages` | `home`: the releases (`model`) and the page |
| `widgets` | `header`, `footer` (with the social links), `release` |
| `features` | `playback`: one page-wide player; plays through the tracks of all releases in page order |
| `entities` | `release`, `track` |
| `shared` | `ui` (`Icon`, `Layout`, `Links`), `lib/audio` (audio element + hls.js) |

Components are `Component/index.tsx` + `Component/index.css` (plain CSS, class names prefixed with the component).
A component used in one place lives next to it (e.g. `widgets/header/ui/Logo`, used by `Header`); only shared ones go to `shared/ui`.

## API

An HTTP API (API Gateway) with one Lambda per route. Each runs its own export of the same bundle
(`src/handlers/index.ts`).

| | |
| --- | --- |
| `GET /api/stream?url=<track url>` | `handlers/stream`: a freshly signed stream URL of a public SoundCloud track. |

| | |
| --- | --- |
| `src/shared/soundcloud-api` | The SoundCloud client: API calls (`client`) and the OAuth token (`auth`). Credentials and token are SSM SecureStrings under `/www-panamaprophet-com/soundcloud` (`auth/secrets.ts`); the Lambdas write `token` themselves, so it's shared between them and across cold starts. |
| `src/shared/parameter-store` | Reads and writes SSM SecureStrings. |
| `src/shared/response` | JSON responses. |
| `cdk/index.ts` | The stack. |

## Scripts

| | |
| --- | --- |
| `npm run dev` | Dev server. Set `VITE_STREAM_API_URL` in `packages/site/.env` (see `.env.example`). |
| `npm run build` | Builds the site into `packages/site/dist`. |
| `npm run typecheck` / `npm run lint` | |
| `npm run cdk -- <command>` | AWS CDK CLI for `packages/api`. |

## Running locally

The API runs in Docker with SAM CLI, the site points at it:

```sh
npm run cdk -- synth --quiet
(cd packages/api && sam local start-api -t cdk.out/www-panamaprophet-com.template.json --port 3001 --region eu-west-1)

echo 'VITE_STREAM_API_URL=http://127.0.0.1:3001' > packages/site/.env.local
npm run dev
```

- The Lambdas run with your AWS credentials: they read the real SSM parameters and share the stored token with production.
- `sam` serves the bundle of the last synth: synth again and restart it after changing the API.
- If `sam` can't find Docker Desktop: `export DOCKER_HOST=unix://$HOME/.docker/run/docker.sock`.

## Deployment

Every push to `main` runs checks, deploys the API with CDK, and publishes the site to GitHub Pages.
A new release only needs an entry in `packages/site/src/pages/home/model`, with the title, duration and SoundCloud URL of each track.

### One-time setup

1. **AWS** (in `eu-west-1`, with admin credentials):
   ```sh
   aws ssm put-parameter --type SecureString --name /www-panamaprophet-com/soundcloud/client-id --value '…'
   aws ssm put-parameter --type SecureString --name /www-panamaprophet-com/soundcloud/client-secret --value '…'
   npm run cdk -- bootstrap
   npm run cdk -- deploy         # prints the API url
   ```
   A deploy user for GitHub Actions. It may only assume the roles `cdk bootstrap` created, which do the actual deploy:
   ```sh
   ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
   aws iam create-user --user-name panamaprophet-deploy
   aws iam put-user-policy --user-name panamaprophet-deploy --policy-name cdk-deploy --policy-document \
     "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"sts:AssumeRole\",\"Resource\":\"arn:aws:iam::$ACCOUNT:role/cdk-*\"}]}"
   aws iam create-access-key --user-name panamaprophet-deploy   # prints AccessKeyId and SecretAccessKey
   ```
2. **GitHub → Settings**
   - Pages: source **GitHub Actions**, custom domain `panamaprophet.com`, enforce HTTPS.
   - Actions secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (the deploy user's key).
   - Actions variables: `AWS_REGION` = `eu-west-1`.
3. **DNS**: point `panamaprophet.com` at GitHub Pages
   (`A` 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `www` → `CNAME panamaprophet.github.io`).
