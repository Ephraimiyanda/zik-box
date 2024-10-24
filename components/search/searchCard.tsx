import { View, Text, useColorScheme, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export function SearchCard() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 4,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: 55,
          height: 55,
          borderRadius: 10,
          backgroundColor: Colors.active,
          borderColor: Colors.active,
          maxWidth: 55,
        }}
        contentFit="cover"
        transition={1000}
        accessible
        source="https://nkiri.com/wp-content/uploads/2021/11/hawkeye-hollywood-series.jpg"
      />
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
                  gap: 4,
          width:"82%"
        }}
      >
        <Text
          style={[
            style.text,
            {
              color: Colors[colorScheme ?? "dark"].text,
            },
          ]}
          numberOfLines={1}
        >
          Pranshu Chittora
        </Text>
        <Text
          style={[
            style.text,
            {
              color: Colors[colorScheme ?? "dark"].faintText,
            },
          ]}
          numberOfLines={1}
        >
          Pranshu Chitt oragxf mmmvngh mmmmmmmmmmmm
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
  },
});
