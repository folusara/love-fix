import { CastMember, Genre, Series } from '@/types';

const poster = (seed: string) => `https://picsum.photos/seed/${seed}/600/900`;
const avatar = (id: number) => `https://i.pravatar.cc/240?img=${id}`;

const DEFAULT_CAST: CastMember[] = [
    { id: 'c1', name: 'Elena', role: 'Mia (Artist)', avatar: avatar(47) },
    { id: 'c2', name: 'Julian Vance', role: 'Alexander (CEO)', avatar: avatar(12) },
    { id: 'c3', name: 'Sarah Lin', role: 'Chloe (Best friend)', avatar: avatar(44) },
    { id: 'c4', name: 'Marcus', role: 'Rival CEO', avatar: avatar(60) }
];

const DEFAULT_HIGHLIGHTS = ['Intense chemistry from the very first frame.', 'A gripping double-life narrative with high stakes.'];

type SeriesSeed = Pick<Series, 'id' | 'title' | 'tagline' | 'genres' | 'episodeCount' | 'minutesPerEpisode' | 'isPro'> &
    Partial<Omit<Series, 'id' | 'title' | 'tagline' | 'genres' | 'episodeCount' | 'minutesPerEpisode' | 'isPro'>>;

// Single factory = no repeated boilerplate per title
const makeSeries = (seed: SeriesSeed): Series => ({
    poster: poster(seed.id),
    tags: seed.genres as Genre[],
    rating: 4.6,
    ratingCount: 8_400,
    year: 2026,
    freeEpisodes: 3,
    synopsis:
        'A chance encounter turns into a dangerous game of secrets, power and desire. Every episode ends on a twist you will not see coming.',
    highlights: DEFAULT_HIGHLIGHTS,
    cast: DEFAULT_CAST,
    likes: 12_000,
    comments: 342,
    ...seed
});

export const SERIES: Series[] = [
    makeSeries({
        id: 'verbotene-liebe',
        title: 'Verbotene Liebe',
        tagline: "A CEO's dangerous secret contract.",
        genres: ['Romance', 'Drama'],
        tags: ['Romance', 'Drama', 'Billionaire'],
        rating: 4.8,
        episodeCount: 72,
        minutesPerEpisode: 2,
        isPro: true
    }),
    makeSeries({
        id: 'ceo-secret-life',
        title: "The CEO's Secret Life",
        tagline: 'Power. Deception. Legacy.',
        genres: ['Romance', 'Drama'],
        tags: ['Billionaire', 'Secret identity', 'Romance'],
        rating: 4.8,
        ratingCount: 12_000,
        year: 2024,
        episodeCount: 45,
        minutesPerEpisode: 3,
        isPro: false,
        synopsis:
            "When a struggling artist accidentally discovers that the ruthless CEO of the city's largest conglomerate is actually her anonymous online confidant, her life is turned upside down. Can their digital romance survive the harsh reality of corporate espionage and forbidden love?"
    }),
    makeSeries({ id: 'der-ceo-und-ich', title: 'Der CEO und ich', tagline: 'A forbidden empire. A dangerous love.', genres: ['Romance'], episodeCount: 50, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'mein-geheimes-leben', title: 'Mein geheimes Leben', tagline: 'A thriller of masks and lies.', genres: ['Mystery', 'Drama'], episodeCount: 30, minutesPerEpisode: 1, isPro: false }),
    makeSeries({ id: 'liebe-auf-umwegen', title: 'Liebe auf Umwegen', tagline: 'Crossed hearts, winding paths.', genres: ['Romance', 'Fantasy'], episodeCount: 65, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'blutige-rosen', title: 'Blutige Rosen', tagline: 'Love that leaves a mark.', genres: ['Romance', 'Drama'], episodeCount: 80, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'schattenkuss', title: 'Schattenkuss', tagline: 'A love story that defies the darkness.', genres: ['Romance', 'Fantasy'], episodeCount: 45, minutesPerEpisode: 1.5, isPro: false }),
    makeSeries({ id: 'dunkle-begierde', title: 'Dunkle Begierde', tagline: 'A thriller of consuming passion.', genres: ['Romance', 'Mystery'], episodeCount: 60, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'racheengel', title: 'Racheengel', tagline: 'She came back for revenge.', genres: ['Action', 'Drama'], episodeCount: 90, minutesPerEpisode: 2.5, isPro: true }),
    makeSeries({ id: 'schicksalsband', title: 'Schicksalsband', tagline: 'Bound by fate, torn by secrets.', genres: ['Mystery', 'Fantasy'], episodeCount: 25, minutesPerEpisode: 1, isPro: false }),
    makeSeries({ id: 'zweite-chance', title: 'Zweite Chance', tagline: 'A new dawn, a new path.', genres: ['Romance', 'Drama'], episodeCount: 55, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'billionaires-secret', title: "The Billionaire's Secret", tagline: 'Confidential. Last will.', genres: ['Romance', 'Drama'], episodeCount: 40, minutesPerEpisode: 2, isPro: false }),
    makeSeries({ id: 'forbidden-vows', title: 'Forbidden Vows', tagline: 'Promises meant to be broken.', genres: ['Romance'], episodeCount: 35, minutesPerEpisode: 2, isPro: false }),
    makeSeries({ id: 'love-fast-lane', title: 'Love in the Fast Lane', tagline: 'Speed, money and a dangerous crush.', genres: ['Romance', 'Action'], episodeCount: 42, minutesPerEpisode: 2, isPro: true }),
    makeSeries({ id: 'heirs-dilemma', title: "The Heir's Dilemma", tagline: 'One fortune. Two heirs.', genres: ['Drama', 'Mystery'], episodeCount: 45, minutesPerEpisode: 2, isPro: false })
];
