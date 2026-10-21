import { Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText, Badge, Icon } from '@/components/ui';
import { colors, gradients, radius, spacing } from '@/theme';
import { LibraryItem, Series } from '@/types';

interface LibraryCardProps {
    item: LibraryItem;
    series: Series;
    locked: boolean;
    onPress: () => void;
}

export function LibraryCard({ item, series, locked, onPress }: LibraryCardProps) {
    const badge = item.status === 'new' ? <Badge label="New eps" tone="cyan" /> : item.status === 'completed' ? <Badge label="Completed" tone="dark" /> : null;

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.cover}>
                <Image source={{ uri: series.poster }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
                <LinearGradient colors={gradients.fadeBottom} locations={[0.6, 0.85, 1]} style={StyleSheet.absoluteFill} />
                <View style={styles.topRow}>
                    {locked ? (
                        <View style={styles.lock}>
                            <Icon name="lock" size={18} />
                        </View>
                    ) : (
                        <View />
                    )}
                    {badge}
                </View>
                <AppText variant="label" color="primary" style={styles.progress}>
                    Ep {item.currentEpisode} / {series.episodeCount}
                </AppText>
            </View>
            <AppText variant="h3" numberOfLines={1}>
                {series.title}
            </AppText>
            <View style={styles.genre}>
                <Icon name="heart" size={16} color={colors.accent} />
                <AppText variant="bodyMedium" color="textMuted" numberOfLines={1}>
                    {item.subGenre}
                </AppText>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { gap: spacing.sm },
    cover: { aspectRatio: 0.76, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, justifyContent: 'space-between', padding: spacing.md },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    lock: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' },
    progress: { fontSize: 14 },
    genre: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    pressed: { opacity: 0.8 }
});
