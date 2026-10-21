import { StyleSheet, View } from 'react-native';

import { AppText, Card, Icon } from '@/components/ui';
import { colors, spacing } from '@/theme';

export function BalanceCard({ coins }: { coins: number }) {
    return (
        <Card padding={spacing.xl}>
            <View style={styles.row}>
                <AppText variant="bodyMedium" color="textMuted">
                    Your balance
                </AppText>
                <View style={styles.value}>
                    <Icon name="zap" size={22} color={colors.primary} />
                    <AppText variant="title" style={styles.coins}>
                        {coins.toLocaleString()} coins
                    </AppText>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    value: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    coins: { fontSize: 19 }
});
