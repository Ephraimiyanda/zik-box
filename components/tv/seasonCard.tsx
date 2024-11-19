import { View, Text, useColorScheme } from "react-native";
import { Image, ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { movieTypes, season } from "@/types/movieTypes";
import { Chip, Skeleton } from "@rneui/base";
import { CustomChip } from "../chip/chip";
export function SeasonCard({
  item,
  cardWidth,
}: {
  item: season;
  cardWidth: number;
}) {
  const colorScheme = useColorScheme();
  return (
    <Link
      //@ts-ignore
      href={"#"}
      style={{
        position: "relative",
        flexDirection: "column",
        display: "flex",
        gap: 3,
        paddingVertical: 3,
      }}
    >
      <View key={item.id}>
        {item.poster_path ? (
          <ImageBackground
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
              display: "flex",
              justifyContent: "flex-start",
            }}
            contentFit="cover"
            transition={1000}
            source={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
          >
            <CustomChip
              title={item.vote_average.toFixed(1).toString()}
              fontSize={14}
              marginLeft={"auto"}
              marginRight={10}
              size="sm"
              iconSize={20}
              width={70}
            ></CustomChip>
          </ImageBackground>
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
          {"season" + " " + item.season_number}
        </Text>
      </View>
    </Link>
  );
}
