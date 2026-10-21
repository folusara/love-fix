import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EpisodeFeed } from '@/components/player';
import { IconButton } from '@/components/ui';
import { getSeriesById, getSeriesFeed } from '@/data';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

// Full-screen player: swipe between episodes; locked ones show the paywall card
export default function WatchScreen() {
    const { id, episode } = useLocalSearchParams<{ id: string; episode?: string }>();
    const insets = useSafeAreaInsets();
    const series = getSeriesById(id);
    const items = useMemo(() => (series ? getSeriesFeed(series) : []), [series]);
    const startIndex = Math.max(0, Math.min(Number(episode ?? 1) - 1, items.length - 1));

    return (
        <View style={styles.root}>
            <EpisodeFeed items={items} initialIndex={startIndex} bottomInset={insets.bottom} />
            <IconButton icon="back" variant="glass" onPress={nav.back} style={[styles.back, { top: insets.top + spacing.sm }]} accessibilityLabel="Close player" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#000' },
    back: { position: 'absolute', left: spacing.xl }
});
