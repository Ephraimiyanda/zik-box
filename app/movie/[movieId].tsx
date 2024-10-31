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
import { cast, movieTypes, review } from "@/types/movieTypes";
import { MovieCard } from "@/components/movie/movieCard";
import { MovieDetailLoader } from "@/components/loaders/movieDetailLoader";
import { ProfileCard } from "@/components/profile/profileCard";
import { ReviewCard } from "@/components/review/reviewCard";

export default function MovieDetails() {
  const { movieId } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const { tmdbData, ytsData, isLoading, error } = useFetchDetails(movieId);
  const colorScheme = useColorScheme();

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const toggleTextDisplay = () => {
    setShowFullText((prev) => !prev);
  };

  //get official trailer
  const videoTRailer = tmdbData?.videos.filter(
    (video) =>
      (video.official =
        true && video.name.toLocaleLowerCase().includes("official trailer"))
  );

  const playlist_trailers = tmdbData?.videos?.map((video) => video.key);
  const previewText = tmdbData?.overview?.slice(0, 200);

  //return loading screen
  if (isLoading) {
    return <MovieDetailLoader />;
  }

  //return details screen
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {/* {!isLoading && (
          <YoutubePlayer
            height={220}
            width={SLIDER_WIDTH}
            play={playing}
            // @ts-ignore
            videoId={videoTRailer ? videoTRailer[0].key : playlist_trailers[0]}
            playList={playlist_trailers}
            onChangeState={onStateChange}
          />
        )} */}

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
              width: "100%",
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
          <View
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: Colors[colorScheme ?? "dark"].faintText,
              paddingVertical: 12,
            }}
          >
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: "500",
                paddingBottom: 8,
              }}
              numberOfLines={2}
            >
              Staring
            </ThemedText>
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
              horizontal
            >
              {!isLoading &&
                tmdbData &&
                tmdbData?.cast &&
                tmdbData.cast.map((item: cast) => (
                  <ProfileCard
                    cardWidth={130}
                    key={item.id + item.profile_path}
                    item={item}
                  ></ProfileCard>
                ))}
            </ScrollView>
          </View>
          <View
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: Colors[colorScheme ?? "dark"].faintText,
              paddingVertical: 12,
            }}
          >
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: "500",
                paddingBottom: 8,
              }}
              numberOfLines={2}
            >
              Recommendations
            </ThemedText>
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {!isLoading &&
                tmdbData &&
                tmdbData?.recommendations?.length > 0 &&
                tmdbData.recommendations.map((item) => (
                  <MovieCard
                    cardWidth={130}
                    key={item.id}
                    item={item}
                  ></MovieCard>
                ))}
            </ScrollView>
          </View>
          {tmdbData?.reviews && tmdbData?.reviews.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  paddingBottom: 8,
                }}
                numberOfLines={2}
              >
                Reviews
              </ThemedText>
              {!isLoading &&
                tmdbData &&
                tmdbData?.reviews &&
                tmdbData.reviews.map((item: review) => (
                  <ReviewCard
                    cardWidth={130}
                    key={item.id}
                    item={item}
                  ></ReviewCard>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
