import styles from "@/styles/style";
import {
  Alert,
  ScrollView,
  View,
  Text,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import React, { useCallback, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { SLIDER_WIDTH } from "@/components/carousel/carouselItem";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Chip } from "@rneui/base";

export default function MovieDetails() {
  const { movieId } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const url = `movie/${movieId}?language=en-US`;
  const { tmdbData, ytsData, isLoading, error } = useFetchDetails(url);
  const colorScheme = useColorScheme();

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const toggleTextDisplay = () => {
    setShowFullText((prev) => !prev);
  };

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const previewText = tmdbData?.overview?.slice(0, 200);
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 4,
          paddingTop: 10,
        }}
      >
        {!isLoading && (
          <YoutubePlayer
            height={220}
            width={SLIDER_WIDTH}
            play={playing}
            videoId={"iee2TATGMyI"}
          />
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            paddingRight: 14,
            paddingLeft: 14,
            width: "100%",
          }}
        >
          <ThemedText
            style={{
              fontSize: 24,
              paddingTop: 6,
              fontWeight: "500",
            }}
            numberOfLines={2}
          >
            {tmdbData?.original_title}
          </ThemedText>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 16,
              borderBottomWidth: 0.4,
              borderBottomColor: Colors[colorScheme ?? "dark"].faintText,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              <EvilIcons
                name="clock"
                size={28}
                color={Colors[colorScheme ?? "dark"].faintText}
              />
              <Text
                style={{
                  color: Colors[colorScheme ?? "dark"].faintText,
                  fontWeight: "500",
                }}
              >
                {tmdbData?.runtime} minutes
              </Text>
            </View>
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
                size={20}
                color={Colors[colorScheme ?? "dark"].faintText}
              />
              <Text
                style={{
                  color: Colors[colorScheme ?? "dark"].faintText,
                  fontWeight: "500",
                }}
              >
                {tmdbData?.vote_average?.toFixed(1).toString()} (IMDb)
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
              borderBottomWidth: 0.4,
              borderBottomColor: Colors[colorScheme ?? "dark"].faintText,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "flex-start",
                width: "35%",
              }}
            >
              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
                numberOfLines={2}
              >
                Release date
              </ThemedText>
              <Text
                style={{
                  color: Colors[colorScheme ?? "dark"].faintText,
                  fontWeight: "500",
                }}
              >
                {tmdbData?.release_date &&
                  new Date(tmdbData?.release_date).toDateString()}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "flex-start",
                flex: 1,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
                numberOfLines={2}
              >
                Genre
              </ThemedText>
              <FlatList
                data={tmdbData?.genres}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 4,
                }}
                renderItem={({ item }) => (
                  <Link
                    key={item.id}
                    href={`/search?item=${item.name}`}
                    style={{
                      fontWeight: "700",
                      color: Colors[colorScheme ?? "dark"].faintText,
                      fontSize: 14,
                      borderRadius: 24,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Link>
                )}
              ></FlatList>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 16,
              borderBottomWidth: 0.4,
              borderBottomColor: Colors[colorScheme ?? "dark"].faintText,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                color: Colors[colorScheme ?? "dark"].faintText,
                fontSize: 14,
                width: "100%",
              }}
            >
              {showFullText ? tmdbData?.overview : previewText}
              {!showFullText &&
                tmdbData?.overview &&
                tmdbData?.overview?.length > 100 &&
                "... "}

              {/* Wrap the "Read More" button inside the Text component */}
              {!showFullText &&
                tmdbData?.overview &&
                tmdbData?.overview?.length > 100 && (
                  <Text
                    onPress={toggleTextDisplay}
                    style={{ color: Colors[colorScheme ?? "dark"].text }}
                  >
                    Read More
                  </Text>
                )}

              {/* Show "Show Less" button if full text is displayed */}
              {showFullText && (
                <Text
                  onPress={toggleTextDisplay}
                  style={{ color: Colors[colorScheme ?? "dark"].text }}
                >
                  Show Less
                </Text>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
