# Kyrsha's App (React Native + Expo)
I built this app for a friend who wanted to have their own app for daily quotes, information, and inspiration. 
I used React Native and Expo. I am no product designer, so I know the UI could look better. The app is using a 
third party API to retrieve the random content.

## Run the apps

Use Node 22.23.4 and npm 10.9.9. Run the original app from the repository root:

```sh
npm ci
npm start
```

The original app serves Metro on port 8082. Its card text and random images use the root `.env` variable `EXPO_PUBLIC_API_KEY` for API Ninjas. Expo public environment variables are included in the app bundle and must not be treated as private. The free-tier image requests are unfiltered. If the key or network is unavailable, cards show an unavailable message and can be retried.

Run Afterglow independently in a separate terminal:

```sh
cd modernization/expo-next
npm ci
npm start
```

Afterglow uses port 8081. Both apps require an Expo Go client compatible with SDK 58.

## Preview
https://github.com/dvale94/kyrshas-app/assets/42619593/d20cb172-8187-4a29-9dd5-cc07be7c4d63

https://github.com/dvale94/kyrshas-app/assets/42619593/4f39a8b7-b20b-4873-8b74-21c1a4c29ee5
