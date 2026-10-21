import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { AppText, Button, Icon } from '@/components/ui';
import { ProgressBar } from '@/components/player/ProgressBar';
import { AD_DURATION_SEC } from '@/data';
import { colors, radius, spacing } from '@/theme';

interface RewardedAdModalProps {
    visible: boolean;
    onRewarded: () => void;
    onClose: () => void;
}

// Mock rewarded ad: in production this wraps the ad SDK's rewarded format
export function RewardedAdModal({ visible, onRewarded, onClose }: RewardedAdModalProps) {
    const [elapsed, setElapsed] = useState(0);
    const done = elapsed >= AD_DURATION_SEC;

    useEffect(() => {
        if (!visible) {
            setElapsed(0);
            return;
        }
        const id = setInterval(() => setElapsed((s) => Math.min(s + 1, AD_DURATION_SEC)), 1000);
        return () => clearInterval(id);
    }, [visible]);

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <View style={styles.sheet}>
                    <Icon name="tv" size={44} color={colors.primary} />
                    <AppText variant="h2" align="center">
                        {done ? 'Episode unlocked' : 'Sponsored break'}
                    </AppText>
                    <AppText variant="body" color="textMuted" align="center">
                        {done ? 'Thanks for watching. Enjoy the next episode.' : `Your episode unlocks in ${AD_DURATION_SEC - elapsed}s`}
                    </AppText>
                    <View style={styles.progress}>
                        <ProgressBar progress={elapsed / AD_DURATION_SEC} />
                    </View>
                    <Button title={done ? 'Continue watching' : 'Skip and stay locked'} variant={done ? 'primary' : 'ghost'} onPress={done ? onRewarded : onClose} style={styles.cta} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: spacing.xl },
    sheet: { alignItems: 'center', gap: spacing.lg, padding: spacing.xxl, borderRadius: radius.xxl, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    progress: { alignSelf: 'stretch', borderRadius: radius.pill, overflow: 'hidden' },
    cta: { alignSelf: 'stretch' }
});
