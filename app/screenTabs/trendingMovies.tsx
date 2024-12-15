import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
  useColorScheme,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  CarouselCardItem,
  SLIDER_WIDTH,
} from "@/components/carousel/carouselItem";
import { useFetchData } from "@/hooks/useFetchData";
import { MovieCardLoader } from "@/components/loaders/movieCardLoader";
import { CarouselLoader } from "@/components/loaders/carouselLoader";
import { MovieCard } from "@/components/movie/movieCard";
import { movieTypes } from "@/types/movieTypes";
import { Colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import NetworkError from "@/components/networkError/networkError";
import { ErrorBoundaryProps } from "expo-router";
import { Refresher } from "@/components/refreshController/refresher";
import { colorScheme } from "@/constants/colorScheme";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <NetworkError onRetry={retry} />;
}
export default function TrendingMovies() {
  const [trendingWeekMovieData, setTrendingWeekMovieData] = useState<
    movieTypes[]
  >([]);
  const [trendingDayMovieData, setTrendingDayMovieData] = useState<
    movieTypes[]
  >([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [infiniteLoading, setInfiteLoading] = useState(false);
  const isCarousel = useRef(null);
  const themeBackground =
    useColorScheme() === "light"
      ? Colors.light.background
      : Colors.dark.background;

  useEffect(() => {
    setUrls([
      `trending/movie/week?language=en-US&page=${page}`,
      "trending/movie/day?language=en-US",
    ]);
  }, [page]);

  const { data, isLoading, error, isRefreshing, refresh } = useFetchData(urls);

  // Handle incoming data when it's available
  useEffect(() => {
    if (data && data[1]?.results && data[0]?.results) {
      const uniqueTrendingWeekMovie = [
        ...new Map(
          data[0].results.map((item: any) => [item.id, item])
        ).values(),
      ] as movieTypes[];
      const uniqueTrendingDayMovie = [
        ...new Map(
          data[1].results.map((item: any) => [item.id, item])
        ).values(),
      ] as movieTypes[];
      setTrendingDayMovieData((prev) => [...prev, ...uniqueTrendingDayMovie]);
      setTrendingWeekMovieData((prev) => [...prev, ...uniqueTrendingWeekMovie]);
    }
  }, [data, isRefreshing]);

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

  useEffect(() => {
    if (!isLoading) {
      setInfiteLoading(false);
    }
  }, [isLoading]);

  //render movie card
  const renderMovieItem = useCallback(
    ({ item }: { item: movieTypes }) => (
      <MovieCard cardWidth={110} item={item} key={item.id} />
    ),
    []
  );

  //loadimg screen
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
        <CarouselLoader />
        <MovieCardLoader></MovieCardLoader>
      </ScrollView>
    );
  }
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        gap: 3,
        height: "100%",
        alignItems: "center",
        flex: 1,
      }}
    >
      <FlashList
        onEndReached={infiniteScrolling}
        keyExtractor={(item, index) => item.id.toString() + index}
        estimatedItemSize={20 * page}
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
        ListHeaderComponent={
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Carousel
              layout="default"
              layoutCardOffset={9}
              ref={isCarousel}
              data={trendingDayMovieData?.slice(0, 6)}
              // @ts-ignore
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={SLIDER_WIDTH}
              inactiveSlideShift={5}
              useScrollView={true}
              onSnapToItem={(index: number) => setIndex(index)}
            />
            <Pagination
              dotsLength={trendingDayMovieData?.slice(0, 6).length}
              activeDotIndex={index}
              // @ts-ignore
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: "#FF8700",
              }}
              containerStyle={{
                marginVertical: 0,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
              animatedFriction={1}
              animatedDuration={0}
              animatedTension={0}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        disableAutoLayout={true}
        onEndReachedThreshold={1}
        numColumns={3}
        horizontal={false}
        data={trendingWeekMovieData}
        renderItem={renderMovieItem}
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
