import { LibraryItem, UserProfile } from '@/types';
import { IconName } from '@/components/ui/Icon';

export const USER: UserProfile = { name: 'Sarah Connor', avatar: 'https://i.pravatar.cc/240?img=45' };

export const LIBRARY: LibraryItem[] = [
    { seriesId: 'der-ceo-und-ich', currentEpisode: 12, status: 'new', subGenre: 'Billionaire romance', purchased: true },
    { seriesId: 'dunkle-begierde', currentEpisode: 5, status: 'locked', subGenre: 'Enemies to lovers', purchased: false },
    { seriesId: 'zweite-chance', currentEpisode: 55, status: 'completed', subGenre: 'Romance', purchased: true },
    { seriesId: 'heirs-dilemma', currentEpisode: 1, status: 'locked', subGenre: 'Historical romance', purchased: false }
];

export const SETTINGS_LINKS: { id: string; icon: IconName; label: string }[] = [
    { id: 'history', icon: 'clock', label: 'Watch history' },
    { id: 'purchases', icon: 'card', label: 'Purchases and subscriptions' },
    { id: 'notifications', icon: 'bell', label: 'Notifications' },
    { id: 'help', icon: 'help', label: 'Help and support' }
];
