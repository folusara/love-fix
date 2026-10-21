import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { Episode } from '@/types';
import { formatDuration } from '@/utils/format';

import { MediaThumb } from './MediaThumb';

interface EpisodeRowProps {
    episode: Episode;
    locked: boolean;
    onPress: (episode: Episode) => void;
}

export function EpisodeRow({ episode, locked, onPress }: EpisodeRowProps) {
    return (
        <Pressable onPress={() => onPress(episode)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <MediaThumb uri={episode.thumbnail} width={112} height={64} locked={locked} />
            <View style={styles.copy}>
                <AppText variant="h3" numberOfLines={1}>
                    {episode.number}. {episode.title}
                </AppText>
                <View style={styles.meta}>
                    <Icon name="clock" size={16} color={colors.textMuted} />
                    <AppText variant="bodyMedium" color="textMuted">
                        {formatDuration(episode.durationSec)}
                    </AppText>
                    {locked ? (
                        <View style={styles.meta}>
                            <AppText variant="title" color="accent">
                                Unlock
                            </AppText>
                            <Icon name="lock" size={14} color={colors.accent} />
                        </View>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
    copy: { flex: 1, gap: spacing.xs },
    meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    pressed: { opacity: 0.75 }
});
