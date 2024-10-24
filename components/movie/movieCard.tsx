import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { movieTypes } from "@/types/movieTypes";
import { Skeleton } from "@rneui/base";
export function MovieCard({ item }: { item: movieTypes }) {
  const colorScheme = useColorScheme();
  return (
    <View
      key={item.id}
      style={{
        position: "relative",
        flexDirection: "column",
        display: "flex",
        gap: 3,
        paddingVertical: 3,
      }}
    >
      {item.poster_path ? (
        <Image
          style={{
            minHeight: 170,
            maxHeight: 170,
            height: "100%",
            flex: 1,
            width: 180,
            borderRadius: 10,
            backgroundColor: Colors.active,
            borderColor: Colors.active,
            maxWidth: 110,
          }}
          contentFit="cover"
          transition={1000}
          source={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        />
      ) : (
        <Skeleton
          style={{
            flex: 1,
            width: "100%",
            height: 170,
            borderRadius: 10,
            maxWidth: 180,
          }}
        />
      )}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: Colors[colorScheme ?? "dark"].text,
          maxWidth: 100,
        }}
        numberOfLines={2}
      >
        {item.title ? item.title : item.name}
      </Text>
    </View>
  );
}
