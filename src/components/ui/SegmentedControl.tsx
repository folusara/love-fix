import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface SegmentedControlProps<T extends string> {
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
    return (
        <View style={styles.track}>
            {options.map((option) => {
                const active = option === value;
                return (
                    <Pressable key={option} onPress={() => onChange(option)} style={[styles.segment, active && styles.active]}>
                        <AppText variant="bodyMedium" color={active ? 'text' : 'textMuted'}>
                            {option}
                        </AppText>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    track: { flexDirection: 'row', alignSelf: 'flex-start', padding: spacing.xs, borderRadius: radius.lg, backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
    segment: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.sm, borderRadius: radius.md },
    active: { backgroundColor: '#000000' }
});
