import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

import RNMaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import { gradients } from '@/theme';

import { AppText, AppTextProps } from './AppText';

// Class typings lag behind React 19 JSX types; the runtime component is fine
const MaskedView = RNMaskedView as unknown as ComponentType<ViewProps & { maskElement: React.ReactElement }>;

export function GradientText({ colors = gradients.brand, ...props }: AppTextProps & { colors?: readonly [string, string, ...string[]] }) {
    return (
        <MaskedView maskElement={<AppText {...props} />}>
            <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <AppText {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
}
