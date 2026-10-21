import { ProfileCard } from '@/components/library';
import { Screen } from '@/components/layout';
import { BalanceCard, VipCard } from '@/components/monetization';
import { AppText, Button, ListGroup } from '@/components/ui';
import { SETTINGS_LINKS, USER, VIP_PERIOD, VIP_PRICE } from '@/data';
import { useAppStore } from '@/state/AppStore';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

// Composed entirely from existing building blocks
export default function ProfileScreen() {
    const { coins, isVip, activateVip } = useAppStore();

    return (
        <Screen contentStyle={{ paddingTop: spacing.md }}>
            <AppText variant="h1">Profile</AppText>
            <ProfileCard user={USER} isVip={isVip} onManage={() => nav.store()} />
            <BalanceCard coins={coins} />
            <VipCard price={VIP_PRICE} period={VIP_PERIOD} active={isVip} onPress={activateVip} />
            <ListGroup items={SETTINGS_LINKS} />
            <Button title="Sign out" variant="outline" onPress={nav.signOut} />
        </Screen>
    );
}
