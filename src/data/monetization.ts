import { CoinPack } from '@/types';

export const STARTING_COINS = 15;
export const SEASON_COIN_COST = 1200;
export const SEASON_PRICE = '€9.99';
export const VIP_PRICE = '€4.99';
export const VIP_PERIOD = 'week';
export const AD_DURATION_SEC = 5;

export const COIN_PACKS: CoinPack[] = [
    { id: 'p300', coins: 300, bonus: 0, price: '€2.99' },
    { id: 'p800', coins: 800, bonus: 50, price: '€6.99', tag: 'popular' },
    { id: 'p2500', coins: 2500, bonus: 200, price: '€19.99' },
    { id: 'p6000', coins: 6000, bonus: 1000, price: '€49.99', tag: 'best' }
];

export const DEFAULT_PACK_ID = 'p800';
