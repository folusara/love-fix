import { Screen } from '@/components/layout';
import { PosterCard } from '@/components/series';
import { AppText, Grid } from '@/components/ui';
import { filterByGenre, SERIES } from '@/data';
import { nav } from '@/state/navigation';
import { spacing } from '@/theme';

export default function RomanceScreen() {
    const items = filterByGenre(SERIES, 'Romance');

    return (
        <Screen contentStyle={{ paddingTop: spacing.lg }}>
            <AppText variant="h1">Romance</AppText>
            <Grid
                data={items}
                columns={2}
                keyExtractor={(s) => s.id}
                renderItem={(series) => <PosterCard series={series} onPress={(s) => nav.series(s.id)} />}
            />
        </Screen>
    );
}
