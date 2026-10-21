import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

import { Icon } from './Icon';

export function RadioIndicator({ selected }: { selected: boolean }) {
    return <View style={[styles.ring, selected && styles.selected]}>{selected ? <Icon name="check" size={14} color={colors.primary} /> : null}</View>;
}

const styles = StyleSheet.create({
    ring: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.textSubtle, alignItems: 'center', justifyContent: 'center' },
    selected: { borderColor: colors.primary }
});
