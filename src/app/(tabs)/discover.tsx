import { useMemo } from 'react';

import { EpisodeFeed } from '@/components/player';
import { getDiscoverFeed } from '@/data';

// Vertical "For you" feed: episode 1 of every series, tap Watch to open the series
export default function DiscoverScreen() {
    const items = useMemo(getDiscoverFeed, []);
    return <EpisodeFeed items={items} ctaMode="open-series" autoAdvance />;
}
