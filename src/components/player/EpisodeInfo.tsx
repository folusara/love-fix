import { StyleSheet, View } from 'react-native';

import { AppText, Button, IconName } from '@/components/ui';
import { radius, spacing } from '@/theme';
import { Episode, Series } from '@/types';
import { formatDuration } from '@/utils/format';

interface EpisodeInfoProps {
    series: Series;
    episode: Episode;
    cta?: { label: string; icon: IconName; variant?: 'primary' | 'muted'; onPress: () => void };
}

export function EpisodeInfo({ series, episode, cta }: EpisodeInfoProps) {
    return (
        <View style={styles.container}>
            <AppText variant="h2" numberOfLines={2}>
                {series.title}
            </AppText>
            <View style={styles.meta}>
                <View style={styles.epBadge}>
                    <AppText variant="label">Ep {episode.number}</AppText>
                </View>
                <AppText variant="bodyMedium" color="textMuted">
                    {formatDuration(episode.durationSec)}
                </AppText>
            </View>
            {cta ? <Button title={cta.label} icon={cta.icon} variant={cta.variant ?? 'primary'} onPress={cta.onPress} style={styles.cta} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: spacing.md, flex: 1 },
    meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    epBadge: { backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
    cta: { alignSelf: 'flex-start', minWidth: 150 }
});
