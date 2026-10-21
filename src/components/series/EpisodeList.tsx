import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, SectionHeader } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { Episode } from '@/types';

import { EpisodeRow } from './EpisodeRow';

interface EpisodeListProps {
    episodes: Episode[];
    isLocked: (episode: Episode) => boolean;
    onPressEpisode: (episode: Episode) => void;
    header?: React.ReactNode;
    pageSize?: number;
}

export function EpisodeList({ episodes, isLocked, onPressEpisode, header, pageSize = 6 }: EpisodeListProps) {
    const [visible, setVisible] = useState(pageSize);
    const [descending, setDescending] = useState(false);

    const ordered = useMemo(() => (descending ? [...episodes].reverse() : episodes), [episodes, descending]);

    return (
        <View style={styles.container}>
            <SectionHeader title="Episodes" count={episodes.length} actionLabel="Sort" onAction={() => setDescending((d) => !d)} />
            {header}
            {ordered.slice(0, visible).map((episode) => (
                <EpisodeRow key={episode.id} episode={episode} locked={isLocked(episode)} onPress={onPressEpisode} />
            ))}
            {visible < episodes.length ? (
                <Pressable onPress={() => setVisible((v) => v + pageSize)} style={styles.more}>
                    <AppText variant="bodyMedium" color="textMuted">
                        Show more episodes
                    </AppText>
                    <Icon name="chevronRight" size={18} color={colors.textMuted} />
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: spacing.lg },
    more: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, paddingVertical: spacing.sm }
});
