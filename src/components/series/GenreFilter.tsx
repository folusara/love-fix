import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/ui';
import { spacing } from '@/theme';

interface GenreFilterProps<T extends string> {
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
}

export function GenreFilter<T extends string>({ options, value, onChange }: GenreFilterProps<T>) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
            {options.map((option) => (
                <Chip key={option} label={option} variant="filter" selected={option === value} onPress={() => onChange(option)} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: { paddingHorizontal: spacing.xl, gap: spacing.md }
});
