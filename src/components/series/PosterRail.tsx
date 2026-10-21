import { FlatList, StyleSheet, View } from "react-native";

import { SectionHeader } from "@/components/ui";
import { layout, spacing } from "@/theme";
import { Series } from "@/types";

import { PosterCard } from "./PosterCard";

interface PosterRailProps {
  title: string;
  data: Series[];
  onPressItem: (series: Series) => void;
  onSeeAll?: () => void;
}

export function PosterRail({
  title,
  data,
  onPressItem,
  onSeeAll,
}: PosterRailProps) {
  if (!data.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader
          title={title}
          actionLabel={onSeeAll ? "See all" : undefined}
          onAction={onSeeAll}
        />
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PosterCard
            series={item}
            width={layout.railCardWidth}
            onPress={onPressItem}
          />
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  header: { paddingHorizontal: spacing.xl },
  list: { paddingHorizontal: spacing.xl, gap: spacing.lg },
});
