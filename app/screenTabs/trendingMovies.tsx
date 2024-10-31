import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import * as Network from "expo-network";
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
import { colorScheme } from "@/constants/colorScheme";

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

  useEffect(() => {
    setUrls([
      `trending/movie/week?language=en-US&page=${page}`,
      "trending/movie/day?language=en-US",
    ]);
  }, [page]);

  const { data, isLoading, error } = useFetchData(urls);

  // Handle incoming data when it's available
  useEffect(() => {
    if (data && data[1]?.results && data[0]?.results) {
      const uniqueTrendingWeekMovie = [
        ...new Map(
          data[0].results.map((item: any) => [item.id, item])
        ).values(),
      ] as movieTypes[];
      setTrendingDayMovieData((prev) => [...prev, ...data[1].results]);
      setTrendingWeekMovieData((prev) => [...prev, ...uniqueTrendingWeekMovie]);
    }
  }, [data]);

  const isConnected = async () => {
    const connected = await Network.getNetworkStateAsync();
    return connected.isConnected;
  };

  // Infinite scrolling function
  const infiniteScrolling = () => {
    if (data && data[0]?.total_pages > page && !infiniteLoading) {
      setInfiteLoading(true);
      setPage((prev) => prev + 1);
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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {trendingDayMovieData.length > 0 && (
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
        )}
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
          animatedFriction={2}
          animatedDuration={1}
          animatedTension={0}
        />
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          gap: 3,
        }}
      >
        {trendingWeekMovieData.length > 0 &&
          trendingWeekMovieData.map((movie: movieTypes, index) => (
            <MovieCard
              cardWidth={110}
              key={movie.id + index}
              item={movie}
            ></MovieCard>
          ))}
      </View>
      <ActivityIndicator
        size="small"
        color={Colors.active}
        animating={infiniteLoading}
      />
    </ScrollView>
  );
}
