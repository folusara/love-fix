import { ms, screenFraction } from "./scale";

export const colors = {
  bg: "#050509",
  surface: "#13132A",
  surfaceAlt: "#1A1A33",
  surfaceRaised: "#22223D",
  border: "#2A2A4A",
  borderStrong: "#3B3B60",
  primary: "#8BE9F7",
  primaryMuted: "#4F8D96",
  primarySoft: "rgba(139,233,247,0.14)",
  onPrimary: "#06222A",
  accent: "#C17BF2",
  accentSoft: "rgba(193,123,242,0.2)",
  text: "#FFFFFF",
  textMuted: "#B6B5CF",
  textSubtle: "#7A7993",
  glass: "rgba(14,16,40,0.72)",
  scrim: "rgba(0,0,0,0.45)",
  gold: "#F5C451",
} as const;

export const gradients = {
  brand: ["#8BE9F7", "#C17BF2"] as const,
  brandReverse: ["#C17BF2", "#8BE9F7"] as const,
  fadeBottom: ["transparent", "rgba(5,5,9,0.55)", "#050509"] as const,
  fadeTop: ["rgba(5,5,9,0.85)", "transparent"] as const,
  welcome: ["#0E2A33", "#050509", "#050509", "#2A1240"] as const,
  accentCard: ["#2A1840", "#16142C"] as const,
};

export const spacing = {
  xxs: ms(2),
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  xxl: ms(24),
  xxxl: ms(32),
  huge: ms(48),
} as const;

export const radius = {
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  xxl: ms(28),
  pill: 999,
} as const;

export const fonts = {
  serif: "PlayfairDisplay_700Bold",
  serifHeavy: "PlayfairDisplay_800ExtraBold",
  sans: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemiBold: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",
} as const;

export const typography = {
  display: {
    fontFamily: fonts.serifHeavy,
    fontSize: ms(36, 0.3),
    lineHeight: ms(42, 0.3),
  },
  h1: {
    fontFamily: fonts.serif,
    fontSize: ms(30, 0.3),
    lineHeight: ms(36, 0.3),
  },
  h2: {
    fontFamily: fonts.serif,
    fontSize: ms(24, 0.3),
    lineHeight: ms(30, 0.3),
  },
  h3: {
    fontFamily: fonts.serif,
    fontSize: ms(19, 0.3),
    lineHeight: ms(25, 0.3),
  },
  number: {
    fontFamily: fonts.serif,
    fontSize: ms(30, 0.3),
    lineHeight: ms(36, 0.3),
  },
  title: {
    fontFamily: fonts.sansSemiBold,
    fontSize: ms(16, 0.3),
    lineHeight: ms(22, 0.3),
  },
  button: {
    fontFamily: fonts.sansSemiBold,
    fontSize: ms(16, 0.3),
    lineHeight: ms(20, 0.3),
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: ms(15, 0.3),
    lineHeight: ms(23, 0.3),
  },
  bodyMedium: {
    fontFamily: fonts.sansMedium,
    fontSize: ms(15, 0.3),
    lineHeight: ms(22, 0.3),
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: ms(13, 0.3),
    lineHeight: ms(18, 0.3),
  },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: ms(13, 0.3),
    lineHeight: ms(17, 0.3),
  },
  micro: {
    fontFamily: fonts.sansSemiBold,
    fontSize: ms(11, 0.3),
    lineHeight: ms(14, 0.3),
  },
} as const;

/** Layout dimensions that must adapt to screen size, not just density */
export const layout = {
  heroHeight: screenFraction(0.74, 520, 680),
  detailHeroHeight: screenFraction(0.52, 360, 480),
  railCardWidth: ms(140),
  headerControl: ms(46),
} as const;

export { hs, ms, screenFraction, vs } from "./scale";

export type ColorToken = keyof typeof colors;
export type TypographyVariant = keyof typeof typography;
