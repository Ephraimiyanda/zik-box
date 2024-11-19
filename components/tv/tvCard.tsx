import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { movieTypes } from "@/types/movieTypes";
import { Skeleton } from "@rneui/base";
export function TvCard({
  item,
  cardWidth,
}: {
  item: movieTypes;
  cardWidth: number;
}) {
  const colorScheme = useColorScheme();
  return (
    <Link
      href={{
        pathname: "/tv/[tvId]",
        params: { tvId: item.id },
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
        {item.poster_path ? (
          <Image
            style={{
              minHeight: 170,
              maxHeight: 170,
              height: "100%",
              flex: 1,
              width: cardWidth,
              borderRadius: 10,
              backgroundColor: Colors.active,
              borderColor: Colors.active,
              maxWidth: cardWidth,
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
              maxWidth: cardWidth,
            }}
          />
        )}

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
    </Link>
  );
}
