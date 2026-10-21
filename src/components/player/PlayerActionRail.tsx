import { useState } from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';

import { AppText, Icon, IconName } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { Series } from '@/types';
import { formatCount } from '@/utils/format';

function RailAction({ icon, label, color, onPress }: { icon: IconName; label: string; color?: string; onPress?: () => void }) {
    return (
        <Pressable onPress={onPress} hitSlop={8} style={styles.action}>
            <Icon name={icon} size={34} color={color} />
            <AppText variant="label">{label}</AppText>
        </Pressable>
    );
}

export function PlayerActionRail({ series }: { series: Series }) {
    const [liked, setLiked] = useState(false);

    return (
        <View style={styles.rail}>
            <RailAction
                icon={liked ? 'heartFilled' : 'heart'}
                color={liked ? colors.accent : colors.text}
                label={formatCount(series.likes + (liked ? 1 : 0))}
                onPress={() => setLiked((v) => !v)}
            />
            <RailAction icon="comment" label={formatCount(series.comments)} />
            <RailAction icon="shareNodes" label="Share" onPress={() => Share.share({ message: `Watch ${series.title} on LoveFlix` })} />
        </View>
    );
}

const styles = StyleSheet.create({
    rail: { gap: spacing.xxl, alignItems: 'center' },
    action: { alignItems: 'center', gap: spacing.xs }
});
