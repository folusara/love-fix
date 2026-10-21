import { Pressable, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { AppText, Avatar, Card, Icon } from '@/components/ui';
import { colors, gradients, radius, spacing } from '@/theme';
import { UserProfile } from '@/types';

interface ProfileCardProps {
    user: UserProfile;
    isVip: boolean;
    onManage: () => void;
}

export function ProfileCard({ user, isVip, onManage }: ProfileCardProps) {
    return (
        <Card variant="accent" padding={spacing.xl}>
            <View style={styles.row}>
                <Avatar uri={user.avatar} size={72} ring />
                <View style={styles.copy}>
                    <AppText variant="h2" numberOfLines={1}>
                        {user.name}
                    </AppText>
                    <View style={styles.status}>
                        <Icon name="crown" size={16} color={isVip ? colors.gold : colors.textMuted} />
                        <AppText variant="bodyMedium" color="textMuted">
                            {isVip ? 'Premium member' : 'Free member'}
                        </AppText>
                    </View>
                </View>
                <Pressable onPress={onManage}>
                    <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.manage}>
                        <AppText variant="title" color="onPrimary">
                            {isVip ? 'Manage' : 'Go VIP'}
                        </AppText>
                    </LinearGradient>
                </Pressable>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
    copy: { flex: 1, gap: spacing.xs },
    status: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    manage: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.md }
});
