import { memo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { EPISODE_CLIP_SECONDS } from "@/data";
import { gradients, spacing } from "@/theme";
import { FeedItem } from "@/types";

import { EpisodeInfo } from "./EpisodeInfo";
import { LockOverlay } from "./LockOverlay";
import { PlayerActionRail } from "./PlayerActionRail";
import { ProgressBar } from "./ProgressBar";
import { VideoLayer } from "./VideoLayer";

export type EpisodeCtaMode = "open-series" | "none";

interface EpisodePageProps {
  item: FeedItem;
  height: number;
  isActive: boolean;
  locked: boolean;
  ctaMode: EpisodeCtaMode;
  bottomInset: number;
  onEnded: () => void;
  onUnlock: (item: FeedItem) => void;
  onOpenSeries: (item: FeedItem) => void;
}

function EpisodePageBase({
  item,
  height,
  isActive,
  locked,
  ctaMode,
  bottomInset,
  onEnded,
  onUnlock,
  onOpenSeries,
}: EpisodePageProps) {
  const [progress, setProgress] = useState(0);
  const { series, episode } = item;

  const cta = locked
    ? {
        label: "Unlock",
        icon: "lock" as const,
        variant: "muted" as const,
        onPress: () => onUnlock(item),
      }
    : ctaMode === "open-series"
      ? {
          label: "Watch",
          icon: "play" as const,
          onPress: () => onOpenSeries(item),
        }
      : undefined;

  return (
    <View style={{ height }}>
      {locked ? (
        <>
          <Image
            source={{ uri: series.poster }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            blurRadius={4}
          />
          <View style={styles.dim} />
          <LockOverlay
            episodeNumber={episode.number}
            coinCost={episode.coinCost}
            onPress={() => onUnlock(item)}
          />
        </>
      ) : (
        <VideoLayer
          uri={episode.videoUrl}
          poster={series.poster}
          isActive={isActive}
          maxDurationSec={EPISODE_CLIP_SECONDS}
          onProgress={setProgress}
          onEnded={onEnded}
        />
      )}

      <LinearGradient
        colors={gradients.fadeBottom}
        locations={[0.55, 0.8, 1]}
        style={styles.bottomFade}
        pointerEvents="none"
      />

      <View
        style={[styles.footer, { paddingBottom: bottomInset }]}
        pointerEvents="box-none"
      >
        <View style={styles.footerRow} pointerEvents="box-none">
          <EpisodeInfo series={series} episode={episode} cta={cta} />
          <PlayerActionRail series={series} />
        </View>
        {!locked ? <ProgressBar progress={progress} /> : null}
      </View>
    </View>
  );
}

export const EpisodePage = memo(EpisodePageBase);

const styles = StyleSheet.create({
  dim: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.45)" },
  bottomFade: { ...StyleSheet.absoluteFill },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.lg,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
});
