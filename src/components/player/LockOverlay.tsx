import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface LockOverlayProps {
    episodeNumber: number;
    coinCost: number;
    onPress: () => void;
}

export function LockOverlay({ episodeNumber, coinCost, onPress }: LockOverlayProps) {
    return (
        <View style={styles.wrap} pointerEvents="box-none">
            <Pressable onPress={onPress} style={styles.card}>
                <Icon name="lock" size={36} />
                <AppText variant="title" style={styles.title}>
                    Unlock episode {episodeNumber}
                </AppText>
                <AppText variant="bodyMedium" color="textMuted">
                    {coinCost} coins or VIP
                </AppText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', paddingBottom: 160 },
    card: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xxl, paddingHorizontal: spacing.xxxl, borderRadius: radius.xl, backgroundColor: 'rgba(16,30,70,0.82)', borderWidth: 1, borderColor: 'rgba(139,233,247,0.25)' },
    title: { fontSize: 19, color: colors.text }
});
