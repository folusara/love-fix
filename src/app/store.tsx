import { useState } from "react";

import { useLocalSearchParams } from "expo-router";

import { NavHeader, Screen } from "@/components/layout";
import {
  BalanceCard,
  CoinPackCard,
  LockedEpisodeSummary,
  PurchaseFooter,
  VipCard,
} from "@/components/monetization";
import { Divider, Grid, SectionHeader } from "@/components/ui";
import {
  COIN_PACKS,
  DEFAULT_PACK_ID,
  getEpisodes,
  getSeriesById,
  VIP_PERIOD,
  VIP_PRICE,
} from "@/data";
import { useAppStore } from "@/state/AppStore";
import { nav, UnlockOrigin } from "@/state/navigation";

const MOCK_PURCHASE_MS = 900;

// Coin store. Opened from the paywall (with context) or from profile/library (without).
export default function StoreScreen() {
  const params = useLocalSearchParams<{
    seriesId?: string;
    episode?: string;
    origin?: UnlockOrigin;
  }>();
  const origin: UnlockOrigin =
    params.origin === "details" ? "details" : "player";
  const { coins, isVip, addCoins, activateVip, unlockWithCoins } =
    useAppStore();
  const [selectedId, setSelectedId] = useState(DEFAULT_PACK_ID);
  const [purchasing, setPurchasing] = useState(false);

  const series = params.seriesId ? getSeriesById(params.seriesId) : undefined;
  const lockedEpisode =
    series && params.episode
      ? getEpisodes(series)[Number(params.episode) - 1]
      : undefined;
  const pack = COIN_PACKS.find((p) => p.id === selectedId) ?? COIN_PACKS[0];

  /** Unlock the pending episode and close store + paywall in one step. Returns false if still short. */
  const unlockPendingAndReturn = (): boolean => {
    if (!series || !lockedEpisode) return false;
    if (
      unlockWithCoins(
        series.id,
        lockedEpisode.number,
        lockedEpisode.coinCost,
      ) !== "unlocked"
    )
      return false;
    nav.completeUnlock({
      seriesId: series.id,
      episode: lockedEpisode.number,
      origin,
      depth: 2,
    });
    return true;
  };

  const handleBuy = () => {
    setPurchasing(true);
    setTimeout(() => {
      addCoins(pack.coins + pack.bonus);
      setPurchasing(false);
      // Came here from a paywall: buying coins should finish the job, not strand the user on the store
      unlockPendingAndReturn();
    }, MOCK_PURCHASE_MS);
  };

  const handleVip = () => {
    activateVip();
    if (series && lockedEpisode)
      nav.completeUnlock({
        seriesId: series.id,
        episode: lockedEpisode.number,
        origin,
        depth: 2,
      });
  };

  return (
    <Screen
      footer={
        <PurchaseFooter
          title={`Buy ${pack.coins.toLocaleString()} coins`}
          subtitle={`for ${pack.price}`}
          loading={purchasing}
          onPress={handleBuy}
        />
      }
    >
      <NavHeader title={lockedEpisode ? "Unlock episode" : "Coin store"} />

      {series && lockedEpisode ? (
        <LockedEpisodeSummary
          series={series}
          episode={lockedEpisode}
          canAfford={coins >= lockedEpisode.coinCost}
          onUnlock={unlockPendingAndReturn}
        />
      ) : null}

      <BalanceCard coins={coins} />

      <SectionHeader title="Recharge coins" kind="rail" />
      <Grid
        data={COIN_PACKS}
        keyExtractor={(p) => p.id}
        renderItem={(p) => (
          <CoinPackCard
            pack={p}
            selected={p.id === selectedId}
            onPress={(next) => setSelectedId(next.id)}
          />
        )}
      />

      <Divider label="or best deal" />
      <VipCard
        price={VIP_PRICE}
        period={VIP_PERIOD}
        active={isVip}
        onPress={handleVip}
      />
    </Screen>
  );
}
