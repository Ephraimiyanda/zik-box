import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { cast, movieTypes } from "@/types/movieTypes";
import { Skeleton } from "@rneui/base";

export function ProfileCard({
  item,
  cardWidth,
}: {
  item: cast;
  cardWidth: number;
}) {
  const colorScheme = useColorScheme();
  return (
    <Link
      href={{
        pathname: "/movie/[movieId]",
        params: { movieId: item.id },
      }}
      style={{
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        gap: 3,
        paddingVertical: 3,
      }}
    >
      <View
        key={item.id}
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Image
          style={{
            minHeight: 100,
            maxHeight: 100,
            height: "100%",
            flex: 1,
            width: 100,
            borderRadius: 50,
            backgroundColor: Colors.active,
            borderColor: Colors.active,
            maxWidth: cardWidth,
          }}
          contentFit="cover"
          transition={1000}
          source={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
          placeholder={require("../../assets/images/no-avatar.jpg")}
        />

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: Colors[colorScheme ?? "dark"].text,
            maxWidth: cardWidth,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: Colors[colorScheme ?? "dark"].faintText,
            maxWidth: cardWidth,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {item.character}
        </Text>
      </View>
    </Link>
  );
}
