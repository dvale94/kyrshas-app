# Legacy Expo showcase

This isolated workspace adapts the original home screen and navigation using synthetic local content and bundled substitute images. Owner visual approval is pending. See the [assessment and differences](../../.agentic/reports/issue-32-legacy-showcase.md).

Use Node 22.23.4 and npm 10.9.9. Install and start the legacy app in a matching SDK 58 Expo Go client:

```sh
cd showcase/legacy-expo
npm ci
npm start
```

Legacy Metro uses port 8082. Run the unchanged modern app independently on its default port 8081:

```sh
cd modernization/expo-next
npm ci
npm start
```

Commands assume they are run from the repository root before changing directories. On a physical iPhone, follow the [Expo Go SDK compatibility guidance](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/); the installed client must match SDK 58. Both Metro servers have been checked concurrently; device runtime remains to be verified. No live content provider or historical credential is required.
