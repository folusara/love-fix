import { StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { AppText, Icon } from "@/components/ui";
import { colors, ms, radius } from "@/theme";

interface MediaThumbProps {
  uri: string;
  width: number;
  height: number;
  locked?: boolean;
  lockLabel?: string;
  showPlay?: boolean;
}

// Shared by episode rows and the unlock sheet poster
export function MediaThumb({
  uri,
  width,
  height,
  locked,
  lockLabel,
  showPlay = true,
}: MediaThumbProps) {
  return (
    <View style={[styles.thumb, { width: ms(width), height: ms(height) }]}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        blurRadius={locked ? 6 : 0}
        transition={200}
      />
      {locked ? (
        <View style={styles.lock}>
          <Icon name="lock" size={20} />
          {lockLabel ? <AppText variant="label">{lockLabel}</AppText> : null}
        </View>
      ) : showPlay ? (
        <View style={styles.play}>
          <Icon name="playFilled" size={24} color={colors.onPrimary} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    borderRadius: radius.md,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  play: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  lock: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
