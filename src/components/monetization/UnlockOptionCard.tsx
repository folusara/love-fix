import { StyleSheet, View } from 'react-native';

import { AppText, Badge, Card, RadioIndicator } from '@/components/ui';
import { spacing } from '@/theme';

interface UnlockOptionCardProps {
    title: string;
    subtitle: string;
    price: string;
    selected: boolean;
    ribbon?: string;
    onPress: () => void;
}

export function UnlockOptionCard({ title, subtitle, price, selected, ribbon, onPress }: UnlockOptionCardProps) {
    return (
        <View>
            <Card variant={selected ? 'selected' : 'surface'} padding={spacing.xl} onPress={onPress}>
                <View style={styles.row}>
                    <RadioIndicator selected={selected} />
                    <View style={styles.copy}>
                        <AppText variant="title">{title}</AppText>
                        <AppText variant="caption" color="textMuted">
                            {subtitle}
                        </AppText>
                    </View>
                    <AppText variant="title" color={selected ? 'primary' : 'text'}>
                        {price}
                    </AppText>
                </View>
            </Card>
            {ribbon ? <Badge label={ribbon} tone="cyan" style={styles.ribbon} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
    copy: { flex: 1, gap: 2 },
    ribbon: { position: 'absolute', top: -12, right: spacing.xl }
});
