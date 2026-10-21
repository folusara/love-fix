import { StyleSheet, View } from 'react-native';

import { SectionHeader } from '@/components/ui';
import { filterByGenre, getSeriesByIds } from '@/data';
import { spacing } from '@/theme';
import { Genre, HomeCategory, Series } from '@/types';

import { PosterRail } from './PosterRail';

interface CategorySectionProps {
    category: HomeCategory;
    genre: 'All' | Genre;
    onPressSeries: (series: Series) => void;
}

export function CategorySection({ category, genre, onPressSeries }: CategorySectionProps) {
    const rails = category.rails
        .map((rail) => ({ ...rail, items: filterByGenre(getSeriesByIds(rail.seriesIds), genre) }))
        .filter((rail) => rail.items.length > 0);

    if (!rails.length) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SectionHeader title={category.title} kind="category" highlighted={category.highlighted} />
            </View>
            {rails.map((rail) => (
                <PosterRail key={rail.id} title={rail.title} data={rail.items} onPressItem={onPressSeries} onSeeAll={() => {}} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: spacing.xxxl },
    header: { paddingHorizontal: spacing.xl }
});
