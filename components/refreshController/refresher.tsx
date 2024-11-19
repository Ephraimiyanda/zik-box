import { Colors } from "@/constants/Colors";
import { RefreshControl } from "react-native";
interface refresher {
    refreshing: boolean;
    onRefresh:(() => void) | undefined
}
export function refresher({refreshing,onRefresh}:refresher) {
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={Colors.active} />;
}