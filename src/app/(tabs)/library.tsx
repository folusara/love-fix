import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { LibraryCard, ProfileCard } from '@/components/library';
import { AppText, Grid, IconButton, ListGroup, SectionHeader, SegmentedControl } from '@/components/ui';
import { getSeriesById, LIBRARY, SETTINGS_LINKS, USER } from '@/data';
import { useAppStore } from '@/state/AppStore';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

const TABS = ['Saved', 'Purchases'] as const;

export default function LibraryScreen() {
    const [tab, setTab] = useState<(typeof TABS)[number]>('Saved');
    const { isVip, isEpisodeLocked } = useAppStore();

    const items = LIBRARY.filter((item) => (tab === 'Purchases' ? item.purchased : true));

    return (
        <Screen contentStyle={styles.content}>
            <View style={styles.header}>
                <AppText variant="h1">My library</AppText>
                <IconButton icon="sliders" iconSize={24} accessibilityLabel="Filter" />
            </View>

            <ProfileCard user={USER} isVip={isVip} onManage={() => nav.store()} />

            <SegmentedControl options={TABS} value={tab} onChange={setTab} />

            <Grid
                data={items}
                keyExtractor={(item) => item.seriesId}
                renderItem={(item) => {
                    const series = getSeriesById(item.seriesId)!;
                    return (
                        <LibraryCard
                            item={item}
                            series={series}
                            locked={isEpisodeLocked(series, item.currentEpisode) && item.status === 'locked'}
                            onPress={() => nav.series(series.id)}
                        />
                    );
                }}
            />

            <SectionHeader title="Settings and more" />
            <ListGroup items={SETTINGS_LINKS} onPressItem={(item) => item.id === 'purchases' && nav.store()} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { paddingTop: spacing.md },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
});
