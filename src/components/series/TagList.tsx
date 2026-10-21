import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/ui';
import { spacing } from '@/theme';

export function TagList({ tags }: { tags: string[] }) {
    return (
        <View style={styles.row}>
            {tags.map((tag) => (
                <Chip key={tag} label={tag} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }
});
