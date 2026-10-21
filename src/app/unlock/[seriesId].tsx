import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { RewardedAdModal, UnlockOptionCard } from "@/components/monetization";
import { MediaThumb } from "@/components/series";
import { AppText, Button, Card } from "@/components/ui";
import {
  getEpisodes,
  getSeriesById,
  SEASON_COIN_COST,
  VIP_PERIOD,
  VIP_PRICE,
} from "@/data";
import { useAppStore } from "@/state/AppStore";
import { nav, UnlockOrigin } from "@/state/navigation";
import { spacing } from "@/theme";
import { UnlockMethod } from "@/types";

/** iOS ignores navigation while a native Modal is still animating out; wait for it to finish. */
const MODAL_DISMISS_MS = 350;

// Paywall sheet shown after the cliffhanger. One CTA, four ways to pay.
export default function UnlockSheet() {
  const params = useLocalSearchParams<{
    seriesId: string;
    episode: string;
    origin?: UnlockOrigin;
  }>();
  const origin: UnlockOrigin =
    params.origin === "details" ? "details" : "player";
  const { unlockWithCoins, unlockSeasonWithCoins, unlockForFree, activateVip } =
    useAppStore();
  const [method, setMethod] = useState<UnlockMethod>("season");
  const [adVisible, setAdVisible] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  const series = getSeriesById(params.seriesId);
  const ep = series
    ? getEpisodes(series)[Number(params.episode) - 1]
    : undefined;

  const finish = useCallback(() => {
    if (series && ep)
      nav.completeUnlock({
        seriesId: series.id,
        episode: ep.number,
        origin,
        depth: 1,
      });
  }, [series, ep, origin]);

  // Navigate only after the ad modal has fully closed
  useEffect(() => {
    if (!rewarded || adVisible) return;
    const id = setTimeout(finish, MODAL_DISMISS_MS);
    return () => clearTimeout(id);
  }, [rewarded, adVisible, finish]);

  if (!series || !ep) return null;

  const OPTIONS: {
    id: UnlockMethod;
    title: string;
    subtitle: string;
    price: string;
    ribbon?: string;
  }[] = [
    {
      id: "episode",
      title: "Unlock episode",
      subtitle: "One-time access",
      price: `${ep.coinCost} coins`,
    },
    {
      id: "season",
      title: "Unlock full season",
      subtitle: `Episodes ${ep.number}–${series.episodeCount}`,
      price: `${SEASON_COIN_COST} coins`,
      ribbon: "Best value",
    },
    {
      id: "vip",
      title: "Premium membership",
      subtitle: "Unlimited access",
      price: `${VIP_PRICE}/${VIP_PERIOD}`,
    },
    {
      id: "ad",
      title: "Watch a short ad",
      subtitle: "Unlock this episode free",
      price: "Free",
    },
  ];

  const handleUnlock = () => {
    if (method === "ad") {
      setAdVisible(true);
      return;
    }
    if (method === "vip") {
      activateVip();
      finish();
      return;
    }
    const result =
      method === "episode"
        ? unlockWithCoins(series.id, ep.number, ep.coinCost)
        : unlockSeasonWithCoins(series.id, SEASON_COIN_COST);
    if (result === "insufficient-coins") {
      nav.store({ seriesId: series.id, episode: ep.number, origin });
      return;
    }
    finish();
  };

  const handleRewarded = () => {
    unlockForFree(series.id, ep.number);
    setRewarded(true);
    setAdVisible(false);
  };

  return (
    <View style={styles.backdrop}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={nav.back}
        accessibilityLabel="Close"
      />
      <SafeAreaView
        edges={["top", "bottom"]}
        style={styles.safe}
        pointerEvents="box-none"
      >
        <ScrollView
          contentContainerStyle={styles.center}
          showsVerticalScrollIndicator={false}
        >
          <Card padding={spacing.xxl} style={styles.card}>
            <View style={styles.hero}>
              <MediaThumb
                uri={series.poster}
                width={130}
                height={170}
                locked
                lockLabel="Locked"
              />
              <AppText variant="h3" color="primary">
                Episode {ep.number}
              </AppText>
              <AppText variant="h1" align="center">
                Continue the romance
              </AppText>
              <AppText variant="body" color="textMuted" align="center">
                Unlock the next episode and find out what happens next.
              </AppText>
            </View>

            {OPTIONS.map((option) => (
              <UnlockOptionCard
                key={option.id}
                {...option}
                selected={method === option.id}
                onPress={() => setMethod(option.id)}
              />
            ))}

            <Button
              title={method === "ad" ? "Watch ad" : "Unlock now"}
              icon={method === "ad" ? "tv" : "lock"}
              size="lg"
              glow
              onPress={handleUnlock}
            />
            <Button title="Maybe later" variant="ghost" onPress={nav.back} />
          </Card>
        </ScrollView>
      </SafeAreaView>
      <RewardedAdModal
        visible={adVisible}
        onRewarded={handleRewarded}
        onClose={() => setAdVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(3,3,8,0.88)" },
  safe: { flex: 1 },
  center: { flexGrow: 1, justifyContent: "center", padding: spacing.xl },
  card: { gap: spacing.lg },
  hero: { alignItems: "center", gap: spacing.md, marginBottom: spacing.sm },
});
