import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import { colors, ms } from "@/theme";

export function Avatar({
  uri,
  size: baseSize = 48,
  ring = false,
}: {
  uri: string;
  size?: number;
  ring?: boolean;
}) {
  const size = ms(baseSize);
  return (
    <Image
      source={{ uri }}
      transition={200}
      style={[
        { width: size, height: size, borderRadius: size / 2 },
        ring && styles.ring,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  ring: { borderWidth: 3, borderColor: colors.borderStrong },
});
