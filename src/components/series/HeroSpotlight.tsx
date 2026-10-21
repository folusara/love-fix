import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText, Button, Chip, IconButton, MetaRow } from '@/components/ui';
import { gradients, spacing } from '@/theme';
import { Series } from '@/types';

interface HeroSpotlightProps {
    series: Series;
    onWatch: () => void;
    onAdd: () => void;
    added?: boolean;
}

export function HeroSpotlight({ series, onWatch, onAdd, added }: HeroSpotlightProps) {
    return (
        <View style={styles.hero}>
            <Image source={{ uri: series.poster }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
            <LinearGradient colors={gradients.fadeBottom} locations={[0.35, 0.7, 1]} style={StyleSheet.absoluteFill} />
            <View style={styles.content}>
                <View style={styles.chips}>
                    <Chip label="Spotlight" variant="accent" />
                    {series.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="plain" />
                    ))}
                </View>
                <AppText variant="display">{series.title}</AppText>
                <AppText variant="body" color="textMuted">
                    {series.tagline}
                </AppText>
                <MetaRow items={[{ icon: 'star', label: series.rating.toFixed(1) }, { label: `${series.episodeCount} episodes` }]} />
                <View style={styles.actions}>
                    <Button title="Watch now" icon="play" size="lg" glow onPress={onWatch} style={styles.watch} />
                    <IconButton icon={added ? 'check' : 'plus'} variant="outline" size={58} iconSize={26} onPress={onAdd} accessibilityLabel="Add to library" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: { height: 640, justifyContent: 'flex-end' },
    content: { paddingHorizontal: spacing.xl, gap: spacing.md, paddingBottom: spacing.lg },
    chips: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
    actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: spacing.sm },
    watch: { flex: 1 }
});
