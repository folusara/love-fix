import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/ui';
import { gradients, spacing } from '@/theme';

interface DetailHeroProps {
    image: string;
    saved: boolean;
    onBack: () => void;
    onToggleSave: () => void;
    onShare: () => void;
}

export function DetailHero({ image, saved, onBack, onToggleSave, onShare }: DetailHeroProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.hero}>
            <Image source={{ uri: image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
            <LinearGradient colors={gradients.fadeBottom} locations={[0.45, 0.8, 1]} style={StyleSheet.absoluteFill} />
            <View style={[styles.bar, { top: insets.top + spacing.sm }]}>
                <IconButton icon="back" variant="glass" onPress={onBack} accessibilityLabel="Go back" />
                <View style={styles.right}>
                    <IconButton icon={saved ? 'heartFilled' : 'heart'} variant="glass" onPress={onToggleSave} accessibilityLabel="Save" />
                    <IconButton icon="share" variant="glass" onPress={onShare} accessibilityLabel="Share" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: { height: 460 },
    bar: { position: 'absolute', left: spacing.xl, right: spacing.xl, flexDirection: 'row', justifyContent: 'space-between' },
    right: { flexDirection: 'row', gap: spacing.md }
});
