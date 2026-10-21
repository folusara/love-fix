import { Pressable, StyleSheet, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { AppText, Badge } from "@/components/ui";
import { colors, gradients, radius, spacing } from "@/theme";
import { Series } from "@/types";

interface PosterCardProps {
  series: Series;
  /** Fixed width for rails; omit to fill the parent (grids) */
  width?: number;
  showMeta?: boolean;
  onPress?: (series: Series) => void;
}

export const POSTER_RATIO = 1.48;

export function PosterCard({
  series,
  width,
  showMeta = true,
  onPress,
}: PosterCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(series)}
      style={({ pressed }) => [
        { width: width ?? "100%" },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.poster}>
        <Image
          source={{ uri: series.poster }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
        />
        {series.isPro ? (
          <Badge label="PRO" tone="pro" style={styles.badge} />
        ) : null}
        {showMeta ? (
          <LinearGradient colors={gradients.fadeBottom} style={styles.meta}>
            <AppText variant="label">{series.episodeCount} eps</AppText>
            <AppText variant="label">{series.minutesPerEpisode}m/ep</AppText>
          </LinearGradient>
        ) : null}
      </View>
      <AppText variant="caption" numberOfLines={2} style={styles.title}>
        {series.title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  poster: {
    aspectRatio: 1 / POSTER_RATIO,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  badge: { position: "absolute", top: spacing.sm, left: spacing.sm },
  meta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.sm,
  },
  title: { marginTop: spacing.sm },
  pressed: { opacity: 0.8 },
});
