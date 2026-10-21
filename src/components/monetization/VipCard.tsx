import { StyleSheet, View } from 'react-native';

import { AppText, Card, Icon } from '@/components/ui';
import { spacing } from '@/theme';

interface VipCardProps {
    price: string;
    period: string;
    active?: boolean;
    onPress: () => void;
}

export function VipCard({ price, period, active, onPress }: VipCardProps) {
    return (
        <Card padding={spacing.xl} onPress={active ? undefined : onPress} variant={active ? 'selected' : 'surface'}>
            <View style={styles.row}>
                <View style={styles.icon}>
                    <Icon name="crown" size={28} />
                </View>
                <View style={styles.copy}>
                    <AppText variant="h3">VIP membership</AppText>
                    <AppText variant="caption" color="textMuted">
                        {active ? 'Active: all episodes unlocked' : 'Free episodes, no ads'}
                    </AppText>
                </View>
                <View style={styles.price}>
                    <AppText variant="title">{price}</AppText>
                    <AppText variant="caption" color="textMuted">
                        / {period}
                    </AppText>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
    icon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
    copy: { flex: 1, gap: 2 },
    price: { alignItems: 'flex-end' }
});
