import { StyleSheet, View } from 'react-native';

import { AppText, IconButton } from '@/components/ui';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

export function NavHeader({ title, right }: { title: string; right?: React.ReactNode }) {
    return (
        <View style={styles.row}>
            <IconButton icon="back" iconSize={26} onPress={nav.back} accessibilityLabel="Go back" />
            <AppText variant="h2" style={styles.title}>
                {title}
            </AppText>
            {right}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
    title: { flex: 1 }
});
