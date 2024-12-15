import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import * as Network from "expo-network";
import { useFetchData } from "@/hooks/useFetchData";
import { MovieCardLoader } from "@/components/loaders/movieCardLoader";
import { MovieCard } from "@/components/movie/movieCard";
import { movieTypes } from "@/types/movieTypes";
import ButtonFlatList from "@/components/butons/buttonList";
import { CountryCodes } from "@/constants/lists";
import { Colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import { TvCard } from "@/components/tv/tvCard";
import NetworkError from "@/components/networkError/networkError";
import { useColorScheme } from "react-native";

export default function Category({
  category,
  type,
}: {
  category: string;
  type: string;
}) {
  const [movieData, setMovieData] = useState<movieTypes[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("All");
  const [page, setPage] = useState(1);
  const formatCategory = category.split(" ").join("_").toLocaleLowerCase();
  const [urls, setUrls] = useState<string[]>([]);
  const [infiniteLoading, setInfiteLoading] = useState(false);
  const themeBackground =
    useColorScheme() === "light"
      ? Colors.light.background
      : Colors.dark.background;

  // Fetch data when the screen is focused
  useEffect(() => {
    setUrls([
      formatCategory === "trending"
        ? `trending/tv/week?language=en-US&region=${
            selectedCountryCode === "All" ? "" : selectedCountryCode
          }&page=${page}`
        : `${type}/${formatCategory}?language=en-US&region=${
            selectedCountryCode === "All" ? "" : selectedCountryCode
          }&page=${page}`,
    ]);
  }, [selectedCountryCode, page]);

  //get parameters from hook
  const { data, isLoading, error, refresh, isRefreshing } = useFetchData(urls);

  //get past 10 years
  function getLastTenYears() {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 0; i <= 10; i++) {
      years.push(currentYear - i);
    }

    return years;
  }
  // Handle incoming data when it's available
  useEffect(() => {
    if (data && data[0]?.results) {
      const uniqueMovieData = [
        ...new Map(
          data[0].results.map((item: any) => [item.id, item])
        ).values(),
      ] as movieTypes[];
      setMovieData((prev) => [...prev, ...uniqueMovieData]);
    }
  }, [data]);

  // Infinite scrolling function
  const infiniteScrolling = () => {
    if (data && data[0]?.total_pages > page && !infiniteLoading) {
      setInfiteLoading(true);
      setPage(page + 1);
    }
  };

  // Reset the infinite loading indicator when data is finished loading
  useEffect(() => {
    if (!isLoading) {
      setInfiteLoading(false);
    }
  }, [isLoading]);

  //render movie item
  const renderMovieItem = useCallback(
    ({ item }: { item: movieTypes }) => (
      <MovieCard cardWidth={110} item={item} key={item.id} />
    ),
    []
  );

  //render tv item
  const renderTvItem = useCallback(
    ({ item }: { item: movieTypes }) => (
      <TvCard cardWidth={110} item={item} key={item.id} />
    ),
    []
  );

  //return loadin screen
  if (isLoading && page === 1) {
    return (
      <ScrollView
        onScrollEndDrag={infiniteScrolling}
        style={{
          paddingHorizontal: 4,
          paddingVertical: 4,
          display: "flex",
        }}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 4,
          paddingBottom: 20,
        }}
      >
        <MovieCardLoader></MovieCardLoader>
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: 4,
        paddingVertical: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={[Colors.active]}
            progressBackgroundColor={themeBackground}
          />
        }
        refreshing={isRefreshing}
        onRefresh={refresh}
        onEndReached={infiniteScrolling}
        keyExtractor={(item, index) => item.id.toString() + index}
        estimatedItemSize={20 * page}
        ListHeaderComponent={
          <ButtonFlatList
            buttons={CountryCodes}
            selectedButton={selectedCountryCode}
            setSelectedButton={setSelectedCountryCode}
          ></ButtonFlatList>
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        numColumns={3}
        horizontal={false}
        data={movieData}
        renderItem={type === "movie" ? renderMovieItem : renderTvItem}
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
    </View>
  );
}
