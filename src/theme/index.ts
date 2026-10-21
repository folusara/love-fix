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
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
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
  display: { fontFamily: fonts.serifHeavy, fontSize: 36, lineHeight: 42 },
  h1: { fontFamily: fonts.serif, fontSize: 30, lineHeight: 36 },
  h2: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 30 },
  h3: { fontFamily: fonts.serif, fontSize: 19, lineHeight: 25 },
  number: { fontFamily: fonts.serif, fontSize: 30, lineHeight: 36 },
  title: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 22 },
  button: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 20 },
  body: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 23 },
  bodyMedium: { fontFamily: fonts.sansMedium, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 13, lineHeight: 17 },
  micro: { fontFamily: fonts.sansSemiBold, fontSize: 11, lineHeight: 14 },
} as const;

export type ColorToken = keyof typeof colors;
export type TypographyVariant = keyof typeof typography;
