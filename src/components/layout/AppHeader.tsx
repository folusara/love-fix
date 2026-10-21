import { StyleSheet, View } from "react-native";

import { Avatar, IconButton, Logo } from "@/components/ui";
import { USER } from "@/data";
import { spacing } from "@/theme";

export function AppHeader({
  onSearch,
  onNotifications,
}: {
  onSearch?: () => void;
  onNotifications?: () => void;
}) {
  return (
    <View style={styles.row}>
      <Logo size={42} />
      <View style={styles.actions}>
        <IconButton icon="search" iconSize={26} onPress={onSearch} />
        <IconButton icon="bell" iconSize={26} dot onPress={onNotifications} />
        <Avatar uri={USER.avatar} size={42} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
});
