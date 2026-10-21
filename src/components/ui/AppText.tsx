import { Text, TextProps } from "react-native";

import { colors, ColorToken, typography, TypographyVariant } from "@/theme";

/** Respect the user's text-size setting, but cap it so fixed-height UI (buttons, chips) never clips */
const MAX_FONT_SCALE = 1.2;

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorToken | (string & {});
  align?: "left" | "center" | "right";
}

export function AppText({
  variant = "body",
  color = "text",
  align,
  style,
  ...rest
}: AppTextProps) {
  const resolved = color in colors ? colors[color as ColorToken] : color;
  return (
    <Text
      maxFontSizeMultiplier={MAX_FONT_SCALE}
      {...rest}
      style={[
        typography[variant],
        { color: resolved, textAlign: align },
        style,
      ]}
    />
  );
}
