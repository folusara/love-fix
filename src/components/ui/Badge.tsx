import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors, gradients, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

type Tone = 'pro' | 'cyan' | 'dark' | 'gradient' | 'accent';

interface BadgeProps {
    label: string;
    tone?: Tone;
    icon?: IconName;
    style?: StyleProp<ViewStyle>;
}

export function Badge({ label, tone = 'cyan', icon, style }: BadgeProps) {
    const iconName = tone === 'pro' ? 'crown' : icon;
    const fg = tone === 'dark' ? colors.text : tone === 'accent' ? colors.text : colors.onPrimary;
    const content = (
        <>
            {iconName ? <Icon name={iconName} size={14} color={fg} /> : null}
            <AppText variant="label" color={fg}>
                {label}
            </AppText>
        </>
    );

    if (tone === 'pro' || tone === 'gradient') {
        return (
            <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.base, style]}>
                {content}
            </LinearGradient>
        );
    }

    return <View style={[styles.base, styles[tone], style]}>{content}</View>;
}

const styles = StyleSheet.create({
    base: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
    cyan: { backgroundColor: colors.primary },
    dark: { backgroundColor: 'rgba(30,30,40,0.9)' },
    accent: { backgroundColor: colors.accent }
});
