import { Text, TextProps } from 'react-native';

import { colors, ColorToken, typography, TypographyVariant } from '@/theme';

export interface AppTextProps extends TextProps {
    variant?: TypographyVariant;
    color?: ColorToken | (string & {});
    align?: 'left' | 'center' | 'right';
}

export function AppText({ variant = 'body', color = 'text', align, style, ...rest }: AppTextProps) {
    const resolved = color in colors ? colors[color as ColorToken] : color;
    return <Text {...rest} style={[typography[variant], { color: resolved, textAlign: align }, style]} />;
}
