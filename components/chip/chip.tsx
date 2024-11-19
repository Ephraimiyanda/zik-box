import { Chip } from "@rneui/base";
import { DimensionValue } from "react-native";
interface customChip {
  title: string;
  size?: "md" | "sm" | "lg";
  width?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  iconSize?: number;
  fontSize?: number;
}
export function CustomChip({
  title,
  size,
  width,
  marginLeft,
  marginRight,
  iconSize,
  fontSize,
}: customChip) {
  return (
    <Chip
      title={title}
      icon={{
        name: "star-outline",
        type: "FontAwesome",
        size: iconSize ?? 24,
        color: "#FF8700",
      }}
      titleStyle={{
        fontWeight: "700",
        color: "#FF8700",
        fontSize: fontSize ?? 16,
        textAlign: "center",
      }}
      size={size ?? "md"}
      containerStyle={{
        marginVertical: 5,
        borderRadius: 10,
        width: width ?? 90,
        marginLeft: marginLeft ?? 0,
        bottom: 0,
        marginRight: marginRight ?? 0,
        paddingRight: 0,
        paddingLeft: 6,
      }}
      color={"rgba(255, 255, 255, 0.2)"}
      useForeground
    />
  );
}
