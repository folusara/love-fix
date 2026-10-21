import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

export function Divider({ label }: { label?: string }) {
    return (
        <View style={styles.row}>
            <View style={styles.line} />
            {label ? (
                <AppText variant="bodyMedium" color="textMuted">
                    {label}
                </AppText>
            ) : null}
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
    line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.borderStrong }
});
