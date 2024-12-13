import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { movieTypes } from "@/types/movieTypes";
import { Skeleton } from "@rneui/base";
import { TouchableOpacity } from "react-native";
export function MovieCard({
  item,
  cardWidth,
}: {
  item: movieTypes;
  cardWidth: number;
}) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/movie/${item.id}`);
      }}
      style={{
        flexDirection: "column",
        display: "flex",
        gap: 3,
        paddingVertical: 3,
        marginHorizontal: "auto",
      }}
    >
      <View key={item.id}>
        <Image
          style={{
            minHeight: 170,
            maxHeight: 170,
            height: "100%",
            flex: 1,
            width: cardWidth,
            borderRadius: 10,
            backgroundColor: "transparent",
            borderColor: "transparent",
            maxWidth: cardWidth,
          }}
          contentFit="cover"
          transition={1000}
          source={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
          placeholder={require("../../assets/images/no-poster-1.jpg")}
          placeholderContentFit="cover"
        />

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: Colors[colorScheme ?? "dark"].text,
            maxWidth: cardWidth / 1.2,
          }}
          numberOfLines={2}
        >
          {item.title ? item.title : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
