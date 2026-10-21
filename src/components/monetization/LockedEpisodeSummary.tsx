import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { AppText, Button, Card } from '@/components/ui';
import { radius, spacing } from '@/theme';
import { Episode, Series } from '@/types';

interface LockedEpisodeSummaryProps {
    series: Series;
    episode: Episode;
    canAfford: boolean;
    onUnlock: () => void;
}

export function LockedEpisodeSummary({ series, episode, canAfford, onUnlock }: LockedEpisodeSummaryProps) {
    return (
        <Card padding={spacing.xl}>
            <View style={styles.row}>
                <Image source={{ uri: series.poster }} style={styles.poster} contentFit="cover" />
                <View style={styles.copy}>
                    <AppText variant="h2" numberOfLines={2}>
                        {series.title}
                    </AppText>
                    <AppText variant="body" color="textMuted">
                        {canAfford ? `Episode ${episode.number}, ready to unlock` : `Episode ${episode.number}, locked. Recharge to continue.`}
                    </AppText>
                    <Button title={`Unlock for ${episode.coinCost} coins`} icon="lock" variant="secondary" size="sm" pill={false} disabled={!canAfford} onPress={onUnlock} style={styles.cta} />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: spacing.xl, alignItems: 'center' },
    poster: { width: 84, height: 112, borderRadius: radius.md },
    copy: { flex: 1, gap: spacing.sm },
    cta: { alignSelf: 'flex-start', paddingHorizontal: spacing.md }
});
