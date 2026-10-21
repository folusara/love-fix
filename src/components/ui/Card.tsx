import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients, radius, spacing } from '@/theme';

type Variant = 'surface' | 'raised' | 'accent' | 'selected';

interface CardProps {
    children: React.ReactNode;
    variant?: Variant;
    padding?: number;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = 'surface', padding = spacing.xl, onPress, style }: CardProps) {
    const body =
        variant === 'accent' ? (
            <LinearGradient colors={gradients.accentCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.base, styles.accent, { padding }, style]}>
                {children}
            </LinearGradient>
        ) : (
            <View style={[styles.base, styles[variant], { padding }, style]}>{children}</View>
        );

    return onPress ? (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            {body}
        </Pressable>
    ) : (
        body
    );
}

const styles = StyleSheet.create({
    base: { borderRadius: radius.xl, borderWidth: 1, overflow: 'hidden' },
    surface: { backgroundColor: colors.surface, borderColor: colors.border },
    raised: { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
    selected: { backgroundColor: 'rgba(139,233,247,0.1)', borderColor: colors.primary, borderWidth: 1.5 },
    accent: { borderColor: colors.accent },
    pressed: { opacity: 0.85 }
});
