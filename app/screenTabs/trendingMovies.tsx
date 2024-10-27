import { useEffect, useRef, useState } from "react";
import { ScrollView, View, useColorScheme } from "react-native";
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

interface ApiResponse {
  results: movieTypes[];
}

export default function TrendingMovies() {
  const [trendingWeekMovieData, setTrendingWeekMovieData] =
    useState<ApiResponse>();
  const [trendingDayMovieData, setTrendingDayMovieData] =
    useState<ApiResponse>();
  const [urls, setUrls] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  useEffect(() => {
    setUrls([
      `trending/movie/week?language=en-US&page=${page}`,
      "trending/movie/day?language=en-US",
    ]);
  }, [page]);

  const { data, isLoading, error } = useFetchData(urls);

  useEffect(() => {
    if (data) {
      setTrendingDayMovieData(data[1] || []);
      setTrendingWeekMovieData(data[0] || []);
    }
  }, [data]);

  const isConnected = async () => {
    const connected = await Network.getNetworkStateAsync();
    return connected.isConnected;
  };

  return (
    <ScrollView
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
      {!isLoading && trendingDayMovieData ? (
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
            data={trendingDayMovieData?.results?.slice(0, 6)}
            // @ts-ignore
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={SLIDER_WIDTH}
            inactiveSlideShift={5}
            useScrollView={true}
            onSnapToItem={(index: number) => setIndex(index)}
          />
          <Pagination
            dotsLength={trendingDayMovieData?.results?.slice(0, 6).length}
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
      ) : (
        <CarouselLoader />
      )}
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
        {!isLoading && trendingWeekMovieData ? (
          trendingWeekMovieData?.results?.map((movie: movieTypes) => (
            <MovieCard key={movie.id} item={movie}></MovieCard>
          ))
        ) : (
          <MovieCardLoader></MovieCardLoader>
        )}
      </View>
    </ScrollView>
  );
}
