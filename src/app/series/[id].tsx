import { ScrollView, Share, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import {
  BundleBanner,
  CastRail,
  DetailHero,
  EpisodeList,
  HighlightsCard,
  PosterRail,
  TagList,
} from "@/components/series";
import {
  AppText,
  Button,
  IconButton,
  MetaRow,
  SectionHeader,
} from "@/components/ui";
import {
  getEpisodes,
  getSeriesById,
  getSeriesByIds,
  RECOMMENDED_IDS,
  SEASON_PRICE,
} from "@/data";
import { useAppStore } from "@/state/AppStore";
import { nav } from "@/state/navigation";
import { colors, spacing } from "@/theme";
import { Episode } from "@/types";
import { formatCount } from "@/utils/format";

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isEpisodeLocked, isSaved, toggleSaved } = useAppStore();
  const series = getSeriesById(id);

  if (!series) {
    return (
      <View style={styles.missing}>
        <AppText variant="h2">This series is no longer available.</AppText>
        <Button title="Back to home" onPress={nav.back} />
      </View>
    );
  }

  const episodes = getEpisodes(series);
  const saved = isSaved(series.id);
  const firstLocked = episodes.find((e) => isEpisodeLocked(series, e.number));

  const openEpisode = (episode: Episode) =>
    isEpisodeLocked(series, episode.number)
      ? nav.unlock(series.id, episode.number, "details")
      : nav.watch(series.id, episode.number);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <DetailHero
        image={series.poster}
        saved={saved}
        onBack={nav.back}
        onToggleSave={() => toggleSaved(series.id)}
        onShare={() =>
          Share.share({ message: `Watch ${series.title} on LoveFlix` })
        }
      />

      <View style={styles.body}>
        <TagList tags={series.tags} />
        <AppText variant="h1">{series.title}</AppText>
        <MetaRow
          items={[
            {
              icon: "star",
              label: `${series.rating.toFixed(1)} (${formatCount(series.ratingCount)})`,
            },
            { label: String(series.year) },
            { icon: "list", label: `${series.episodeCount} episodes` },
          ]}
        />
        <View style={styles.actions}>
          <Button
            title="Play episode 1"
            icon="play"
            size="lg"
            glow
            onPress={() => nav.watch(series.id, 1)}
            style={styles.play}
          />
          <IconButton
            icon={saved ? "heartFilled" : "heart"}
            variant="outline"
            size={58}
            iconSize={26}
            onPress={() => toggleSaved(series.id)}
          />
        </View>

        <SectionHeader title="Synopsis" kind="plain" />
        <AppText variant="body" color="textMuted">
          {series.synopsis}
        </AppText>
        <HighlightsCard items={series.highlights} />

        <SectionHeader title="Cast and crew" kind="plain" />
        <CastRail cast={series.cast} />

        <EpisodeList
          episodes={episodes}
          isLocked={(e) => isEpisodeLocked(series, e.number)}
          onPressEpisode={openEpisode}
          header={
            firstLocked ? (
              <BundleBanner
                title="Unlock full season"
                subtitle="Save 40% with the bundle"
                price={SEASON_PRICE}
                onPress={() =>
                  nav.unlock(series.id, firstLocked.number, "details")
                }
              />
            ) : null
          }
        />
      </View>

      <PosterRail
        title="You might also like"
        data={getSeriesByIds(RECOMMENDED_IDS)}
        onPressItem={(s) => nav.series(s.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: spacing.huge, gap: spacing.xxxl },
  body: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
    marginTop: -spacing.huge,
  },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  play: { flex: 1 },
  missing: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    padding: spacing.xl,
  },
});
