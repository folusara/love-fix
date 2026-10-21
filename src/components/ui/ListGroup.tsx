import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

export interface ListGroupItem {
    id: string;
    icon: IconName;
    label: string;
}

export function ListGroup({ items, onPressItem }: { items: ListGroupItem[]; onPressItem?: (item: ListGroupItem) => void }) {
    return (
        <View style={styles.group}>
            {items.map((item, index) => (
                <Pressable
                    key={item.id}
                    onPress={() => onPressItem?.(item)}
                    style={({ pressed }) => [styles.row, index > 0 && styles.separator, pressed && styles.pressed]}
                >
                    <View style={styles.iconWrap}>
                        <Icon name={item.icon} size={18} color={colors.primary} />
                    </View>
                    <AppText variant="bodyMedium" style={styles.label}>
                        {item.label}
                    </AppText>
                    <Icon name="chevronRight" size={20} color={colors.textMuted} />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    group: { borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, overflow: 'hidden' },
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingHorizontal: spacing.xl, paddingVertical: spacing.xl },
    separator: { borderTopWidth: 1, borderTopColor: colors.border },
    iconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft },
    label: { flex: 1, fontSize: 17 },
    pressed: { backgroundColor: colors.surfaceAlt }
});
