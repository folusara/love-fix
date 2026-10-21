import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
    const pct = `${Math.min(Math.max(progress, 0), 1) * 100}%` as const;
    return (
        <View style={styles.track}>
            <View style={[styles.fill, { width: pct }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: { height: 4, backgroundColor: 'rgba(255,255,255,0.18)' },
    fill: { height: 4, backgroundColor: colors.primary }
});
