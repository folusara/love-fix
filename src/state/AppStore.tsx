import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { STARTING_COINS } from "@/data";
import { Series } from "@/types";

interface AppState {
  coins: number;
  isVip: boolean;
  unlockedEpisodes: Record<string, number[]>;
  unlockedSeasons: string[];
  savedSeriesIds: string[];
}

export type UnlockResult = "unlocked" | "insufficient-coins";

interface AppStoreValue extends AppState {
  isEpisodeLocked: (series: Series, episodeNumber: number) => boolean;
  unlockWithCoins: (
    seriesId: string,
    episodeNumber: number,
    cost: number,
  ) => UnlockResult;
  unlockSeasonWithCoins: (seriesId: string, cost: number) => UnlockResult;
  unlockForFree: (seriesId: string, episodeNumber: number) => void;
  addCoins: (amount: number) => void;
  activateVip: () => void;
  toggleSaved: (seriesId: string) => void;
  isSaved: (seriesId: string) => boolean;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

const INITIAL_STATE: AppState = {
  coins: STARTING_COINS,
  isVip: false,
  unlockedEpisodes: {},
  unlockedSeasons: [],
  savedSeriesIds: ["der-ceo-und-ich", "dunkle-begierde"],
};

const withEpisode = (
  map: Record<string, number[]>,
  seriesId: string,
  episodeNumber: number,
) => ({
  ...map,
  [seriesId]: Array.from(new Set([...(map[seriesId] ?? []), episodeNumber])),
});

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  /**
   * Synchronous mirror of state. Lets "buy coins → unlock" run in the same tick
   * (React state would still hold the old balance) and blocks double-spend on rapid taps.
   */
  const stateRef = useRef(state);

  const commit = useCallback((update: (prev: AppState) => AppState) => {
    stateRef.current = update(stateRef.current);
    setState(stateRef.current);
  }, []);

  const isEpisodeLocked = useCallback(
    (series: Series, episodeNumber: number) =>
      !state.isVip &&
      episodeNumber > series.freeEpisodes &&
      !state.unlockedSeasons.includes(series.id) &&
      !state.unlockedEpisodes[series.id]?.includes(episodeNumber),
    [state.isVip, state.unlockedSeasons, state.unlockedEpisodes],
  );

  const unlockWithCoins = useCallback(
    (seriesId: string, episodeNumber: number, cost: number): UnlockResult => {
      if (stateRef.current.coins < cost) return "insufficient-coins";
      commit((prev) => ({
        ...prev,
        coins: prev.coins - cost,
        unlockedEpisodes: withEpisode(
          prev.unlockedEpisodes,
          seriesId,
          episodeNumber,
        ),
      }));
      return "unlocked";
    },
    [commit],
  );

  const unlockSeasonWithCoins = useCallback(
    (seriesId: string, cost: number): UnlockResult => {
      if (stateRef.current.coins < cost) return "insufficient-coins";
      commit((prev) => ({
        ...prev,
        coins: prev.coins - cost,
        unlockedSeasons: [...prev.unlockedSeasons, seriesId],
      }));
      return "unlocked";
    },
    [commit],
  );

  const unlockForFree = useCallback(
    (seriesId: string, episodeNumber: number) =>
      commit((prev) => ({
        ...prev,
        unlockedEpisodes: withEpisode(
          prev.unlockedEpisodes,
          seriesId,
          episodeNumber,
        ),
      })),
    [commit],
  );

  const addCoins = useCallback(
    (amount: number) =>
      commit((prev) => ({ ...prev, coins: prev.coins + amount })),
    [commit],
  );

  const activateVip = useCallback(
    () => commit((prev) => ({ ...prev, isVip: true })),
    [commit],
  );

  const toggleSaved = useCallback(
    (seriesId: string) =>
      commit((prev) => ({
        ...prev,
        savedSeriesIds: prev.savedSeriesIds.includes(seriesId)
          ? prev.savedSeriesIds.filter((id) => id !== seriesId)
          : [...prev.savedSeriesIds, seriesId],
      })),
    [commit],
  );

  const isSaved = useCallback(
    (seriesId: string) => state.savedSeriesIds.includes(seriesId),
    [state.savedSeriesIds],
  );

  const value = useMemo<AppStoreValue>(
    () => ({
      ...state,
      isEpisodeLocked,
      unlockWithCoins,
      unlockSeasonWithCoins,
      unlockForFree,
      addCoins,
      activateVip,
      toggleSaved,
      isSaved,
    }),
    [
      state,
      isEpisodeLocked,
      unlockWithCoins,
      unlockSeasonWithCoins,
      unlockForFree,
      addCoins,
      activateVip,
      toggleSaved,
      isSaved,
    ],
  );

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}

export const useAppStore = (): AppStoreValue => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
};
