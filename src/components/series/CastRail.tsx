import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Avatar } from '@/components/ui';
import { spacing } from '@/theme';
import { CastMember } from '@/types';

export function CastRail({ cast }: { cast: CastMember[] }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
            {cast.map((member) => (
                <View key={member.id} style={styles.member}>
                    <Avatar uri={member.avatar} size={84} ring />
                    <AppText variant="title" align="center">
                        {member.name}
                    </AppText>
                    <AppText variant="caption" color="textMuted" align="center">
                        {member.role}
                    </AppText>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: { gap: spacing.lg },
    member: { width: 96, alignItems: 'center', gap: spacing.xs }
});
