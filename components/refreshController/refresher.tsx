import { Colors } from "@/constants/Colors";
import { colorScheme } from "@/constants/colorScheme";
import { RefreshControl } from "react-native";
interface refresher {
  refreshing: boolean;
  onRefresh: (() => void) | undefined;
}
export function Refresher({ refreshing, onRefresh }: refresher) {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      progressBackgroundColor={Colors[colorScheme ?? "dark"].background}
      colors={[Colors.active]}
    />
  );
}
