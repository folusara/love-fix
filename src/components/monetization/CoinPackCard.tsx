import { Pressable, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { AppText, Icon } from '@/components/ui';
import { colors, gradients, radius, spacing } from '@/theme';
import { CoinPack } from '@/types';

interface CoinPackCardProps {
    pack: CoinPack;
    selected: boolean;
    onPress: (pack: CoinPack) => void;
}

const RIBBON_LABEL: Record<NonNullable<CoinPack['tag']>, string> = { popular: 'Popular', best: 'Best value' };

export function CoinPackCard({ pack, selected, onPress }: CoinPackCardProps) {
    return (
        <Pressable onPress={() => onPress(pack)} style={[styles.card, selected && styles.selected]}>
            {pack.tag ? (
                <LinearGradient
                    colors={pack.tag === 'best' ? gradients.brandReverse : ([colors.primary, colors.primary] as const)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ribbon}
                >
                    <AppText variant="label" color="onPrimary">
                        {RIBBON_LABEL[pack.tag]}
                    </AppText>
                </LinearGradient>
            ) : (
                <View style={styles.ribbonSpacer} />
            )}
            <View style={styles.body}>
                <Icon name="zap" size={40} color={colors.primary} />
                <AppText variant="number">{pack.coins.toLocaleString()}</AppText>
                <AppText variant="bodyMedium" color="accent" style={styles.bonus}>
                    {pack.bonus ? `+ ${pack.bonus} bonus` : ' '}
                </AppText>
                <View style={[styles.price, selected && styles.priceSelected]}>
                    <AppText variant="title" color={selected ? 'onPrimary' : 'text'}>
                        {pack.price}
                    </AppText>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: { flex: 1, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, overflow: 'hidden' },
    selected: { borderColor: colors.primary, borderWidth: 2, backgroundColor: '#0F1A22' },
    ribbon: { alignItems: 'center', paddingVertical: 4 },
    ribbonSpacer: { height: 25 },
    body: { alignItems: 'center', gap: spacing.sm, padding: spacing.xl, paddingTop: spacing.md },
    bonus: { minHeight: 22 },
    price: { alignSelf: 'stretch', alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: '#000' },
    priceSelected: { backgroundColor: colors.primary, borderColor: colors.primary }
});
