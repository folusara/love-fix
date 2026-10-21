import { Tabs } from 'expo-router';

import { Icon, IconName } from '@/components/ui';
import { colors, fonts } from '@/theme';

const TABS: { name: string; title: string; icon: IconName }[] = [
    { name: 'index', title: 'Home', icon: 'home' },
    { name: 'discover', title: 'Discover', icon: 'compass' },
    { name: 'romance', title: 'Romance', icon: 'heart' },
    { name: 'library', title: 'Library', icon: 'bookmark' },
    { name: 'profile', title: 'Profile', icon: 'user' }
];

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSubtle,
                tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.border },
                tabBarLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 12 },
                sceneStyle: { backgroundColor: colors.bg }
            }}
        >
            {TABS.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{ title: tab.title, tabBarIcon: ({ color, size }) => <Icon name={tab.icon} color={String(color)} size={size} /> }}
                />
            ))}
        </Tabs>
    );
}
