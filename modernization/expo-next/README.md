# Isolated iPhone Expo scaffold

Local-only API experiment: see [owner setup, mode gates, endpoint mapping and rollback](../../docs/migration/expo-next-local-content.md). Mocks remain default. The owner alone creates the ignored app-root `.env.local` privately; `.env.example` contains placeholders only. `npm start` intentionally disables dotenv; use the guide's explicit direct CLI command to opt into live development. Keys are visible in Metro JS bundles. Live-provider acceptance is NOT RUN pending separate owner authorization; future distribution requires a server-side proxy/Worker and a new scoped key. No backend or deployment infrastructure is included.

Issue #5 demonstration only. The original application is preserved at the repository root. No backend, credentials or EAS login is required.

```sh
cd modernization/expo-next
nvm use                 # Node 22.23.4, npm 10.9.9
npm ci
CI=1 npm run verify
```

`npm start` runs Metro; `npm run export:ios` compiles an iOS JS bundle locally into ignored `dist/`. Neither proves simulator/device behavior. Keep credentials out of the environment; Expo scripts disable dotenv loading. Install dependencies only in this directory.

The offline synthetic trivia demo tests answer reveal/hide. Name/version/build are a provisional scaffold baseline, not an approved release value. Existing icon/splash sources are referenced read-only from `../../assets/`; native asset provenance is unresolved. No native projects, signing, registration or updates service is configured for delivery.

See [baseline, native comparison and exact checks](../../docs/migration/expo-next-baseline.md) and [issue report](../../.agentic/reports/issue-5-expo-scaffold.md). Do not replace the legacy app or ignored `ios/` tree with this scaffold.
