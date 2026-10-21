import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface BundleBannerProps {
    title: string;
    subtitle: string;
    price: string;
    onPress: () => void;
}

export function BundleBanner({ title, subtitle, price, onPress }: BundleBannerProps) {
    return (
        <Card variant="accent" onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.copy}>
                    <AppText variant="h3">{title}</AppText>
                    <AppText variant="caption" color="textMuted">
                        {subtitle}
                    </AppText>
                </View>
                <Pressable onPress={onPress} style={styles.price}>
                    <AppText variant="title">{price}</AppText>
                </Pressable>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    copy: { flex: 1, gap: spacing.xs },
    price: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm }
});
