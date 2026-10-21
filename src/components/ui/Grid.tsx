import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';
import { chunk } from '@/utils/format';

interface GridProps<T> {
    data: T[];
    columns?: number;
    gap?: number;
    keyExtractor: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
}

// Non-virtualised grid for short lists that live inside a ScrollView
export function Grid<T>({ data, columns = 2, gap = spacing.lg, keyExtractor, renderItem }: GridProps<T>) {
    return (
        <View style={{ gap }}>
            {chunk(data, columns).map((row) => (
                <View key={row.map(keyExtractor).join('|')} style={[styles.row, { gap }]}>
                    {row.map((item) => (
                        <View key={keyExtractor(item)} style={styles.cell}>
                            {renderItem(item)}
                        </View>
                    ))}
                    {Array.from({ length: columns - row.length }).map((_, i) => (
                        <View key={`pad-${i}`} style={styles.cell} />
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row' },
    cell: { flex: 1 }
});
