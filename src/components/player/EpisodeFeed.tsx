import { useCallback, useRef, useState } from "react";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";

import { useAppStore } from "@/state/AppStore";
import { nav } from "@/state/navigation";
import { FeedItem } from "@/types";

import { EpisodeCtaMode, EpisodePage } from "./EpisodePage";

interface EpisodeFeedProps {
  items: FeedItem[];
  initialIndex?: number;
  ctaMode?: EpisodeCtaMode;
  /** Auto-advance to the next episode when one finishes (the cliffhanger hand-off) */
  autoAdvance?: boolean;
  /** Space to keep clear at the bottom (home indicator) when no tab bar is shown */
  bottomInset?: number;
}

const VIEWABILITY = { itemVisiblePercentThreshold: 80 };

type ViewableChange = NonNullable<
  FlatListProps<FeedItem>["onViewableItemsChanged"]
>;

export function EpisodeFeed({
  items,
  initialIndex = 0,
  ctaMode = "none",
  autoAdvance = true,
  bottomInset = 0,
}: EpisodeFeedProps) {
  const { isEpisodeLocked } = useAppStore();
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeIndexRef = useRef(initialIndex);
  const listRef = useRef<FlatList<FeedItem>>(null);

  const setActive = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const onViewableItemsChanged = useRef<ViewableChange>(({ viewableItems }) => {
    const index = viewableItems[0]?.index;
    if (index != null) setActive(index);
  }).current;

  /**
   * Advance exactly one episode, and only from the episode that is actually on screen.
   * A stale or duplicate "ended" event can't push the feed further than index + 1.
   */
  const handleEnded = useCallback(
    (index: number) => {
      if (!autoAdvance || index !== activeIndexRef.current) return;
      const next = index + 1;
      if (next >= items.length) return;
      setActive(next);
      listRef.current?.scrollToIndex({ index: next, animated: true });
    },
    [autoAdvance, items.length, setActive],
  );

  const handleUnlock = useCallback(
    (item: FeedItem) =>
      nav.unlock(item.series.id, item.episode.number, "player"),
    [],
  );
  const handleOpenSeries = useCallback(
    (item: FeedItem) => nav.series(item.series.id),
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItem; index: number }) => (
      <EpisodePage
        item={item}
        height={height}
        isActive={index === activeIndex}
        locked={isEpisodeLocked(item.series, item.episode.number)}
        ctaMode={ctaMode}
        bottomInset={bottomInset}
        onEnded={() => handleEnded(index)}
        onUnlock={handleUnlock}
        onOpenSeries={handleOpenSeries}
      />
    ),
    [
      height,
      activeIndex,
      isEpisodeLocked,
      ctaMode,
      bottomInset,
      handleEnded,
      handleUnlock,
      handleOpenSeries,
    ],
  );

  return (
    <View
      style={styles.root}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      {height > 0 ? (
        <FlatList
          ref={listRef}
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY}
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          decelerationRate="fast"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
});
