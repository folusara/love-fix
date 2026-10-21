import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

type Variant = 'filter' | 'tag' | 'accent' | 'plain' | 'glass';

interface ChipProps {
    label: string;
    variant?: Variant;
    selected?: boolean;
    icon?: IconName;
    onPress?: () => void;
}

export function Chip({ label, variant = 'tag', selected, icon, onPress }: ChipProps) {
    const Container = onPress ? Pressable : View;
    const isFilterSelected = variant === 'filter' && selected;

    return (
        <Container onPress={onPress} style={[styles.base, styles[variant], isFilterSelected && styles.filterSelected]}>
            {icon ? <Icon name={icon} size={18} color={colors.textMuted} /> : null}
            <AppText
                variant={variant === 'filter' ? 'bodyMedium' : 'label'}
                color={isFilterSelected ? 'onPrimary' : variant === 'accent' ? 'accent' : variant === 'plain' ? 'textMuted' : 'text'}
                style={variant === 'filter' && styles.filterText}
            >
                {label}
            </AppText>
        </Container>
    );
}

const styles = StyleSheet.create({
    base: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderRadius: radius.pill },
    filter: { paddingHorizontal: spacing.xl, height: 44, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    filterSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
    filterText: { fontSize: 16 },
    tag: { paddingHorizontal: spacing.md, paddingVertical: 6, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong },
    accent: { paddingHorizontal: spacing.md, paddingVertical: 6, backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.accent },
    plain: { paddingHorizontal: spacing.xs },
    glass: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: 'rgba(255,255,255,0.06)' }
});
