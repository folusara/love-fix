import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

export function Logo({ size = 48, withWordmark = false }: { size?: number; withWordmark?: boolean }) {
    return (
        <View style={styles.row}>
            <View style={[styles.mark, { width: size, height: size }]}>
                <Icon name="heart" size={size * 0.55} color={colors.onPrimary} />
            </View>
            {withWordmark ? (
                <AppText variant="h1" color="primary">
                    LoveFlix
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    mark: { backgroundColor: colors.primary, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' }
});
