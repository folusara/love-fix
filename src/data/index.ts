import { FeedItem, Genre, Series } from '@/types';

import { getEpisodes } from './episodes';
import { SERIES } from './series';

export * from './episodes';
export * from './home';
export * from './library';
export * from './monetization';
export * from './series';

const byId = new Map(SERIES.map((s) => [s.id, s]));

export const getSeriesById = (id: string): Series | undefined => byId.get(id);

export const getSeriesByIds = (ids: string[]): Series[] => ids.map((id) => byId.get(id)).filter((s): s is Series => Boolean(s));

export const filterByGenre = (items: Series[], genre: 'All' | Genre) => (genre === 'All' ? items : items.filter((s) => s.genres.includes(genre)));

// "For you" feed: first episode of every series
export const getDiscoverFeed = (): FeedItem[] =>
    SERIES.map((series) => {
        const episode = getEpisodes(series)[0];
        return { key: episode.id, series, episode };
    });

export const getSeriesFeed = (series: Series): FeedItem[] => getEpisodes(series).map((episode) => ({ key: episode.id, series, episode }));
