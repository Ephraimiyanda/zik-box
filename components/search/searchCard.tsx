import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchCard } from "@/types/movieTypes";
import { AntDesign } from "@expo/vector-icons";
export function SearchCard({ item }: { item: Partial<searchCard> }) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  //navigate to movies or tv page
  function navigate() {
    if (item.media_type === "movie") {
      router.push(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      router.push(`/tv/${item.id}`);
    }
  }
  return (
    <TouchableOpacity
      onPress={navigate}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 4,
        paddingVertical: 7,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: 60,
          height: 70,
          borderRadius: 10,
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
        contentFit="cover"
        transition={1000}
        accessible
        source={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        placeholder={require("../../assets/images/no-poster-2.jpg")}
        placeholderContentFit="cover"
      />
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 5,
          width: "82%",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 3,
              width: "82%",
            }}
          >
            {item.media_type === "movie" ? (
              <MaterialCommunityIcons
                name="movie-open-outline"
                size={18}
                color={Colors[colorScheme ?? "dark"].active}
              />
            ) : item.media_type === "tv" ? (
              <Feather
                name="tv"
                size={18}
                color={Colors[colorScheme ?? "dark"].active}
              />
            ) : item.media_type === "person" ? (
              <Ionicons
                name="person-outline"
                size={18}
                color={Colors[colorScheme ?? "dark"].active}
              />
            ) : null}
            <Text
              style={[
                style.text,
                {
                  color: Colors[colorScheme ?? "dark"].text,
                },
              ]}
              numberOfLines={1}
            >
              {item.original_name ?? item.original_title}
            </Text>
          </View>
          <Text
            style={[
              style.text,
              {
                color: Colors[colorScheme ?? "dark"].faintText,
              },
            ]}
            numberOfLines={1}
          >
            {item.overview ?? "known for" + " " + item.known_for_department}
          </Text>
        </View>
        {Number(item?.vote_average) >= 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="star"
              size={15}
              color={Colors[colorScheme ?? "dark"].active}
            />

            <Text
              style={{
                color: Colors[colorScheme ?? "dark"].active,
                fontWeight: "500",
              }}
            >
              {item?.vote_average?.toFixed(1).toString()}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
  },
});
