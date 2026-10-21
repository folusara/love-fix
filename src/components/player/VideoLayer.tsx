import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { useEvent, useEventListener } from "expo";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";

import { AppText, Button, Icon } from "@/components/ui";
import { colors, spacing } from "@/theme";

interface VideoLayerProps {
  /** Remote URL or bundled asset (require) */
  uri: string | number;
  poster: string;
  isActive: boolean;
  /** Cut playback short (demo episodes). Omit to play the full source. */
  maxDurationSec?: number;
  onProgress?: (progress: number) => void;
  onEnded?: () => void;
}

// Remounting on retry gives a fresh native player: the most reliable recovery after a network error
export function VideoLayer(props: VideoLayerProps) {
  const [attempt, setAttempt] = useState(0);
  return (
    <PlayerSurface
      key={`${props.uri}-${attempt}`}
      {...props}
      onRetry={() => setAttempt((a) => a + 1)}
    />
  );
}

function PlayerSurface({
  uri,
  poster,
  isActive,
  maxDurationSec,
  onProgress,
  onEnded,
  onRetry,
}: VideoLayerProps & { onRetry: () => void }) {
  const [paused, setPaused] = useState(false);
  const endedRef = useRef(false);
  /**
   * Position where this play-through started. Elapsed time is measured from here, not from 0:
   * live/looping HLS channels report currentTime at the live edge (thousands of seconds),
   * which would instantly exceed the cap and skip the episode.
   */
  const startTimeRef = useRef<number | null>(null);
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;

  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
    p.timeUpdateEventInterval = 0.25;
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    endedRef.current = false;
    startTimeRef.current = null;
    if (isActive) {
      player.play();
      setPaused(false);
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [isActive, player]);

  const finish = () => {
    // Only the visible episode may end the episode; background pages must never advance the feed
    if (endedRef.current || !isActiveRef.current) return;
    endedRef.current = true;
    player.pause();
    onEnded?.();
  };

  useEventListener(player, "timeUpdate", ({ currentTime }) => {
    if (!isActiveRef.current) return;
    if (startTimeRef.current === null) startTimeRef.current = currentTime;

    const elapsed = Math.max(0, currentTime - startTimeRef.current);
    const total = maxDurationSec
      ? Math.min(
          player.duration > 0 ? player.duration : maxDurationSec,
          maxDurationSec,
        )
      : player.duration;

    if (total > 0) onProgress?.(Math.min(elapsed / total, 1));
    if (maxDurationSec && elapsed >= maxDurationSec) finish();
  });

  useEventListener(player, "playToEnd", finish);

  const togglePlayback = () => {
    if (status !== "readyToPlay") return;
    if (player.playing) {
      player.pause();
      setPaused(true);
    } else {
      player.play();
      setPaused(false);
    }
  };

  const isLoading = status === "loading" || status === "idle";

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={togglePlayback}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {isLoading || status === "error" ? (
        <Image
          source={{ uri: poster }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          blurRadius={status === "error" ? 8 : 0}
        />
      ) : null}

      {isLoading && isActive ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : null}

      {status === "error" ? (
        <View style={[styles.center, styles.errorScrim]}>
          <AppText variant="title" align="center">
            This episode didn&apos;t load.
          </AppText>
          <AppText variant="caption" color="textMuted" align="center">
            Check your connection and try again.
          </AppText>
          <Button title="Try again" icon="play" size="sm" onPress={onRetry} />
        </View>
      ) : null}

      {paused && status === "readyToPlay" ? (
        <View style={styles.center}>
          <View style={styles.pauseBadge}>
            <Icon name="playFilled" size={40} color={colors.text} />
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xxl,
  },
  errorScrim: { backgroundColor: "rgba(0,0,0,0.55)" },
  pauseBadge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
});
