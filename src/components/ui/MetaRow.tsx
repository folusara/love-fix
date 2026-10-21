import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

export interface MetaItem {
    label: string;
    icon?: IconName;
}

export function MetaRow({ items }: { items: MetaItem[] }) {
    return (
        <View style={styles.row}>
            {items.map((item, index) => (
                <Fragment key={item.label}>
                    {index > 0 ? <View style={styles.dot} /> : null}
                    <View style={styles.item}>
                        {item.icon ? <Icon name={item.icon} size={18} color={colors.textMuted} /> : null}
                        <AppText variant="bodyMedium" color="textMuted">
                            {item.label}
                        </AppText>
                    </View>
                </Fragment>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.md },
    item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textSubtle }
});
