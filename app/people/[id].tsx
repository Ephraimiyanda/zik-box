import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MovieCard } from "@/components/movie/movieCard";
import NetworkError from "@/components/networkError/networkError";
import { TvCard } from "@/components/tv/tvCard";
import { Colors } from "@/constants/Colors";
import { colorScheme } from "@/constants/colorScheme";
import { useFetchData } from "@/hooks/useFetchData";
import styles from "@/styles/style";
import { movieTypes, people } from "@/types/movieTypes";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

export default function People() {
  const [page, setPage] = useState(1);
  const [filmography, setFilmography] = useState<any>([]);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const device_height = Dimensions.get("window").height;
  const { id } = useLocalSearchParams();
  const [urls, setUrls] = useState([
    `person/${id}?append_to_response=combined_credits&language=en-US`,
  ]);

  //get parameters from hook
  const { data, isLoading, error, refresh, isRefreshing } = useFetchData(urls);

  useEffect(() => {
    const start = (page - 1) * 12;
    const end = start + 12;
    const newItems = data[0]?.combined_credits?.cast.slice(start, end) || [];
    setFilmography((prevItems: any) => [...prevItems, ...newItems]);
    setInfiniteLoading(false); // Reset infinite loading state after data is appended
  }, [page, data]);

  // Infinite scrolling function
  const infiniteScrolling = useCallback(() => {
    if (
      data[0]?.combined_credits?.cast.length > page * 12 &&
      !infiniteLoading
    ) {
      setInfiniteLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, data, infiniteLoading]);

  //render movie item or render tv item
  const renderMovieItem = useCallback(({ item }: { item: movieTypes }) => {
    if (item.media_type === "movie") {
      return <MovieCard cardWidth={110} item={item} />;
    } else {
      return <TvCard cardWidth={110} item={item} />;
    }
  }, []);

  if (isLoading) {
    return (
      <ThemedView
        style={{
          height: "100%",
        }}
        darkColor={Colors.dark.background}
        lightColor={Colors.light.background}
      >
        <ActivityIndicator
          size="large"
          color={Colors.active}
          style={{
            margin: "auto",
          }}
        />
      </ThemedView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        onScrollEndDrag={infiniteScrolling}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 4,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={[Colors.active]}
          />
        }
      >
        <ImageBackground
          imageStyle={{
            height: device_height * 0.4,
            objectFit: "cover",
            width: "100%",
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data[0].profile_path}`,
          }}
          style={{
            height: device_height * 0.4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              justifyContent: "center",
            }}
          >
            <ThemedText
              style={{
                fontSize: 24,
                paddingTop: 6,
                fontWeight: "500",
                paddingLeft: 10,
              }}
              numberOfLines={1}
              type="subtitle"
            >
              {data[0].name}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 18,
                paddingBottom: 6,
                fontWeight: "300",
                paddingLeft: 10,
              }}
              numberOfLines={1}
            >
              {data[0].known_for_department}
            </ThemedText>
          </View>
        </ImageBackground>
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 2,
            paddingLeft: 10,
          }}
        >
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
            numberOfLines={2}
          >
            Filmography
          </ThemedText>
        </View>
        <FlashList
          keyExtractor={(item, index) => item.id.toString() + index}
          estimatedItemSize={12 * page}
          numColumns={3}
          horizontal={false}
          data={filmography}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <ActivityIndicator
              size="large"
              color={Colors.active}
              animating={infiniteLoading}
              style={{
                marginBottom: 20,
              }}
            />
          }
        ></FlashList>
        {error && <NetworkError onRetry={refresh} />}
      </ScrollView>
    </ThemedView>
  );
}
