import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { colors, ms, radius } from "@/theme";

import { Icon, IconName } from "./Icon";

type Variant = "glass" | "outline" | "plain" | "brand";

interface IconButtonProps {
  icon: IconName;
  onPress?: () => void;
  variant?: Variant;
  size?: number;
  iconSize?: number;
  color?: string;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const VARIANT: Record<Variant, ViewStyle> = {
  glass: { backgroundColor: "rgba(0,0,0,0.45)" },
  outline: { borderWidth: 1, borderColor: colors.borderStrong },
  plain: {},
  brand: { backgroundColor: colors.primary, borderRadius: radius.md },
};

export function IconButton({
  icon,
  onPress,
  variant = "plain",
  size: baseSize = 44,
  iconSize = 22,
  color,
  dot,
  style,
  accessibilityLabel,
}: IconButtonProps) {
  const size = ms(baseSize);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? icon}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        VARIANT[variant],
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon
        name={icon}
        size={iconSize}
        color={color ?? (variant === "brand" ? colors.onPrimary : colors.text)}
      />
      {dot ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
  pressed: { opacity: 0.7 },
  dot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
