import { Genre, HomeCategory } from '@/types';

export const SPOTLIGHT_SERIES_ID = 'verbotene-liebe';

export const GENRE_FILTERS: ('All' | Genre)[] = ['All', 'Romance', 'Drama', 'Action', 'Mystery', 'Fantasy'];

export const HOME_CATEGORIES: HomeCategory[] = [
    {
        id: 'romance',
        title: 'Romance',
        highlighted: true,
        rails: [
            { id: 'trending-romance', title: 'Trending romance', seriesIds: ['der-ceo-und-ich', 'mein-geheimes-leben', 'liebe-auf-umwegen', 'ceo-secret-life'] },
            { id: 'forbidden-love', title: 'Forbidden love', seriesIds: ['blutige-rosen', 'schattenkuss', 'dunkle-begierde', 'forbidden-vows'] }
        ]
    },
    {
        id: 'micro-dramas',
        title: 'Popular micro dramas',
        rails: [
            { id: 'most-watched', title: 'Most watched', seriesIds: ['racheengel', 'schicksalsband', 'zweite-chance', 'billionaires-secret'] },
            { id: 'new-releases', title: 'New this week', seriesIds: ['love-fast-lane', 'heirs-dilemma', 'ceo-secret-life', 'verbotene-liebe'] }
        ]
    }
];

export const RECOMMENDED_IDS = ['forbidden-vows', 'love-fast-lane', 'heirs-dilemma', 'zweite-chance'];
