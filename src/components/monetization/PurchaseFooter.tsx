import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, Icon } from '@/components/ui';
import { colors, spacing } from '@/theme';

interface PurchaseFooterProps {
    title: string;
    subtitle: string;
    loading?: boolean;
    onPress: () => void;
}

export function PurchaseFooter({ title, subtitle, loading, onPress }: PurchaseFooterProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={styles.trust}>
                <Icon name="shield" size={18} color={colors.textMuted} />
                <AppText variant="caption" color="textMuted">
                    Secure
                </AppText>
                <Icon name="card" size={18} color={colors.textMuted} />
                <AppText variant="caption" color="textMuted">
                    App Store Pay
                </AppText>
            </View>
            <Button variant="gradientOutline" title={title} subtitle={subtitle} loading={loading} onPress={onPress} />
            <AppText variant="micro" color="textSubtle" align="center">
                By purchasing, you agree to our Terms of Service. Subscriptions auto-renew unless canceled.
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: { gap: spacing.md, paddingHorizontal: spacing.xl, paddingTop: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
    trust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }
});
