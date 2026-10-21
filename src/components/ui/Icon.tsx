import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '@/theme';

// One registry: screens use semantic names, never icon-set specifics
const ICONS = {
    heart: ['feather', 'heart'],
    heartFilled: ['mci', 'heart'],
    search: ['feather', 'search'],
    bell: ['feather', 'bell'],
    play: ['feather', 'play'],
    playFilled: ['mci', 'play'],
    plus: ['feather', 'plus'],
    lock: ['feather', 'lock'],
    star: ['feather', 'star'],
    list: ['feather', 'list'],
    clock: ['feather', 'clock'],
    share: ['feather', 'share'],
    shareNodes: ['feather', 'share-2'],
    comment: ['feather', 'message-square'],
    back: ['feather', 'chevron-left'],
    chevronRight: ['feather', 'chevron-right'],
    home: ['feather', 'home'],
    compass: ['feather', 'compass'],
    bookmark: ['feather', 'bookmark'],
    user: ['feather', 'user'],
    zap: ['feather', 'zap'],
    shield: ['feather', 'shield'],
    card: ['feather', 'credit-card'],
    mail: ['feather', 'mail'],
    check: ['feather', 'check'],
    sliders: ['feather', 'sliders'],
    help: ['feather', 'help-circle'],
    close: ['feather', 'x'],
    tv: ['feather', 'tv'],
    crown: ['mci', 'crown-outline'],
    flame: ['mci', 'fire'],
    sparkle: ['mci', 'star-four-points-outline'],
    google: ['mci', 'google'],
    apple: ['mci', 'apple']
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}

export function Icon({ name, size = 20, color = colors.text }: IconProps) {
    const [set, glyph] = ICONS[name];
    if (set === 'mci') return <MaterialCommunityIcons name={glyph as never} size={size} color={color} />;
    return <Feather name={glyph as never} size={size} color={color} />;
}
