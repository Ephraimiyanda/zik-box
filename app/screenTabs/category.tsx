import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import * as Network from "expo-network";
import { useFetchData } from "@/hooks/useFetchData";
import { MovieCardLoader } from "@/components/loaders/movieCardLoader";
import { MovieCard } from "@/components/movie/movieCard";
import { movieTypes } from "@/types/movieTypes";
import ButtonFlatList from "@/components/butons/buttonList";
import { CountryCodes } from "@/constants/lists";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

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
  const { data, isLoading, error } = useFetchData(urls);

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
      const uniqueTrendingWeekMovie = [
        ...new Map(
          data[0].results.map((item: any) => [item.id, item])
        ).values(),
      ] as movieTypes[];
      setMovieData((prev) => [...prev, ...uniqueTrendingWeekMovie]);
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
      {!isLoading && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <ButtonFlatList
            buttons={CountryCodes}
            selectedButton={selectedCountryCode}
            setSelectedButton={setSelectedCountryCode}
          ></ButtonFlatList>
        </View>
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
        {!isLoading && movieData && movieData?.length > 0 ? (
          movieData?.map((movie: movieTypes) => (
            <MovieCard cardWidth={110} key={movie.id} item={movie}></MovieCard>
          ))
        ) : (
          <MovieCardLoader></MovieCardLoader>
        )}
      </View>
      <ActivityIndicator
        size="small"
        color={Colors.active}
        animating={infiniteLoading}
      />
    </ScrollView>
  );
}
