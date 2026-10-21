import { StyleSheet, View } from 'react-native';

import { AppText, Card, Icon } from '@/components/ui';
import { colors, spacing } from '@/theme';

export function HighlightsCard({ title = "Why you'll love it", items }: { title?: string; items: string[] }) {
    return (
        <Card padding={spacing.xl} style={styles.card}>
            <View style={styles.row}>
                <Icon name="sparkle" size={18} color={colors.accent} />
                <AppText variant="title">{title}</AppText>
            </View>
            {items.map((item) => (
                <View key={item} style={styles.row}>
                    <Icon name="flame" size={18} color={colors.primary} />
                    <AppText variant="body" color="textMuted" style={styles.text}>
                        {item}
                    </AppText>
                </View>
            ))}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: { gap: spacing.md },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    text: { flex: 1 }
});
