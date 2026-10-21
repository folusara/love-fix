import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/layout";
import {
  CategorySection,
  GenreFilter,
  HeroSpotlight,
} from "@/components/series";
import {
  GENRE_FILTERS,
  getSeriesById,
  HOME_CATEGORIES,
  SPOTLIGHT_SERIES_ID,
} from "@/data";
import { useAppStore } from "@/state/AppStore";
import { nav } from "@/state/navigation";
import { colors, spacing } from "@/theme";
import { Series } from "@/types";

export default function HomeScreen() {
  const [genre, setGenre] = useState<(typeof GENRE_FILTERS)[number]>("All");
  const { isSaved, toggleSaved } = useAppStore();
  const spotlight = getSeriesById(SPOTLIGHT_SERIES_ID)!;
  const openSeries = (series: Series) => nav.series(series.id);

  return (
    <SafeAreaView edges={["top"]} style={styles.root}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroSpotlight
          series={spotlight}
          added={isSaved(spotlight.id)}
          onWatch={() => nav.watch(spotlight.id)}
          onAdd={() => toggleSaved(spotlight.id)}
        />
        <GenreFilter
          options={GENRE_FILTERS}
          value={genre}
          onChange={setGenre}
        />
        {HOME_CATEGORIES.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            genre={genre}
            onPressSeries={openSeries}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { gap: spacing.xxxl, paddingBottom: spacing.huge },
});
