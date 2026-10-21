# LoveFlix (beta)

Short-form romance streaming demo. Expo SDK 58 · React Native 0.88 · React 19.3 · Expo Router 58 · TypeScript.

## Run

```bash
npm install
npx expo start          # scan with Expo Go (SDK 58)
```

Everything in the project runs in Expo Go. Use a dev build only once you add a native module Expo Go doesn't ship:
`npx eas-cli@latest build --profile development`.

## Share with reviewers

```bash
npx eas-cli@latest init                      # once: links the project, writes projectId
npm run build:preview:android                # installable APK via link
npm run update:preview                       # push JS changes OTA to that build
```

Change `ios.bundleIdentifier` / `android.package` in `app.json` before the first build.

## Structure

```
src/
  app/                       Expo Router routes (files here are screens only)
    _layout.tsx              fonts, splash, store hydration, providers, auth guard (Stack.Protected)
    (auth)/welcome.tsx       01 Welcome
    (app)/(tabs)/            Home · Discover · Romance · Library · Profile (custom TabBar)
    (app)/series/[id].tsx    03 Series detail
    (app)/player/[seriesId]  04/05 Vertical episode player (fullScreenModal), ?episode=n
    (app)/unlock.tsx         06 Unlock sheet (native formSheet), ?episodeId=
    (app)/store.tsx          07 Coin store
  components/ui              Text, Screen, QueryState, RoutePlaceholder (temporary)
  components/navigation      TabBar
  theme/                     colors, typography (Inter + Playfair Display), spacing, nav theme
  types/content.ts           domain models
  data/                      mock catalogue + static image registry
  services/catalog.ts        async service layer; swap bodies for real API calls later
  hooks/use-catalog.ts       TanStack Query hooks over the service
  store/                     zustand + AsyncStorage: session, wallet (coins/unlocks/VIP), library
  lib/                       query client, storage adapter, formatters
```

## Conventions

- Add packages with `npx expo install`, never bare npm, so versions match the SDK.
- Screens use `Text` from `@/components/ui` and tokens from `@/theme`; no raw hex or font names.
- Server-shaped data goes through `services/` + query hooks. Client state (session, wallet, saved) lives in `store/`.
- `RoutePlaceholder` marks unbuilt screens. Replace it per screen as the UI lands.
- Before committing: `npm run typecheck && npm run lint`.
# love-fix
