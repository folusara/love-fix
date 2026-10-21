import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { GradientText } from './GradientText';

interface SectionHeaderProps {
    title: string;
    /** "category" = big title with square marker (Romance / Popular micro dramas) */
    kind?: 'rail' | 'category' | 'plain';
    highlighted?: boolean;
    count?: number;
    actionLabel?: string;
    onAction?: () => void;
}

export function SectionHeader({ title, kind = 'rail', highlighted, count, actionLabel, onAction }: SectionHeaderProps) {
    const variant = kind === 'category' ? 'h1' : kind === 'rail' ? 'h2' : 'h3';
    const TitleText = highlighted ? GradientText : AppText;

    return (
        <View style={styles.row}>
            <View style={styles.left}>
                {kind === 'category' ? <View style={[styles.marker, { backgroundColor: highlighted ? colors.primary : colors.text }]} /> : null}
                <TitleText variant={variant}>{title}</TitleText>
                {count != null ? (
                    <View style={styles.count}>
                        <AppText variant="label" color="textMuted">
                            {count}
                        </AppText>
                    </View>
                ) : null}
            </View>
            {actionLabel ? (
                <Pressable onPress={onAction} hitSlop={10}>
                    <AppText variant="bodyMedium" color="primary">
                        {actionLabel}
                    </AppText>
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    left: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flexShrink: 1 },
    marker: { width: 22, height: 22 },
    count: { backgroundColor: colors.surfaceRaised, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 2 }
});
