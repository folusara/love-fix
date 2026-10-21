import { router } from "expo-router";

/** Where the paywall was opened from, so a successful unlock can land in the right place. */
export type UnlockOrigin = "player" | "details";

interface CompleteUnlockArgs {
  seriesId: string;
  episode: number;
  origin: UnlockOrigin;
  /** How many screens to pop: 1 from the paywall sheet, 2 from the coin store (store + sheet). */
  depth: 1 | 2;
}

const watchHref = (id: string, episode: number) => ({
  pathname: "/watch/[id]" as const,
  params: { id, episode: String(episode) },
});

// Every route push lives here so screens never hand-build paths
export const nav = {
  enterApp: () => router.replace("/(tabs)"),
  signOut: () => router.replace("/"),
  series: (id: string) =>
    router.push({ pathname: "/series/[id]", params: { id } }),
  watch: (id: string, episode = 1) => router.push(watchHref(id, episode)),
  unlock: (seriesId: string, episode: number, origin: UnlockOrigin) =>
    router.push({
      pathname: "/unlock/[seriesId]",
      params: { seriesId, episode: String(episode), origin },
    }),
  store: (params?: {
    seriesId: string;
    episode: number;
    origin: UnlockOrigin;
  }) =>
    router.push({
      pathname: "/store",
      params: params
        ? {
            seriesId: params.seriesId,
            episode: String(params.episode),
            origin: params.origin,
          }
        : {},
    }),
  /**
   * Close the paywall (and store) in ONE dismiss, then make sure the episode is playing.
   * - From the player: popping reveals the feed, which re-renders the page as unlocked and plays it.
   * - From series details: popping reveals the detail screen, so we push the player at that episode.
   * A single dismiss(n) avoids the race where two back() calls in a row drop the second one.
   */
  completeUnlock: ({
    seriesId,
    episode,
    origin,
    depth,
  }: CompleteUnlockArgs) => {
    if (router.canDismiss()) router.dismiss(depth);
    else router.back();
    if (origin === "details") router.push(watchHref(seriesId, episode));
  },
  back: () => (router.canGoBack() ? router.back() : router.replace("/(tabs)")),
};
