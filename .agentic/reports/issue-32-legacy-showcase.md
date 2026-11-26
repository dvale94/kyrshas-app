# Issue #32 — legacy Expo showcase (in progress)

## Baseline and assessment

The baseline is `e3babc05ee077da1f95439353fe9e2b4184f260b`; the last commit touching the inspected legacy entry, home screen and provider paths is `5a6dc07e5caca78495128253df8c1e69229aedea`. The original app uses an Expo 49 JavaScript stack, a green header, a vertically scrolling FlatList, and five cards in quote, trivia, fact, dad joke and bucket-list order. Original content includes per-card refresh, attribution and trivia answer toggling. Quote, fact and bucket-list images came from a remote provider. Birthday data is excluded by issue #32.

Expo 49 and its native dependencies cannot be assumed to run in a current Expo Go client. The showcase aligns Expo 58, React 19.3 and React Native 0.88 with the modern workspace; Expo Go must match its SDK. See [Expo SDK reference](https://docs.expo.dev/versions/v58.0.0/) and [Expo Go version mismatch guidance](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/). The original navigation 6 stack is retained. Expo's bundled native module map supplies gesture-handler 3.3, screens 4.30, safe-area context 5.11 and font 58.0.12. Node 22.23.4/npm 10.9.9 are pinned. The original `@rneui/themed` image/icon use is replaced with a native view and Expo FontAwesome; PropTypes and original Axios/provider transport are omitted. The old root manifest and configuration are not copied.

## Known differences and incomplete work

- Safe synthetic fixture pairs replace random provider text, attribution and answers; refresh advances deterministically, independently for each card. No provider requests or credentials are used.
- The three remote image cards use bundled Afterglow quote, fact and bucket-list artwork, copied byte-for-byte from the existing modern workspace. These substitutes have different content and composition from the original randomly fetched photos; historical image fidelity is not claimed.
- The birthday path is excluded. Native safe-area context replaces the deprecated React Native safe-area view. Refresh clears its spinner even on an error. Accessibility labels were added to refresh controls. Display name and slug distinguish the showcase; historical splash and icon configuration are not copied.
- Navigation 6 and its stack are retained for fidelity but npm reports those packages are unsupported. The original splash/icon configuration is not copied. Physical Expo Go behavior and owner visual approval remain outstanding; a bundle alone does not establish them.

## Verification so far

- PASS: strict OpenSpec validation of the new change and all 15 active changes before showcase implementation.
- PASS: clean locked `npm ci --no-audit --no-fund`, three showcase component/fixture tests, public Expo config, online SDK dependency check, Expo Doctor 20/20 and iOS JavaScript export including all three local images. The tests cover card order, independent refresh, trivia toggle and image-backed rendering; these checks do not establish actual device behavior. No standalone JavaScript typecheck is configured.
- Earlier Doctor attempts failed on a missing lockfile and missing direct `expo-font` peer, then only the lockfile; both were addressed before the passing run. The new image test initially failed due to Jest loading an ancestor Expo dependency and then due to an unsupported query; mocking the icon and correcting the query yielded the passing tests.
- PASS: unchanged modern full `npm run verify` using Node 22.23.4 with network access: 140 Jest tests, Expo Doctor 20/20 and 38 policy tests. The initial sandboxed run failed two Doctor network checks; the network-enabled rerun passed.
- PASS: root `python3 scripts/doctor.py` and Python syntax check.
- PASS: legacy and modern Metro servers ran concurrently on localhost ports 8082 and 8081 respectively, and each returned `packager-status:running`. This verifies server coexistence, not app runtime.
- Gortex impact was reviewed and the covering tests passed. Its contract still reports a high-risk warning and incomplete test-coverage edges; no guard rules are configured. This warning is not a runtime result.
- BLOCKED: the sandboxed simulator service was unavailable. Host access allowed a new isolated iPhone 17/iOS 27.2 simulator and official Expo Go 58.0.7 installation. Opening the local project stopped at iOS's “Open in Expo Go?” confirmation; Simulator.app was unavailable to interact with it. Expo Go launch of the showcase, UI interactions and product screenshots were therefore not verified. Temporary prompt screenshots are not product evidence. The dedicated simulator was shut down; existing simulators were not changed. No owner legacy visual approval is claimed.
- NOT RUN: hosted CI, final native preservation comparison, physical iPhone runtime. No native projects were generated. Original and modern tracked runtime files have not been modified.
