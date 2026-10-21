import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { colors, gradients, spacing } from '@/theme';

interface ScreenProps {
    children: React.ReactNode;
    scroll?: boolean;
    edges?: Edge[];
    background?: 'plain' | 'glow';
    padded?: boolean;
    footer?: React.ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({ children, scroll = true, edges = ['top'], background = 'plain', padded = true, footer, contentStyle }: ScreenProps) {
    const content = [styles.content, padded && styles.padded, contentStyle];

    return (
        <View style={styles.page}>
            {background === 'glow' ? <LinearGradient colors={gradients.welcome} locations={[0, 0.35, 0.7, 1]} style={StyleSheet.absoluteFill} /> : null}
            <SafeAreaView edges={edges} style={styles.root}>
                {scroll ? (
                    <ScrollView contentContainerStyle={content} showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.root, content]}>{children}</View>
                )}
                {footer}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.bg },
    root: { flex: 1 },
    content: { paddingBottom: spacing.huge, gap: spacing.xxl },
    padded: { paddingHorizontal: spacing.xl }
});
