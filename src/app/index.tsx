import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Button, Card, Chip, Divider, GradientText, Logo } from '@/components/ui';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

// Welcome / sign-in. All providers are mocked and route straight into the app.
export default function WelcomeScreen() {
    return (
        <Screen background="glow" edges={['top', 'bottom']} contentStyle={styles.content}>
            <View style={styles.logo}>
                <Logo size={56} withWordmark />
            </View>

            <View style={styles.hero}>
                <GradientText variant="display" align="center">
                    Your next obsession starts here.
                </GradientText>
                <AppText variant="body" color="textMuted" align="center">
                    Dive into premium short-form romances.
                </AppText>
            </View>

            <Card padding={spacing.xxl} style={styles.card}>
                <Button title="Continue with Google" icon="google" variant="secondary" pill={false} onPress={nav.enterApp} />
                <Button title="Continue with Apple" icon="apple" variant="secondary" pill={false} onPress={nav.enterApp} />
                <Divider label="or" />
                <Button title="Continue with email" icon="mail" size="lg" onPress={nav.enterApp} />
                <AppText variant="bodyMedium" color="textMuted" align="center">
                    New here?{' '}
                    <AppText variant="bodyMedium" color="primary" onPress={nav.enterApp}>
                        Create account
                    </AppText>
                </AppText>
                <View style={styles.legal}>
                    <AppText variant="caption" color="textSubtle">
                        Terms
                    </AppText>
                    <AppText variant="caption" color="textSubtle">
                        Privacy
                    </AppText>
                </View>
            </Card>

            <View style={styles.trust}>
                <Chip label="Secure and encrypted" variant="glass" icon="shield" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { flexGrow: 1, justifyContent: 'space-between', paddingTop: spacing.xxl, gap: spacing.xxxl },
    logo: { alignItems: 'center' },
    hero: { gap: spacing.md, paddingHorizontal: spacing.md },
    card: { gap: spacing.lg },
    legal: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xxl },
    trust: { alignItems: 'center' }
});
