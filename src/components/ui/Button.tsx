import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { colors, gradients, ms, radius, spacing } from "@/theme";

import { AppText } from "./AppText";
import { GradientText } from "./GradientText";
import { Icon, IconName } from "./Icon";

type Variant =
  | "primary"
  | "muted"
  | "secondary"
  | "outline"
  | "ghost"
  | "dark"
  | "gradientOutline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  glow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
}

const HEIGHT: Record<Size, number> = { sm: ms(40), md: ms(52), lg: ms(58) };

const VARIANT: Record<
  Exclude<Variant, "gradientOutline">,
  { bg: string; border: string; fg: string }
> = {
  primary: { bg: colors.primary, border: colors.primary, fg: colors.onPrimary },
  muted: {
    bg: colors.primaryMuted,
    border: colors.primaryMuted,
    fg: colors.onPrimary,
  },
  secondary: { bg: colors.surface, border: colors.border, fg: colors.text },
  dark: { bg: "#000000", border: colors.border, fg: colors.text },
  outline: { bg: "transparent", border: colors.borderStrong, fg: colors.text },
  ghost: { bg: "transparent", border: "transparent", fg: colors.textMuted },
};

export function Button({
  title,
  subtitle,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  glow,
  loading,
  disabled,
  pill = true,
  style,
}: ButtonProps) {
  const shape = {
    minHeight: HEIGHT[size],
    borderRadius: pill ? radius.pill : radius.md,
  };

  if (variant === "gradientOutline") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [pressed && styles.pressed, style]}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientBorder, { borderRadius: radius.lg }]}
        >
          <View
            style={[
              styles.base,
              styles.gradientInner,
              { minHeight: HEIGHT.lg + 8, borderRadius: radius.lg - 2 },
            ]}
          >
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <GradientText variant="h3" style={styles.sans}>
                {title}
              </GradientText>
            )}
            {subtitle && !loading ? (
              <AppText variant="caption" color="textMuted">
                {subtitle}
              </AppText>
            ) : null}
          </View>
        </LinearGradient>
      </Pressable>
    );
  }

  const palette = VARIANT[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles.row,
        shape,
        { backgroundColor: palette.bg, borderColor: palette.border },
        glow && styles.glow,
        (pressed || disabled) && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <>
          {icon ? (
            <Icon
              name={icon}
              size={size === "sm" ? 16 : 20}
              color={palette.fg}
            />
          ) : null}
          <AppText
            variant={size === "lg" ? "title" : "button"}
            color={palette.fg}
            style={size === "lg" && styles.large}
          >
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: spacing.xl,
  },
  row: { flexDirection: "row", gap: spacing.md },
  large: { fontSize: ms(19, 0.3) },
  sans: { fontFamily: "Inter_700Bold", fontSize: ms(20, 0.3) },
  glow: {
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  pressed: { opacity: 0.75 },
  gradientBorder: { padding: 1.5 },
  gradientInner: {
    backgroundColor: "#0D0D18",
    borderWidth: 0,
    gap: 2,
    paddingVertical: spacing.sm,
  },
});
